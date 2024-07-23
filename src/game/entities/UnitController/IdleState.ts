import { CursorEvent } from "engine/components";
import ControllerState from "./ControllerState";
import PanningState from "./PanningState";
import MovingState from "./MovingState";

class IdleState extends ControllerState {
  dragging: boolean = false;

  onEnter(): void {
    this.controller.scene.draw();
  }

  onMouseDown(event: CursorEvent): void {
    this.dragging = true;

    let tileCoords = this.getTileCoords(event);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    // set selected tile in ui
    this.controller.uiEvents.emit('select_position', tileCoords);

    // show unit range
    if (unit) {
      this.controller.selectUnit(unit);
    }
    else {
      this.controller.selectUnit(null);
    }
  }

  onMouseMove(event: CursorEvent): void {
    if (!this.dragging) return;

    let tileCoords = this.getTileCoords(event);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (unit) {
      this.setState(new MovingState());
    }
    else {
      this.setState(new PanningState());
    }
  }

  onMouseUp(event: CursorEvent): void {
    this.dragging = false;
  }

  onExit(nextState: ControllerState): void {
    this.dragging = false;
  }
}

export default IdleState;