import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import { CursorEvent, Vector2 as IVector2 } from "../../../engine/components";
import Vector2 from "../../../engine/utils/Vector2";
import UnitMoveRange from "./UnitMoveRange";
import Scene from "../../../engine/Scene";
import CoordinateConverter from "../../utils/CoordinateConverter";
import UnitPiece from "../UnitPiece";
import UIEventEmitter from "../../utils/UIEventEmitter";

class ControllerState {
  controller: UnitController;
  setState: (NextState: typeof ControllerState, ...args: any[]) => void;

  constructor(controller: UnitController) {
    this.bindController(controller);
  }

  bindController(controller: UnitController) {
    this.controller = controller;
    this.setState = controller.setState.bind(controller);
  }

  onEnter() {}
  onExit() {}
  onMouseDown(tileCoords: IVector2) {}
  onMouseMove(tileCoords: IVector2) {}
  onMouseUp(tileCoords: IVector2) {}
}

class IdleState extends ControllerState {
  onEnter(...args: any[]): void {
    this.controller.uiEvents.emit('pointer_state', 'idle');
  }

  onMouseDown(event: CursorEvent): void {
    const {
      chapter,
      uiEvents
    } = this.controller;

    // set selected tile in ui
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let tile = chapter.terrain.getTile(tileCoords.x, tileCoords.y);
    uiEvents.emit('select_tile', tile);
    
    // set selected unit in ui
    let unit = chapter.getUnitAt(tileCoords);

    if (unit) {
      this.controller.selectUnit(unit);
      this.setState(MovingState);
    }
    else {
      this.controller.selectUnit(null);
    }
  }
}

class MovingState extends ControllerState {
  entityPos: IVector2;
  dragOffset: IVector2;
  moveRangeEnt: UnitMoveRange;
  selectedPiece: UnitPiece;
  selectedUnit: any;
  lastX: number;
  lastY: number;

  constructor(controller: UnitController) {
    super(controller);
    const { game, selectedPiece } = controller;
    this.selectedPiece = selectedPiece;
    this.selectedUnit = selectedPiece.unit;

    this.moveRangeEnt = new UnitMoveRange(game, selectedPiece.unit);
    this.moveRangeEnt.addToScene(controller.scene);
    controller.scene.draw();

    this.entityPos = this.selectedPiece.entity.getComponent('position');
  }

  onExit(): void {
    this.moveRangeEnt.destroy();
  }

  moveEntity(x: number, y: number) {
    this.entityPos.x = x;
    this.entityPos.y = y;
  }

  onMouseMove(event: CursorEvent): void {   
    // // if hovering over a new tile that can be moved to, update targetPos
    // let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    // if (tileCoords.x !== this.lastX || tileCoords.y !== this.lastY) {
    //   let range = this.selectedUnit.getMoveRange();
      
    //   // TODO add a better way to get this conditional in thoron
    //   let inRange = false;
    //   range.forEach(({ x, y }) => {
    //     inRange = inRange || (x === tileCoords.x && y === tileCoords.y);
    //   });
      
    //   if (inRange) {
    //     console.log(tileCoords);
    //   }
    // }
    // this.lastX = tileCoords.x;
    // this.lastY = tileCoords.y;
    
    // unit sprite follows cursor
    this.moveEntity(
      event.x - this.controller.config.tileWidth / 2,
      event.y - this.controller.config.tileHeight / 2
    );
    this.controller.scene.draw();
  }

  onMouseUp(event: CursorEvent) {
    let { x, y } = this.selectedUnit.getPosition();
    let originalPos = this.controller.coords.toPixels(x, y);
    
    this.moveEntity(originalPos.x, originalPos.y);
    this.setState(IdleState);
    this.controller.scene.draw();

    // let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    // let targetPos = this.controller.coords.toPixels(tileCoords.x, tileCoords.y);
    // this.moveEntity(targetPos.x, targetPos.y);

    // this.setState(AttackingState, tileCoords);
  }
}

class AttackingState extends ControllerState {
  selectedUnit: any;
  moveTarget: IVector2;  // coords from which the unit will attack

  onEnter() {
    // this.moveTarget = moveTarget;
  }

  onMouseDown(event: IVector2): void {
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, this.moveTarget)) {
      console.log(this.selectedUnit);
    }
    else if (unit) {
      console.log(unit);
    }
    else {
      this.setState(IdleState);
    }
  }
}

class UnitController extends GameObject {
  game: Game;
  config: IGameConfig;
  uiEvents: UIEventEmitter;
  coords: CoordinateConverter;
  chapter: any;
  scene: Scene;
  unitPieces: Map<any, UnitPiece> = new Map();
  selectedPiece: UnitPiece;
  currentState: ControllerState;
  
  constructor(game: Game) {
    super();
    this.game = game;
    this.config = game.config;
    this.uiEvents = game.uiEvents;
    this.coords = game.coords;
    this.chapter = game.chapter;
    this.scene = game.scene;

    this.components = {
      cursorEvents: {
        onMouseDown: this.onMouseDown.bind(this),
        onMouseMove: this.onMouseMove.bind(this),
        onMouseUp: this.onMouseUp.bind(this)
      }
    }
    
    this.setState(IdleState);
  }

  onInit(scene: Scene) {
    this.chapter.units.forEach((unit) => {
      this.addUnit(unit);
    });
  }

  addUnit(unit) {
    let unitPiece = new UnitPiece(unit, this.config);
    let entity = unitPiece.addToScene(this.scene);

    this.unitPieces.set(unit, unitPiece);

    // move to initial position
    let { x, y } = this.chapter.getUnitById(unit.id).getPosition();
    let pixelCoords = this.coords.toPixels(x, y);
    Object.assign(entity.getComponent('position'), pixelCoords);
  }

  getUnitPiece(unit) {
    return this.unitPieces.get(unit);
  }
  
  removeUnit(unit) {
    let ent = this.getUnitPiece(unit);
    ent.destroy();
    this.unitPieces.delete(unit);
  }

  selectUnit(unit) {
    this.uiEvents.emit('select_unit', unit);

    if (unit)
      this.selectedPiece = this.getUnitPiece(unit);
  }

  setState(State: typeof ControllerState) {
    if (this.currentState) this.currentState.onExit();
    this.currentState = new State(this);
    this.currentState.onEnter();
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

export default UnitController;