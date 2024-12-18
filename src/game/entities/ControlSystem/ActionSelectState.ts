import { CursorEvent } from "engine/components";
import UnitPiece from "../UnitPiece";
import ControllerState, { ControllerPhase } from "./ControllerState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import controllerStore, { targetSelected, actionSelected } from "shared/store";
import ActionConfirmState from "./ActionConfirmState";
import { DeployedUnit } from "thoron";

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
    this.addUIEventListener("select_action", this.onActionSelected);
    this.addUIEventListener("cancel", this.onCancel);
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
    let possibleActions = this.unitEnt.unit.getPossibleActionsTo(
      controllerStore.getState().pendingMove.destination,
      target
    );

    if (target && target !== this.unitEnt.unit) {
      // if only one action on this target is possible, select it by default
      if (possibleActions.length === 1) {
        controllerStore.dispatch(actionSelected(possibleActions[0]));
        this.setState(new ActionConfirmState())
      }

      controllerStore.dispatch(targetSelected(target.id));
    }
    else if (this.unitEnt.unit.getMoveRange().includes(tileCoords)) {
      this.setState(new MovingState());
      
      // pass mousedown event to next state
      this.controller.currentState.onMouseDown(event);
    }
    else {
      this.startPanning();
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
    this.setState(new IdleState());
  }

  onUnitSelected(unit: DeployedUnit): void {
    if (unit !== this.unitEnt.unit) {
      this.setState(new IdleState())
    }
  }
}

export default ActionSelectState;