import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";
import { Vector2 as IVector2 } from "../../../engine/components";

class UnitActionRange extends GameObject {
  chapter: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  unit: any;
  targetPos: IVector2;
  
  constructor(game: Game, unit: any, targetPos: IVector2) {
    super();
    this.chapter = game.chapter;
    this.coords = game.coords;
    this.config = game.config;
    this.unit = unit;
    this.targetPos = targetPos;

    this.show();
  }

  show() {
    this.components.draw = this.draw.bind(this);
  }

  hide() {
    delete this.components.draw;
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
    
    let attackRange = unit.getStationaryAttackRange(this.targetPos);
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