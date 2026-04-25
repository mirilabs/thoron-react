import { UIEventSignatures } from "@/shared/UIEventEmitter";
import UnitController from ".";
import { ICursorEvent } from "@/engine/components/CursorEventHandler";
import { IVector2 } from "@/engine/utils/Vector2";
import controllerStore from "@/shared/store";
import { UnsubscribeListener } from "@reduxjs/toolkit";
import { addAppListener } from "@/shared/listenerMiddleware";

export enum ControllerPhase {
  IDLE,
  MOVING,
  PANNING,
  ACTION_SELECT,
  ACTION_CONFIRM,
  ANIMATION
}

type UIEventBindings = {
  [K in keyof UIEventSignatures]: UIEventSignatures[K]
};

abstract class ControllerState {
  id: ControllerPhase;
  panning: boolean = false;
  private uiEventBindings: Partial<UIEventBindings> = {};
  private storeEventBindings: UnsubscribeListener[] = [];

  private _controller: WeakRef<UnitController>;
  get controller(): UnitController {
    return this._controller.deref();
  }

  setState: (state: ControllerState) => void;

  bindController(controller: UnitController) {
    this._controller = new WeakRef(controller);
    this.setState = controller.setState.bind(controller);
  }

  addUIEventListener<K extends keyof UIEventSignatures>(
    eventId: K,
    callback: UIEventSignatures[K]
  ) {
    let boundCallback = callback.bind(this);
    this.controller.uiEvents.on(eventId, boundCallback);
    this.uiEventBindings[eventId] = boundCallback;
  }

  addStoreListener(options: any) {
    const removeListener = controllerStore.dispatch(addAppListener(options));
    this.storeEventBindings.push(removeListener);
  }

  getTileCoords(vec: IVector2): IVector2 {
    return this.controller.coords.toTiles(vec.x, vec.y);
  }

  updateTargetIndicators(coords: IVector2) {
    const { unitId } = controllerStore.getState();
    if (unitId === null) return;

    const unit = this.controller.chapter.getUnitById(unitId);
    const unitEnt = this.controller.getUnitBody(unitId);
    if (!unit || !unitEnt) return;

    for (const target of this.controller.game.unitBodies.values()) {
      if (target === unitEnt) continue;

      const actions = unit.getPossibleActionsTo(coords, target.unit);
      if (actions.length > 0) {
        target.showTargetIndicator(actions[0]);
      } else {
        target.hideTargetIndicator();
      }
    }
  }

  startPanning() {
    this.panning = true;
  }

  onEnter(prevState: ControllerState) {
  }

  onExit(nextState: ControllerState) {
    // unbind ui events
    for (let [eventId, callback] of Object.entries(this.uiEventBindings)) {
      this.controller.uiEvents.off(
        eventId as keyof UIEventSignatures,
        callback
      );
    }
    // unbind store listeners
    for (let unsubscribe of this.storeEventBindings) {
      unsubscribe();
    }
  }

  onMouseDown(event: ICursorEvent) { }

  onMouseMove(event: ICursorEvent) {
    if (this.panning) {
      this.controller.scene.camera.pan(event.delta);
    }
  }

  onMouseUp(event: ICursorEvent) {
    this.panning = false;
  }
}

export default ControllerState;