import System from "./System";
import Vector2, { IVector2 } from "@/engine/utils/Vector2";
import {
  ComponentId,
  ComponentTypes
} from "../components";
import {
  CursorEventCallback,
  ICursorEvent,
  ICursorEventHandler
} from "@/engine/components/CursorEventHandler";

class CursorEventSystem extends System {
  signature: Set<ComponentId> = new Set<ComponentId>([
    'cursorEvents'
  ]);

  prevPosition: IVector2;
  onMouseDown: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;

  constructor() {
    super();
    this.onMouseDown = this.cursorEventCallback('onMouseDown').bind(this);
    this.onMouseMove = this.cursorEventCallback('onMouseMove').bind(this);
    this.onMouseUp = this.cursorEventCallback('onMouseUp').bind(this);
  }
  
  get canvas(): HTMLCanvasElement {
    return this.scene.canvas;
  }

  bindCursorEvents(element: HTMLElement) {
    element.addEventListener('pointerdown', this.onMouseDown);
    document.addEventListener('pointermove', this.onMouseMove);
    document.addEventListener('pointerup', this.onMouseUp);
    document.addEventListener('pointercancel', this.onMouseUp);
  }

  unbindCursorEvents(element: HTMLElement) {
    element.removeEventListener('pointerdown', this.onMouseDown);
    document.removeEventListener('pointermove', this.onMouseMove);
    document.removeEventListener('pointerup', this.onMouseUp);
    document.removeEventListener('pointercancel', this.onMouseUp);
  }

  getCoords(event: MouseEvent): IVector2 {
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    return { x, y }
  }

  /**
   * Generate a callback to attach to the scene canvas
   * @param callbackId The key of the cursorEventHandler method to be called
   * @returns An event callback that passes events to this system's entities
   */
  cursorEventCallback(
    callbackId: keyof ICursorEventHandler,
    isTouchEvent: boolean = false
  ): (event: MouseEvent) => void {
    return function(event: PointerEvent) {
      // do not respond to non-primary pointer events
      if (!event.isPrimary) return;

      // convert event coordinates to canvas coordinates
      let mousePos: IVector2 = this.getCoords(event);
      
      let delta = this.prevPosition ?
        Vector2.difference(mousePos, this.prevPosition) :
        Vector2.ZERO;
      this.prevPosition = mousePos;

      // convert canvas coordinates to game world coordinates
      // by reversing camera transformation
      mousePos = this.scene.camera.reverseTransformVector(mousePos);

      // generate event and pass it to components
      for (const components of this.componentGroups) {
        let {
          cursorEvents
        } = components as Partial<ComponentTypes>;

        let cEvent: ICursorEvent = {
          x: mousePos.x,
          y: mousePos.y,
          delta,
          altKey: event.altKey,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey
        }

        let eventHandler: CursorEventCallback = cursorEvents[callbackId];
        if (eventHandler) {
          eventHandler(cEvent);
        }
      }
    }
  }
}

export default CursorEventSystem;