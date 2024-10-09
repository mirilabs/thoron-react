import UnitController from ".";
import { CursorEvent, Vector2 } from "engine/components";

export enum ControllerPhase {
  IDLE,
  MOVING,
  PANNING,
  ACTION_SELECT,
  TARGET_SELECT
}

abstract class ControllerState {
  id: ControllerPhase;

  private _controller: WeakRef<UnitController>;
  get controller(): UnitController {
    return this._controller.deref();
  }

  setState: (state: ControllerState) => void;

  bindController(controller: UnitController) {
    this._controller = new WeakRef(controller);
    this.setState = controller.setState.bind(controller);
  }

  getTileCoords(vec: Vector2): Vector2 {
    return this.controller.coords.toTiles(vec.x, vec.y);
  }

  onEnter(prevState: ControllerState) {}
  onExit(nextState: ControllerState) {}
  onMouseDown(event: CursorEvent) {}
  onMouseMove(event: CursorEvent) {}
  onMouseUp(event: CursorEvent) {}
}

export default ControllerState;