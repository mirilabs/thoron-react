import { IVector2 } from "@/engine/utils/Vector2";

const DEFAULT_COLOR = "rgba(255, 0, 0, 0.5)";

class TilePainter {
  coords: Map<string, string> = new Map(); // Key: "x,y", Value: "color"
  color: string = DEFAULT_COLOR;
  tileWidth: number;
  tileHeight: number;

  constructor(tileWidth: number, tileHeight: number) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  addTile(tilePos: IVector2, color: string = this.color) {
    const key = `${tilePos.x},${tilePos.y}`;
    this.coords.set(key, color);
  }

  addTiles(tilePositions: IVector2[], color: string = this.color) {
    for (const tilePos of tilePositions) {
      this.addTile(tilePos, color);
    }
  }

  clear() {
    this.coords.clear();
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.save();
    for (const [key, color] of this.coords.entries()) {
      ctx.fillStyle = color;
      let [x, y] = key.split(",").map(Number);
      x *= this.tileWidth;
      y *= this.tileHeight;
      ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
    }
    ctx.restore();
  }
}

export default TilePainter;