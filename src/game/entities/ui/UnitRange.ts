import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";

class UnitRange extends GameObject {
  game: Game;
  unit: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  isActive: boolean;
  
  constructor(game: Game) {
    super();
    this.game = game;
    this.coords = game.coords;
    this.config = game.config;
    
    this.components = {
      draw: this.draw.bind(this)
    }
    
    game.uiEvents.on('select_unit', (unit) => {
      this.unit = unit;
    });
    game.uiEvents.on('pointer_state', (state: string) => {
      this.isActive = (state === 'dragging');
      this.entity.scene.draw();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    const unit = this.unit;
    if (!unit || !this.isActive) return;

    const {
      tileWidth,
      tileHeight,
      attackColor,
      moveColor,
      highlightAlpha
    } = this.config;

    // store what color to paint each tile
    // higher-priority ranges are painted later, overwriting the
    // previously queued color
    let paintQueue: Map<string, string> = new Map();

    unit.getAttackRange().forEach(({ x, y }) => {
      paintQueue.set(`${x},${y}`, attackColor);
    });

    unit.getMoveRange().forEach(({ x, y }) => {
      paintQueue.set(`${x},${y}`, moveColor);
    });

    // paint tiles
    ctx.save();
    ctx.globalAlpha = highlightAlpha;

    for (const [coords, color] of paintQueue.entries()) {
      let [x, y] = coords.split(',').map(n => parseInt(n));
      let pixelCoords = this.coords.toPixels(x, y);

      ctx.fillStyle = color;
      ctx.fillRect(pixelCoords.x, pixelCoords.y, tileWidth, tileHeight);
    }

    ctx.restore();
  }
}

export default UnitRange;