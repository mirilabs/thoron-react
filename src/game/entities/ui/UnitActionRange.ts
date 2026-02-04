import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import CoordinateConverter from "../../utils/CoordinateConverter";
import { IVector2 } from "@/engine/utils/Vector2";
import DrawHandler from "@/engine/components/DrawHandler";
import { Command } from "thoron";
import TilePainter from "./TilePainter";

class UnitActionRange extends GameObject {
  chapter: any;
  coords: CoordinateConverter;
  config: IGameConfig;
  unit: any;
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

  paintTiles(ctx: CanvasRenderingContext2D) {
    const {
      tileWidth,
      tileHeight,
      highlightAlpha
    } = this.config;

    const painter = new TilePainter(tileWidth, tileHeight);

    // paint move range
    switch(this.command) {
      case "attack":
        painter.color = this.config.attackColor;
        painter.addTiles(this.chapter.terrain.getRange(
          this.targetPos,
          this.unit.equipped.minRange,
          this.unit.equipped.maxRange
        ).getCoords());
        break;
      case "trade":
        painter.color = this.config.interactColor;
        painter.addTiles(this.chapter.terrain.getRange(
          this.targetPos, 1
        ).getCoords());
        break;
      default:
        break;
    }
    
    // paint destination tile
    painter.addTile(this.targetPos, this.config.moveColor);

    ctx.save();
    ctx.globalAlpha = highlightAlpha;
    painter.paint(ctx);
    ctx.restore();
  }
}

export default UnitActionRange;