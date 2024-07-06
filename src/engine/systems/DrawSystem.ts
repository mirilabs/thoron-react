import { ComponentId } from "../components";
import System from "./System";

class DrawSystem extends System {
  signature: Set<ComponentId> = new Set([
    'draw'
  ]);
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  bindCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  unbindCanvas() {
    delete this.canvas;
    delete this.ctx;
  }

  clearCanvas() {
    let { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  draw() {
    this.clearCanvas();

    this.components.forEach(({ draw }) => {
      draw(this.ctx);
    });
  }
}

export default DrawSystem;