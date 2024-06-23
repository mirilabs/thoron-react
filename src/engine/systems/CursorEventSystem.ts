import Scene from "../Scene";
import { IPosition, IRectangle } from "../components";
import System from "./System";

class CursorEventSystem extends System {
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

    getCoords(event: MouseEvent): { x: number, y: number } {
        let x = event.pageX - this.canvas.offsetLeft;
        let y = event.pageY - this.canvas.offsetTop;
        return { x, y }
    }

    onMouseDown(event: MouseEvent) {
        let { x, y } = this.getCoords(event);
        
        console.log(x, y);

        this.componentMap.components['cursorEvents']
            .forEach((eventHandler, entityId) => {
                let entity = this.scene.getEntity(entityId);
                let pos = entity.getComponent<IPosition>('position');
                let rect = entity.getComponent<IRectangle>('rectangle');
                
                
            })
    }

    onMouseMove(event: MouseEvent) {

    }

    onMouseUp(event: MouseEvent) {
        
    }
}

export default CursorEventSystem;