import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";
import { IVector2 } from "@/engine/utils/Vector2";
import DrawHandler from "@/engine/components/DrawHandler";
import { Command, DeployedUnit } from "thoron";
import TilePainter from "./TilePainter";

class UnitActionRange extends GameObject {
  chapter: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  unit: DeployedUnit;
  targetPos: IVector2;
  drawHandler: DrawHandler;
  command: Command;

  constructor(game: Game, unit: any, targetPos: IVector2, command: Command) {
    super();
    this.chapter = game.chapter;
    this.coords = game.coords;
    this.config = game.config;
    this.unit = unit;
    this.targetPos = targetPos;
    this.drawHandler = new DrawHandler(this.draw.bind(this), 30);
    this.command = command;

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

  private getActionRange(command: Command): [number, number] {
    let min = 0;
    let max = 0;
    switch (command) {
      case "attack":
        min = this.unit.getMinAttackRange();
        max = this.unit.getMaxAttackRange();
        break;
      case "staff":
        min = this.unit.getMinStaffRange();
        max = this.unit.getMaxStaffRange();
        break;
      case "trade":
        min = 1;
        max = 1;
        break;
      default:
        min = 0;
        max = 0;
        break;
    }
    return [min, max];
  }

  paintTiles(ctx: CanvasRenderingContext2D) {
    const {
      tileWidth,
      tileHeight,
      highlightAlpha
    } = this.config;

    const painter = new TilePainter(tileWidth, tileHeight);

    const commandColor = this.config.highlightColors[this.command];
    if (!commandColor) return;

    const [min, max] = this.getActionRange(this.command);
    const coords = this.chapter.terrain
      .getRange(this.targetPos, min, max)
      .getCoords();

    // action range
    painter.setTiles(coords, commandColor);

    // destination tile
    painter.setTile(this.targetPos, this.config.highlightColors.move);

    ctx.save();
    ctx.globalAlpha = highlightAlpha;
    painter.paint(ctx);
    ctx.restore();
  }
}

export default UnitActionRange;