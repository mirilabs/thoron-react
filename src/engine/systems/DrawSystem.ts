import { ComponentId } from "../components";
import System from "./System";

class DrawSystem extends System {
    signature: Set<ComponentId> = new Set([
        'draw'
    ]);
    ctx: CanvasRenderingContext2D;

    setCanvas(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
    }

    clearCanvas() {
        let { width, height } = this.scene.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }

    draw() {
        this.clearCanvas();

        this.components.forEach(({ draw }) => {
            draw(this.ctx);
        })
    }
}

export default DrawSystem;