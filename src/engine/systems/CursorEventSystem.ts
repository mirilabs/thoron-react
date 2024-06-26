import {
    ComponentSchema,
    CursorEventHandler,
    ICursorEvent,
    ICursorEventHandlers,
    IPosition
} from "../components";
import Rect from "../utils/Rect";
import System from "./System";

class CursorEventSystem extends System {
    signature: Set<keyof ComponentSchema> = new Set([
        'position',
        'rectangle',
        'cursorEvents'
    ]);

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
        element.addEventListener('mousedown', this.onMouseDown);
        element.addEventListener('mousemove', this.onMouseMove);
        element.addEventListener('mouseup', this.onMouseUp);
    }

    unbindCursorEvents(element: HTMLElement) {
        element.removeEventListener('mousedown', this.onMouseDown);
        element.removeEventListener('mousemove', this.onMouseMove);
        element.removeEventListener('mouseup', this.onMouseUp);
    }

    getCoords(event: MouseEvent): IPosition {
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
        callbackId: keyof ICursorEventHandlers
    ):(event: MouseEvent) => void {
        return function(event: MouseEvent) {
            let mousePos: IPosition = this.getCoords(event);

            for (const components of this.components) {
                let {
                    position,
                    rectangle,
                    cursorEvents
                } = components as ComponentSchema;
                let rect = new Rect(position, rectangle);

                let cEvent: ICursorEvent = {
                    ...event,
                    x: mousePos.x,
                    y: mousePos.y,
                    isTarget: rect.collidePoint(mousePos)
                }

                let eventHandler: CursorEventHandler = cursorEvents[callbackId];
                if (eventHandler) {
                    eventHandler(cEvent);
                }
            }
        }
    }
}

export default CursorEventSystem;