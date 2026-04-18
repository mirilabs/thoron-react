import SortedArray from "@/engine/utils/SortedArray";
import { AnyComponent, ComponentId, DrawHandler } from "../components";
import System from "./System";
import Entity from "@/engine/Entity";
import { IDrawHandler } from "@/engine/components/DrawHandler";

class DrawOrder {
  order = new SortedArray<IDrawHandler>(
    (a: IDrawHandler, b: IDrawHandler) => a.zIndex - b.zIndex
  ); // automatically sorted by z index

  add(drawHandler: IDrawHandler) {
    this.order.add(drawHandler);
  }

  remove(drawHandler: IDrawHandler) {
    let i = this.order.indexOf(drawHandler);
    if (i >= 0) this.order.splice(i, 1);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.order.forEach((drawHandler: DrawHandler) => {
      drawHandler.draw(ctx);
    });
  }
}

class DrawSystem extends System {
  signature: Set<ComponentId> = new Set<ComponentId>([
    'draw'
  ]);
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  drawOrder = new DrawOrder();

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

  onComponentAdded(entity: Entity, component: AnyComponent): void {
    super.onComponentAdded(entity, component);

    if (component instanceof DrawHandler) {
      this.drawOrder.add(component);
    }
  }

  onComponentRemoved(entity: Entity, component: AnyComponent): void {
    super.onComponentRemoved(entity, component);

    if (component instanceof DrawHandler) {
      this.drawOrder.remove(component);
    }
  }

  draw() {
    if (!this.canvas) return;

    this.ctx.resetTransform();
    this.clearCanvas();
    this.scene.camera.transformContext(this.ctx);

    this.drawOrder.draw(this.ctx);
  }
}

export default DrawSystem;