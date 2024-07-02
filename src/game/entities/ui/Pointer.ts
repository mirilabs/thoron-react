import GameObject from "../../../engine/GameObject";
import Game from "../../Game";
import { ICursorEvent, IPosition } from "../../../engine/components";

class PointerState {
  pointer: Pointer;
  game: Game;
  setState: (NextState: typeof PointerState) => void;

  constructor(pointer: Pointer) {
    this.bindPointer(pointer);
  }

  bindPointer(pointer: Pointer) {
    this.pointer = pointer;
    this.game = pointer.game;
    this.setState = pointer.setState.bind(pointer);
  }

  onEnter() {}
  onExit() {}
  onMouseDown(tileCoords: IPosition) {}
  onMouseMove(tileCoords: IPosition) {}
  onMouseUp(tileCoords: IPosition) {}
}

class IdleState extends PointerState {
  onMouseDown(tileCoords: IPosition): void {
    const {
      chapter,
      uiEvents
    } = this.game;

    // set selected tile in ui
    let tile = chapter.terrain.getTile(tileCoords.x, tileCoords.y);
    uiEvents.emit('select_tile', tile);
    
    // set selected unit in ui
    let unit = chapter.getUnitAt(tileCoords);
    if (unit)
      this.selectUnit(unit);
    else
      this.selectUnit(null);
  }

  selectUnit(unit) {
    this.game.uiEvents.emit('select_unit', unit);
  }
}

class Pointer extends GameObject {
  chapter;
  game: Game;
  lastX: number;
  lastY: number;
  currentState: PointerState;

  constructor(game: Game) {
    super();
    this.game = game;

    this.components = {
      position: { x: 0, y: 0 },
      cursorEvents: {
        onMouseDown: this.onMouseDown.bind(this)
      }
    }
    
    this.setState(IdleState);
  }

  setState(State: typeof PointerState) {
    if (this.currentState) this.currentState.onExit();
    this.currentState = new State(this);
    this.currentState.onEnter();
  }

  passCursorEvent(
    { x, y }: ICursorEvent,
    cb: (tileCoords: IPosition) => void
  ) {
    let tileCoords = this.game.coords.toTiles(x, y);

    if (tileCoords.x === this.lastX && tileCoords.y === this.lastY) return;
    this.lastX = tileCoords.x;
    this.lastY = tileCoords.y;

    cb.call(this.currentState, tileCoords);
  }

  onMouseDown(event: ICursorEvent) {
    this.passCursorEvent(event, this.currentState.onMouseDown);
  }

  onMouseMove(event: ICursorEvent) {
    this.passCursorEvent(event, this.currentState.onMouseMove);
  }

  onMouseUp(event: ICursorEvent) {
    this.passCursorEvent(event, this.currentState.onMouseUp);
  }
}

export default Pointer;