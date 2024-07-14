import { CursorEvent } from "engine/components";
import ControllerState from "./ControllerState";
import IdleState from "./IdleState";

class PanningState extends ControllerState {
  onMouseMove(event: CursorEvent): void {
    let movement = {
      x: event.movementX,
      y: event.movementY
    }
    this.controller.scene.camera.pan(movement);
    this.controller.scene.draw();
  }

  onMouseUp(event: CursorEvent): void {
    this.setState(new IdleState());
    this.controller.scene.draw();
  }
}

export default PanningState;