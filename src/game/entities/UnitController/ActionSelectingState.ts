import { CursorEvent, Vector2 } from "engine/components";
import UnitRange from "../ui/UnitMoveRange";
import UnitPath from "../ui/UnitPath";
import UnitPiece from "../UnitPiece";
import ControllerState from "./ControllerState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import ActingState from "./ActingState";

class ActionSelectingState extends ControllerState {
  moveRangeEnt: UnitRange;
  pathEnt: UnitPath;
  unitEnt: UnitPiece;

  constructor() {
    super();
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  onEnter(prevState: MovingState) {
    this.moveRangeEnt = prevState.moveRangeEnt;
    this.pathEnt = prevState.pathEnt;
    this.unitEnt = this.controller.selectedPiece;

    this.controller.uiEvents.on("select_action", this.onActionSelected);
  }

  onExit(nextState: ActingState) {
    if (!(nextState instanceof MovingState)) {
      this.moveRangeEnt.destroy();
      this.pathEnt.destroy();
      this.controller.uiEvents.emit("close_action_menu");
    }
    
    if (nextState instanceof IdleState) {
      // return unitEnt to original position
      let { x, y } = this.unitEnt.unit.getPosition();
      let originalPos = this.controller.coords.toPixels(x, y);
      this.unitEnt.rect.moveTo(originalPos.x, originalPos.y);
    }

    this.controller.uiEvents.off("select_action", this.onActionSelected);
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    
    if (this.unitEnt.unit.getMoveRange().includes(tileCoords)) {
      this.setState(new MovingState());
      
      // pass mousedown event to next state
      this.controller.currentState.onMouseDown(event);
    }
    else {
      this.setState(new IdleState());
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