import Component from "./Component";

type DrawFn = (ctx: CanvasRenderingContext2D) => void;

interface IDrawHandler {
  draw: DrawFn;
  zIndex?: number;
  enabled?: boolean;
}

class DrawHandler extends Component implements IDrawHandler {
  draw: DrawFn;
  zIndex?: number;
  enabled?: boolean = true;

  constructor(drawFn: DrawFn, zIndex: number = 0) {
    super();
    this.draw = drawFn;
    this.zIndex = zIndex;
  }
}

export default DrawHandler;
export {
  IDrawHandler,
  DrawFn
}