import GameObject from "../../../engine/GameObject";
import Game from "../../Game";
import { CursorEvent, Vector2 } from "../../../engine/components";
import Entity from "../../../engine/Entity";

class PointerState {
  pointer: Pointer;
  game: Game;
  setState: (NextState: typeof PointerState, ...args: any[]) => void;

  constructor(pointer: Pointer) {
    this.bindPointer(pointer);
  }

  bindPointer(pointer: Pointer) {
    this.pointer = pointer;
    this.game = pointer.game;
    this.setState = pointer.setState.bind(pointer);
  }

  onEnter(...args: any[]) {}
  onExit() {}
  onMouseDown(tileCoords: Vector2) {}
  onMouseMove(tileCoords: Vector2) {}
  onMouseUp(tileCoords: Vector2) {}
}

class IdleState extends PointerState {
  onEnter(...args: any[]): void {
    this.game.uiEvents.emit('pointer_state', 'idle');
  }

  onMouseDown(event: CursorEvent): void {
    const {
      chapter,
      uiEvents
    } = this.game;

    // set selected tile in ui
    let tileCoords = this.game.coords.toTiles(event.x, event.y);
    let tile = chapter.terrain.getTile(tileCoords.x, tileCoords.y);
    uiEvents.emit('select_tile', tile);
    
    // set selected unit in ui
    let unit = chapter.getUnitAt(tileCoords);
    let ent = this.game.getUnitEntity(unit);

    if (unit) {
      this.selectUnit(unit);
      this.setState(DraggingState, unit, ent);
    }
    else {
      this.selectUnit(null);
    }
  }

  selectUnit(unit) {
    this.game.uiEvents.emit('select_unit', unit);
  }
}

class DraggingState extends PointerState {
  selectedUnit: any;
  entityPos: Vector2;
  lastX: number;
  lastY: number;

  onEnter(unit: any, entity: Entity): void {
    this.game.uiEvents.emit('pointer_state', 'dragging');

    this.selectedUnit = unit;
    this.entityPos = entity.getComponent('position');
  }

  moveEntity(x: number, y: number) {
    this.entityPos.x = x;
    this.entityPos.y = y;
  }

  onMouseMove(event: CursorEvent): void {    
    // update currently hovering tile coords
    let tileCoords: Vector2 = this.game.coords.toTiles(event.x, event.y);
    let { x, y } = tileCoords;

    if (x !== this.lastX || y !== this.lastY) {
      console.log(x, y);
    }
    this.lastX = x;
    this.lastY = y;

    // unit sprite follows cursor
    this.moveEntity(
      event.x - this.game.config.tileWidth / 2,
      event.y - this.game.config.tileHeight / 2
    );
    this.game.scene.draw();
  }

  onMouseUp(event: CursorEvent) {
    let tileCoords = this.game.coords.toTiles(event.x, event.y);
    let targetPos = this.game.coords.toPixels(tileCoords.x, tileCoords.y);
    this.moveEntity(targetPos.x, targetPos.y);

    this.setState(IdleState);
  }
}

class Pointer extends GameObject {
  chapter;
  game: Game;
  currentState: PointerState;
  
  constructor(game: Game) {
    super();
    this.game = game;

    this.components = {
      position: { x: 0, y: 0 },
      cursorEvents: {
        onMouseDown: this.onMouseDown.bind(this),
        onMouseMove: this.onMouseMove.bind(this),
        onMouseUp: this.onMouseUp.bind(this)
      }
    }
    
    this.setState(IdleState);
  }

  setState(State: typeof PointerState, ...nextStateArgs: any[]) {
    if (this.currentState) this.currentState.onExit();
    this.currentState = new State(this);
    this.currentState.onEnter(...nextStateArgs);
  }

  onMouseDown(event: CursorEvent) {
    this.currentState.onMouseDown(event);
  }

  onMouseMove(event: CursorEvent) {
    this.currentState.onMouseMove(event);
  }

  onMouseUp(event: CursorEvent) {
    this.currentState.onMouseUp(event);
  }
}

export default Pointer;