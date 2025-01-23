import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";
import { IVector2 } from "engine/utils/Vector2";
import DrawHandler from "engine/components/DrawHandler";

class UnitActionRange extends GameObject {
  chapter: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  unit: any;
  targetPos: IVector2;
  drawHandler: DrawHandler;
  
  constructor(game: Game, unit: any, targetPos: IVector2) {
    super();
    this.chapter = game.chapter;
    this.coords = game.coords;
    this.config = game.config;
    this.unit = unit;
    this.targetPos = targetPos;
    this.drawHandler = new DrawHandler(this.draw.bind(this), 30);

    this.components = [
      this.drawHandler
    ]
  }

  show() {
    this.drawHandler.enabled = true;
  }

  hide() {
    this.drawHandler.enabled = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.unit) return;

    this.paintTiles(ctx);
  }

  paintTiles(ctx: CanvasRenderingContext2D) {
    const unit = this.unit;

    const {
      tileWidth,
      tileHeight,
      attackColor,
      moveColor,
      highlightAlpha
    } = this.config;

    let paintQueue: Map<string, string> = new Map();
    
    const attackRange = this.chapter.terrain.getRange(
      this.targetPos,
      unit.equipped.minRange,
      unit.equipped.maxRange
    );
    attackRange.forEach(({ x, y }) => {
      paintQueue.set(`${x},${y}`, attackColor);
    });

    ctx.save();
    ctx.globalAlpha = highlightAlpha;
    
    // paint targetPos
    let pixelCoords = this.coords.toPixels(this.targetPos.x, this.targetPos.y);
    ctx.fillStyle = moveColor;
    ctx.fillRect(pixelCoords.x, pixelCoords.y, tileWidth, tileHeight);

    // paint attack range
    for (const [coords, color] of paintQueue.entries()) {
      let [x, y] = coords.split(',').map(n => parseInt(n));
      let pixelCoords = this.coords.toPixels(x, y);

      ctx.fillStyle = color;
      ctx.fillRect(pixelCoords.x, pixelCoords.y, tileWidth, tileHeight);
    }

    ctx.restore();
  }
}

export default UnitActionRange;