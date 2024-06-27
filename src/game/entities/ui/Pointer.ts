import GameObject from "../../../engine/GameObject";
import Game from "../../Game";
import EventEmitter from "../../../lib/EventEmitter";
import CoordinateConverter from "../../utils/CoordinateConverter";
import { ICursorEvent } from "../../../engine/components";

class Pointer extends GameObject {
  chapter;
  coords: CoordinateConverter;
  uiEvents: EventEmitter;
  lastX: number;
  lastY: number;

  constructor(game: Game) {
    super();
    this.chapter = game.chapter;
    this.coords = game.coords;
    this.uiEvents = game.uiEvents;

    this.components = {
      position: { x: 0, y: 0 },
      cursorEvents: {
        onMouseDown: this.onMouseDown.bind(this)
      }
    }
  }

  onMouseDown({ x, y }: ICursorEvent) {
    let tileCoords = this.coords.toTiles(x, y);
    if (tileCoords.x === this.lastX && tileCoords.y === this.lastY) return;
    
    // set selected tile in ui
    let tile = this.chapter.terrain.getTile(tileCoords.x, tileCoords.y);
    this.uiEvents.emit('select_tile', tile);
    
    // set selected unit in ui
    let unit = this.chapter.getUnitAt(tileCoords);
    if (unit)
      this.uiEvents.emit('select_unit', unit);

    this.lastX = tileCoords.x;
    this.lastY = tileCoords.y;
  }
}

export default Pointer;