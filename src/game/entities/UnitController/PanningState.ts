import { CursorEvent } from "engine/components";
import ControllerState from "./ControllerState";

class PanningState extends ControllerState {
  prevState: ControllerState

  onEnter(prevState: ControllerState): void {
    this.prevState = prevState;
  }

  onMouseMove(event: CursorEvent): void {
    let movement = {
      x: event.movementX,
      y: event.movementY
    }
    this.controller.scene.camera.pan(movement);
    this.controller.scene.draw();
  }

  onMouseUp(event: CursorEvent): void {
    this.setState(this.prevState);
    this.controller.scene.draw();
  }
}

export default PanningState;