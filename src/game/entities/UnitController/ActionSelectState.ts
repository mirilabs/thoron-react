import { CursorEvent } from "engine/components";
import UnitPiece from "../UnitPiece";
import ControllerState, { ControllerPhase } from "./ControllerState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import PanningState from "./PanningState";
import controllerStore, { targetSelected, actionSelected } from "shared/store";
import ActionConfirmState from "./ActionConfirmState";

class ActionSelectState extends ControllerState {
  id = ControllerPhase.ACTION_SELECT;
  unitEnt: UnitPiece;

  onEnter(prevState: MovingState) {
    super.onEnter(prevState);

    this.unitEnt = this.controller.selectedPiece;
    this.unitEnt.showMoveRange();
    this.unitEnt.showMovePath();

    // reset selected action state
    controllerStore.dispatch(actionSelected(null));

    // wait for user to select action in ui
    this.bindUIEvent("select_action", this.onActionSelected);
    this.bindUIEvent("cancel", this.onCancel);
  }

  onExit(nextState: ControllerState) {
    super.onExit(nextState);

    if (
      nextState instanceof ActionConfirmState ||
      nextState instanceof IdleState
    ) {
      this.unitEnt.hideMoveRange();
      this.unitEnt.hideMovePath();

      for (const unitPiece of this.controller.unitPieces.values()) {
        unitPiece.hideTargetIndicator();
      }
    }
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let target = this.controller.chapter.getUnitAt(tileCoords);

    if (target && target !== this.unitEnt.unit) {
      controllerStore.dispatch(targetSelected(target.id));
      this.setState(new ActionConfirmState())
    }
    else if (this.unitEnt.unit.getMoveRange().includes(tileCoords)) {
      this.setState(new MovingState());
      
      // pass mousedown event to next state
      this.controller.currentState.onMouseDown(event);
    }
    else {
      this.setState(new PanningState());
    }
  }

  onActionSelected(action: string) {
    if (action === "cancel") {
      this.onCancel();
    }
    else {
      this.setState(new ActionConfirmState());
    }
  }

  onCancel() {
    this.unitEnt.resetPosition();
    this.setState(new IdleState());
  }
}

export default ActionSelectState;