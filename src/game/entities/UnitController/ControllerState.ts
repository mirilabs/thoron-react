import { UIEventSignatures } from "shared/UIEventEmitter";
import UnitController from ".";
import { CursorEvent, Vector2 } from "engine/components";

export enum ControllerPhase {
  IDLE,
  MOVING,
  PANNING,
  ACTION_SELECT,
  ACTION_CONFIRM
}

type UIEventBindings = {
  [K in keyof UIEventSignatures]: UIEventSignatures[K]
};

abstract class ControllerState {
  id: ControllerPhase;
  uiEventBindings: Partial<UIEventBindings> = {};

  private _controller: WeakRef<UnitController>;
  get controller(): UnitController {
    return this._controller.deref();
  }

  setState: (state: ControllerState) => void;

  bindController(controller: UnitController) {
    this._controller = new WeakRef(controller);
    this.setState = controller.setState.bind(controller);
  }

  bindUIEvent<K extends keyof UIEventSignatures>(
    eventId: K,
    callback: UIEventSignatures[K]
  ) {
    let boundCallback = callback.bind(this);
    this.controller.uiEvents.on(eventId, boundCallback);
    this.uiEventBindings[eventId] = boundCallback;
  }

  getTileCoords(vec: Vector2): Vector2 {
    return this.controller.coords.toTiles(vec.x, vec.y);
  }

  onEnter(prevState: ControllerState) {}

  onExit(nextState: ControllerState) {
    // unbind ui events
    for (let [eventId, callback] of Object.entries(this.uiEventBindings)) {
      this.controller.uiEvents.off(
        eventId as keyof UIEventSignatures,
        callback
      );
    }
  }

  onMouseDown(event: CursorEvent) {}
  onMouseMove(event: CursorEvent) {}
  onMouseUp(event: CursorEvent) {}
}

export default ControllerState;