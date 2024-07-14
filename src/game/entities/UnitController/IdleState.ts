import { CursorEvent } from "engine/components";
import ControllerState from "./ControllerState";
import PanningState from "./PanningState";
import MovingState from "./MovingState";

class IdleState extends ControllerState {
  onEnter(): void {
    this.controller.scene.draw();
  }

  onMouseDown(event: CursorEvent): void {
    const {
      chapter,
      uiEvents
    } = this.controller;

    // set selected tile in ui
    let tileCoords = this.getTileCoords(event);
    uiEvents.emit('select_position', tileCoords);
    
    // set selected unit in ui
    let unit = chapter.getUnitAt(tileCoords);

    if (unit) {
      this.controller.selectUnit(unit);
      this.setState(new MovingState());
    }
    else {
      this.controller.selectUnit(null);
      this.setState(new PanningState());
    }
  }
}

export default IdleState;