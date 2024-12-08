import { CursorEvent } from "engine/components";
import ControllerState, { ControllerPhase } from "./ControllerState";
import MovingState from "./MovingState";

class IdleState extends ControllerState {
  id = ControllerPhase.IDLE;

  onEnter(): void {
    this.controller.scene.draw();
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    // show unit range
    if (unit) {
      this.controller.selectUnit(unit);
      this.setState(new MovingState());
      this.controller.currentState.onMouseDown(event);
    }
    else {
      this.startPanning();
    }
  }
}

export default IdleState;