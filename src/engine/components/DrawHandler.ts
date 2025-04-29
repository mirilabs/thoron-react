import Component from "./Component";

type DrawFn = (ctx: CanvasRenderingContext2D) => void;

interface IDrawHandler {
  draw: DrawFn;
  zIndex?: number;
  enabled?: boolean;
}

class DrawHandler extends Component implements IDrawHandler {
  drawFn: DrawFn;
  opacity: number = 1;
  zIndex?: number;
  enabled?: boolean = true;

  constructor(drawFn: DrawFn, zIndex: number = 0) {
    super();
    this.drawFn = drawFn;
    this.zIndex = zIndex;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.enabled) return;
    ctx.save();

    ctx.globalAlpha = this.opacity;
    
    this.drawFn(ctx);

    ctx.restore();
  }
}

export default DrawHandler;
export {
  IDrawHandler,
  DrawFn
}