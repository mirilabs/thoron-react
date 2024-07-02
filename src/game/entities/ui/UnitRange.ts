import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";

class UnitRange extends GameObject {
  game: Game;
  unit: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  
  constructor(game: Game) {
    super();
    this.game = game;
    this.coords = game.coords;
    this.config = game.config;
    
    this.components = {
      draw: this.draw.bind(this)
    }

    this.setUnit = this.setUnit.bind(this);
    game.uiEvents.on('select_unit', this.setUnit);
  }

  setUnit(unit) {
    this.unit = unit;
    this.entity.scene.draw();
  }

  highlightTiles(
    ctx: CanvasRenderingContext2D,
    tileCoords: { x: number, y: number }[],
    color: string
  ) {
    let { tileWidth, tileHeight, highlightAlpha } = this.config;
    ctx.save();
    
    ctx.fillStyle = color;
    ctx.globalAlpha = highlightAlpha;

    for (const coords of tileCoords) {
      let { x, y } = this.coords.toPixels(coords.x, coords.y);
      ctx.fillRect(x, y, tileWidth, tileHeight);
    }

    ctx.restore();
  }

  draw(ctx: CanvasRenderingContext2D) {
    const unit = this.unit;
    if (!unit) return;

    const {
      attackColor,
      moveColor
    } = this.config;

    this.highlightTiles(ctx, unit.getAttackRange(), attackColor);
    this.highlightTiles(ctx, unit.getMoveRange(), moveColor);
  }
}

export default UnitRange;