import { CursorEvent, Vector2 } from "engine/components";
import UnitPath from "../ui/UnitPath";
import UnitPiece from "../UnitPiece";
import ControllerState, { ControllerPhase } from "./ControllerState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import TargetSelectState from "./TargetSelectState";
import PanningState from "./PanningState";
import controllerStore, { targetSelected } from "shared/store";

class ActionSelectState extends ControllerState {
  id = ControllerPhase.ACTION_SELECT;
  pathEnt: UnitPath;
  unitEnt: UnitPiece;

  onEnter(prevState: MovingState) {
    super.onEnter(prevState);

    this.unitEnt = this.controller.selectedPiece;

    if (prevState instanceof MovingState) {
      this.pathEnt = prevState.pathEnt;
    }
    
    this.onActionSelected = this.onActionSelected.bind(this);
    this.controller.uiEvents.on("select_action", this.onActionSelected);

    this.onCancel = this.onCancel.bind(this);
    this.controller.uiEvents.on("reset_controller_state", this.onCancel);
  }

  onExit(nextState: ControllerState) {
    super.onExit(nextState);

    this.controller.uiEvents.off("select_action", this.onActionSelected);
    this.controller.uiEvents.off("reset_controller_state", this.onCancel);

    if (nextState instanceof TargetSelectState || nextState instanceof IdleState) {
      this.unitEnt.hideMoveRange();
    }

    if (
      !(nextState instanceof MovingState) &&
      !(nextState instanceof PanningState)
    ) {
      // destroy unit moving ui elements
      this.pathEnt.destroy();
      
      for (const unitPiece of this.controller.unitPieces.values()) {
        unitPiece.hideTargetIndicator();
      }
    }
    
    if (nextState instanceof IdleState) {
      this.unitEnt.resetPosition();
    }
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let target = this.controller.chapter.getUnitAt(tileCoords);

    if (target && target !== this.unitEnt.unit) {
      controllerStore.dispatch(targetSelected(target.id));
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

  getTargetPos(): Vector2 {
    return this.pathEnt.getLastNode();
  }

  onActionSelected(action: string) {
    if (action === "cancel") {
      this.onCancel();
    }
    else {
      this.setState(new TargetSelectState());
    }
  }

  onCancel() {
    this.setState(new IdleState());
  }
}

export default ActionSelectState;