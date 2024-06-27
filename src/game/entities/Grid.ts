import GameObject from "../../engine/GameObject";
import { IGameConfig } from "../Game";

class Grid extends GameObject {
  width: number;
  height: number;
  cfg: IGameConfig;

  constructor(
    width: number,
    height: number,
    cfg: IGameConfig
  ) {
    super();
    this.width = width;
    this.height = height;
    this.cfg = cfg;

    this.components = {
      draw: this.draw.bind(this)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x: number, y: number;
    let { width, height } = this;
    let { tileWidth, tileHeight } = this.cfg;
    
    ctx.beginPath();
    for (x = 0; x <= width; x += tileWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (y = 0; y <= height; y += tileHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
}

export default Grid;