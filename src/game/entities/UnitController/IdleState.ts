import { CursorEvent } from "engine/components";
import ControllerState from "./ControllerState";
import PanningState from "./PanningState";
import MovingState from "./MovingState";

class IdleState extends ControllerState {

  onEnter(): void {
    this.controller.scene.draw();
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    // set selected tile in ui
    this.controller.uiEvents.emit('select_position', tileCoords);

    // show unit range
    if (unit) {
      this.controller.selectUnit(unit);
      this.setState(new MovingState());
      this.controller.currentState.onMouseDown(event);
    }
    else {
      this.controller.selectUnit(null);
      this.setState(new PanningState());
    }
  }
}

export default IdleState;