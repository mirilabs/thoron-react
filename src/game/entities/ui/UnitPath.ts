import { Vector2 as IVector2 } from "../../../engine/components";
import GameObject from "../../../engine/GameObject";
import Vector2 from "../../../engine/utils/Vector2";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";

class UnitPath extends GameObject {
  game: Game;
  chapter: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  lastX: number;
  lastY: number;
  unit: any;

  origin: IVector2;
  path: IVector2[] = [];
  
  constructor(game: Game, unit: any) {
    super();
    this.game = game;
    this.chapter = game.chapter;
    this.coords = game.coords;
    this.config = game.config;
    this.unit = unit;
    this.origin = unit.getPosition();

    this.components.draw = this.draw.bind(this);
  }

  getLastNode() {
    return this.path[this.path.length - 1] ?? this.origin;
  }

  static nodesAreContiguous(pos1: IVector2, pos2: IVector2): boolean {
    let dx = Math.abs(pos1.x - pos2.x);
    let dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }

  updateTargetPos(target: IVector2) {
    if (Vector2.eq(target, this.getLastNode())) return;

    // add to path
    this.path.push(target);

    let pathCost: number = this.path.reduce(
      (prev: number, current: IVector2) => {
        let tile = this.chapter.terrain.getTile(current.x, current.y);
        return prev + tile.getMoveCost(this.unit.moveType);
      }, 0
    );

    // if total path cost exceeds unit movement,
    // or next target is not contiguous with current path,
    let shouldRegenPath = pathCost > this.unit.movement ||
      !UnitPath.nodesAreContiguous(target, this.getLastNode())
    
    if (shouldRegenPath) {
      // recreate a shorter path
      this.path = this.chapter.terrain.getShortestPath(
        this.origin,
        target,
        this.unit
      );
    }
    console.log(this.path.map(({ x, y}) => `(${x},${y})`));
    

    this.game.scene.draw();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = this.config.tileWidth / 16;
    ctx.lineCap = 'round';

    ctx.beginPath();

    let origin = this.coords.toPixels(
      this.origin.x,
      this.origin.y,
      CoordinateConverter.RectMode.CENTER
    );
    ctx.moveTo(origin.x, origin.y);

    let pixelCoords = this.path.map(({ x, y }) => {
      return this.coords.toPixels(x, y, CoordinateConverter.RectMode.CENTER);
    });

    pixelCoords.forEach(({ x, y }) => {
      ctx.lineTo(x, y);
    });

    ctx.stroke();
    ctx.restore();

    this.drawArrowhead(ctx);
  }

  drawArrowhead(ctx: CanvasRenderingContext2D) {
    const end = this.getLastNode();
    const center = this.coords.toPixels(
      end.x,
      end.y,
      CoordinateConverter.RectMode.CENTER
    );
    const length = this.config.tileWidth * 0.25;

    ctx.save();
    ctx.fillStyle = "#00ffff";

    ctx.translate(center.x, center.y);
    ctx.rotate(45 * Math.PI/180);
    ctx.fillRect(-length/2, -length/2, length, length);

    ctx.restore();
  }
}

export default UnitPath;