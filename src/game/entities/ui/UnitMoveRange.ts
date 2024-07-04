import { Vector2 } from "../../../engine/components";
import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";

class UnitMoveRange extends GameObject {
  game: Game;
  unit: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  targetPos: Vector2;
  
  constructor(game: Game, unit: any) {
    super();
    this.game = game;
    this.coords = game.coords;
    this.config = game.config;
    this.unit = unit;

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
    this.drawOriginMarker(ctx);
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

  drawOriginMarker(ctx: CanvasRenderingContext2D) {
    const tileCoords = this.unit.getPosition();
    const center = this.coords.toPixels(
      tileCoords.x,
      tileCoords.y,
      CoordinateConverter.RectMode.CENTER
    );
    const { tileWidth, tileHeight } = this.config;
    const originMarkerScale = 0.65;

    ctx.save();
    ctx.fillStyle = this.config.moveColor;
    drawEightPointStar(
      ctx,
      center,
      tileWidth * originMarkerScale,
      tileHeight * originMarkerScale
    );
    ctx.fill();

    ctx.restore();
  }
}


function drawEightPointStar(
  ctx: CanvasRenderingContext2D,
  origin: Vector2,
  xScale: number = 1,
  yScale: number = 1
) {
  let x = origin.x;
  let y = origin.y;
  let w = xScale / 2;
  let h = yScale / 2;

  ctx.beginPath();

  // diagonal square
  ctx.moveTo(x, y - h); // top
  ctx.lineTo(x + w, y); // right
  ctx.lineTo(x, y + h); // bottom
  ctx.lineTo(x - w, y); // left
  ctx.closePath();

  // horizontal square
  w = w / Math.sqrt(2);
  h = h / Math.sqrt(2);
  ctx.rect(x - w, y - h, 2*w, 2*h);
}

export default UnitMoveRange;