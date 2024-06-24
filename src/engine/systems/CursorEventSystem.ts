import Scene from "../Scene";
import { ComponentSchema, IPosition } from "../components";
import Rect from "../utils/Rect";
import System from "./System";

class CursorEventSystem extends System {
    signature: Set<keyof ComponentSchema> = new Set([
        'position',
        'rectangle',
        'cursorEvents'
    ]);

    constructor(scene: Scene) {
        super(scene);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.bindCursorEvents(scene.canvas);
    }
    
    get canvas(): HTMLCanvasElement {
        return this.scene.canvas;
    }

    bindCursorEvents(element: HTMLElement) {
        element.addEventListener('mousedown', this.onMouseDown);
        element.addEventListener('mousemove', this.onMouseMove);
        element.addEventListener('mouseup', this.onMouseUp);
    }

    getCoords(event: MouseEvent): IPosition {
        let x = event.pageX - this.canvas.offsetLeft;
        let y = event.pageY - this.canvas.offsetTop;
        return { x, y }
    }

    onMouseDown(event: MouseEvent) {
        let mousePos = this.getCoords(event);

        this.components.forEach(({ position, rectangle, cursorEvents }) => {
            let rect = new Rect(position, rectangle);

            if (rect.collidePoint(mousePos)) {
                console.log('u clicked me!!');
            }
        });
    }

    onMouseMove(event: MouseEvent) {

    }

    onMouseUp(event: MouseEvent) {
        
    }
}

export default CursorEventSystem;