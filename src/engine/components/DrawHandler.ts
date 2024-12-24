import Component from "./Component";

type DrawFn = (ctx: CanvasRenderingContext2D) => void;

interface IDrawFunction {
  draw: DrawFn;
  zIndex?: number;
  enabled?: boolean;
}

class DrawHandler extends Component implements IDrawFunction {
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
  DrawFn
}