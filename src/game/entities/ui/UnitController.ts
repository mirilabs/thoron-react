import GameObject from "../../../engine/GameObject";
import Game, { IGameConfig } from "../../Game";
import { CursorEvent, Vector2 as IVector2 } from "../../../engine/components";
import Vector2 from "../../../engine/utils/Vector2";
import UnitMoveRange from "./UnitMoveRange";
import Scene from "../../../engine/Scene";
import CoordinateConverter from "../../utils/CoordinateConverter";
import UnitPiece from "../UnitPiece";
import UIEventEmitter from "../../../utils/UIEventEmitter";
import UnitPath from "./UnitPath";
import UnitActionRange from "./UnitActionRange";

abstract class ControllerState {
  controller: UnitController;
  setState: (state: ControllerState) => void;

  bindController(controller: UnitController) {
    this.controller = controller;
    this.setState = controller.setState.bind(controller);
  }

  onEnter(controller: UnitController, prevState: ControllerState) {}
  onExit(controller: UnitController, prevState: ControllerState) {}
  onMouseDown(event: CursorEvent) {}
  onMouseMove(event: CursorEvent) {}
  onMouseUp(event: CursorEvent) {}
}

class IdleState extends ControllerState {
  onEnter(...args: any[]): void {
    this.controller.scene.draw();
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
      this.setState(new MovingState());
    }
    else {
      this.controller.selectUnit(null);
      this.setState(new PanningState());
    }
  }
}

class PanningState extends ControllerState {
  onMouseMove(event: CursorEvent): void {
    let movement = {
      x: event.movementX,
      y: event.movementY
    }
    this.controller.scene.camera.pan(movement);
    this.controller.scene.draw();
  }

  onMouseUp(event: CursorEvent): void {
    this.setState(new IdleState());
    this.controller.scene.draw();
  }
}

class MovingState extends ControllerState {
  moveRangeEnt: UnitMoveRange;
  pathEnt: UnitPath
  
  selectedPiece: UnitPiece;
  selectedUnit: any;
  entityPos: IVector2;

  lastX: number;
  lastY: number;

  onEnter(controller: UnitController, prevState: ControllerState) {
    const { game, selectedPiece } = controller;
    this.selectedPiece = selectedPiece;
    this.selectedUnit = selectedPiece.unit;

    this.moveRangeEnt = new UnitMoveRange(game, selectedPiece.unit);
    this.moveRangeEnt.addToScene(controller.scene);
    
    this.pathEnt = new UnitPath(game, selectedPiece.unit);
    this.pathEnt.addToScene(controller.scene);

    controller.scene.draw();

    this.entityPos = this.selectedPiece.entity.getComponent('position');
  }

  onExit(): void {
    this.moveRangeEnt.destroy();
    this.pathEnt.destroy();
  }

  moveEntity(x: number, y: number) {
    this.entityPos.x = x;
    this.entityPos.y = y;
  }

  onMouseMove(event: CursorEvent): void {   
    // if hovering over a new tile that can be moved to, update targetPos
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    if (tileCoords.x !== this.lastX || tileCoords.y !== this.lastY) {
      let range = this.selectedUnit.getMoveRange();
      
      // TODO add a better way to get this conditional in thoron
      let inRange = false;
      range.forEach(({ x, y }) => {
        inRange = inRange || (x === tileCoords.x && y === tileCoords.y);
      });
      
      if (inRange) {
        this.pathEnt.updateTargetPos(tileCoords);
      }
    }
    this.lastX = tileCoords.x;
    this.lastY = tileCoords.y;
    
    // unit sprite follows cursor
    this.moveEntity(
      event.x - this.controller.config.tileWidth / 2,
      event.y - this.controller.config.tileHeight / 2
    );
    this.controller.scene.draw();
  }

  onMouseUp(event: CursorEvent) {
    let targetPos = this.pathEnt.getLastNode();
    let pixelCoords = this.controller.coords.toPixels(targetPos.x, targetPos.y);
    this.moveEntity(pixelCoords.x, pixelCoords.y);
    this.setState(new ActingState(targetPos));
  }
}

class ActingState extends ControllerState {s
  selectedPiece: UnitPiece;
  selectedUnit: any;
  moveTarget: IVector2;  // coords from which the unit will attack
  actionRangeEnt: UnitActionRange;

  constructor(moveTarget: IVector2) {
    super();
    this.moveTarget = moveTarget;
  }

  onEnter(controller: UnitController, prevState: ControllerState) {
    const { game, selectedPiece } = controller;
    this.selectedPiece = selectedPiece;
    this.selectedUnit = selectedPiece.unit;
    
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      this.moveTarget
    );
    this.actionRangeEnt.addToScene(controller.scene);
    
    this.controller.scene.draw();
  }

  onExit(controller: UnitController, prevState: ControllerState): void {
    this.actionRangeEnt.destroy();
  }

  onMouseDown(event: IVector2): void {
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, this.moveTarget)) {
      console.log(this.controller);
    }
    else if (unit && unit !== this.selectedUnit) {
      console.log(unit);
    }
    else {
      // return to original position
      let { x, y } = this.selectedUnit.getPosition();
      let originalPos = this.controller.coords.toPixels(x, y);
      this.selectedPiece.rect.moveTo(originalPos.x, originalPos.y);

      // reset state
      this.setState(new IdleState());
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
    
    this.setState(new IdleState());
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

  setState(nextState: ControllerState) {
    const prevState = this.currentState;
    if (this.currentState) this.currentState.onExit(this, nextState);

    nextState.bindController(this);
    this.currentState = nextState;
    this.currentState.onEnter(this, prevState);
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