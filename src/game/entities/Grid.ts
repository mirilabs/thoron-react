import DrawHandler from "@/engine/components/DrawHandler";
import GameObject from "../../engine/GameObject";
import { IGameConfig } from "../Game";

class Grid extends GameObject {
  rows: number;
  columns: number;
  cfg: IGameConfig;

  constructor(
    rows: number,
    columns: number,
    cfg: IGameConfig
  ) {
    super();
    this.rows = rows;
    this.columns = columns;
    this.cfg = cfg;

    this.components = [
      new DrawHandler(this.draw.bind(this), 20)
    ]
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x: number, y: number;
    let { rows, columns } = this;
    let { tileWidth, tileHeight } = this.cfg;
    let width = rows * tileWidth;
    let height = columns * tileHeight;
    
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