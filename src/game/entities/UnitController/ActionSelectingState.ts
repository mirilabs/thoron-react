import { CursorEvent, Vector2 } from "engine/components";
import UnitPath from "../ui/UnitPath";
import UnitPiece from "../UnitPiece";
import ControllerState from "./ControllerState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import ActingState from "./ActingState";
import PanningState from "./PanningState";

class ActionSelectingState extends ControllerState {
  pathEnt: UnitPath;
  unitEnt: UnitPiece;

  onEnter(prevState: MovingState) {
    if (prevState instanceof MovingState) {
      this.pathEnt = prevState.pathEnt;
    }

    this.unitEnt = this.controller.selectedPiece;

    let unit = this.unitEnt.unit;
    let actions = unit.getPossibleActions(this.getTargetPos());
    this.controller.uiEvents.emit("open_action_menu", actions);

    this.onActionSelected = this.onActionSelected.bind(this);
    this.controller.uiEvents.on("select_action", this.onActionSelected);
  }

  onExit(nextState: ControllerState) {
    this.controller.uiEvents.off("select_action", this.onActionSelected);

    if (nextState instanceof ActingState || nextState instanceof IdleState) {
      this.unitEnt.hideMoveRange();
      this.controller.uiEvents.emit("close_action_menu");
    }

    if (
      !(nextState instanceof MovingState) &&
      !(nextState instanceof PanningState)
    ) {
      this.pathEnt.destroy();
    }
    
    if (nextState instanceof IdleState) {
      this.unitEnt.resetPosition();
    }
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    
    if (this.unitEnt.unit.getMoveRange().includes(tileCoords)) {
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
      this.setState(new IdleState());
    }
    else {
      this.setState(new ActingState(this.getTargetPos(), action));
    }
  }
}

export default ActionSelectingState;