import { CursorEvent } from "engine/components";
import ControllerState, { ControllerPhase } from "./ControllerState";

class PanningState extends ControllerState {
  id = ControllerPhase.PANNING;

  prevState: ControllerState

  onEnter(prevState: ControllerState): void {
    this.prevState = prevState;
  }

  onMouseMove(event: CursorEvent): void {
    this.controller.scene.camera.pan(event.delta);
    this.controller.scene.draw();
  }

  onMouseUp(event: CursorEvent): void {
    this.setState(this.prevState);
    this.controller.scene.draw();
  }
}

export default PanningState;