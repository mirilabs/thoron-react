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
  private _controller: WeakRef<UnitController>;
  get controller(): UnitController {
    return this._controller.deref();
  }

  setState: (state: ControllerState) => void;

  bindController(controller: UnitController) {
    this._controller = new WeakRef(controller);
    this.setState = controller.setState.bind(controller);
  }

  getTileCoords(vec: IVector2): IVector2 {
    return this.controller.coords.toTiles(vec.x, vec.y);
  }

  onEnter(prevState: ControllerState) {}
  onExit(nextState: ControllerState) {}
  onMouseDown(event: CursorEvent) {}
  onMouseMove(event: CursorEvent) {}
  onMouseUp(event: CursorEvent) {}
}

class IdleState extends ControllerState {
  onEnter(): void {
    this.controller.scene.draw();
  }

  onMouseDown(event: CursorEvent): void {
    const {
      chapter,
      uiEvents
    } = this.controller;

    // set selected tile in ui
    let tileCoords = this.getTileCoords(event);
    uiEvents.emit('select_position', tileCoords);
    
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
  pathEnt: UnitPath;
  
  selectedPiece: UnitPiece;
  selectedUnit: any;
  entityPos: IVector2;

  lastX: number;
  lastY: number;

  onEnter(prevState: ControllerState) {
    const controller = this.controller;
    const scene = controller.scene;

    const { game, selectedPiece } = controller;
    this.selectedPiece = selectedPiece;
    this.selectedUnit = selectedPiece.unit;

    this.entityPos = this.selectedPiece.entity.getComponent('position');

    if (prevState instanceof ActionSelectingState) {
      // if moveRange and path entities existed on previous state,
      // get their references
      this.moveRangeEnt = prevState.moveRangeEnt;
      this.pathEnt = prevState.pathEnt;
    }
    else {
      // construct new moveRange and path entities
      this.moveRangeEnt = new UnitMoveRange(game, selectedPiece.unit);
      this.moveRangeEnt.addToScene(scene);
      
      this.pathEnt = new UnitPath(game, selectedPiece.unit);
      this.pathEnt.addToScene(scene);
      scene.draw();
    }
    
    this.controller.uiEvents.emit("open_action_menu");
  }

  onExit(nextState: ControllerState): void {
    if (!(nextState instanceof ActionSelectingState)) {
      this.moveRangeEnt.destroy();
      this.pathEnt.destroy();
      this.controller.uiEvents.emit("open_action_menu");
    }
  }

  moveEntity(x: number, y: number) {
    this.entityPos.x = x;
    this.entityPos.y = y;
    this.controller.scene.draw();
  }

  onMouseDown(event: CursorEvent): void {
    this.onMouseMove(event);
  }

  onMouseMove(event: CursorEvent): void {
    // execute onTileChange if hovering over a new tile
    let tileCoords = this.getTileCoords(event);
    if (tileCoords.x !== this.lastX || tileCoords.y !== this.lastY) {
      this.onTileChange(tileCoords);
      this.lastX = tileCoords.x;
      this.lastY = tileCoords.y;
    }
    
    // unit sprite follows cursor
    this.moveEntity(
      event.x - this.controller.config.tileWidth / 2,
      event.y - this.controller.config.tileHeight / 2
    );
  }

  onTileChange(nextCoords: IVector2) {
    // update pathEnt with new target position
    let range = this.selectedUnit.getMoveRange();
    if (range.includes(nextCoords)) {
      this.pathEnt.updateTargetPos(nextCoords);
    }

    // update ui with new targetPos
    let targetPos = this.pathEnt.getLastNode();
    this.controller.uiEvents.emit("select_position", targetPos);
  }

  onMouseUp(event: CursorEvent) {
    let targetPos = this.pathEnt.getLastNode();
    let pixelCoords = this.controller.coords.toPixels(targetPos.x, targetPos.y);
    this.moveEntity(pixelCoords.x, pixelCoords.y);
    this.setState(new ActionSelectingState());
  }
}

class ActionSelectingState extends ControllerState {
  moveRangeEnt: UnitMoveRange;
  pathEnt: UnitPath
  unitEnt: UnitPiece;

  constructor() {
    super();
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  onEnter(prevState: MovingState) {
    this.moveRangeEnt = prevState.moveRangeEnt;
    this.pathEnt = prevState.pathEnt;
    this.unitEnt = this.controller.selectedPiece;

    this.controller.uiEvents.on("select_action", this.onActionSelected);
  }

  onExit(nextState: ActingState) {
    if (!(nextState instanceof MovingState)) {
      this.moveRangeEnt.destroy();
      this.pathEnt.destroy();
      this.controller.uiEvents.emit("close_action_menu");
    }
    
    if (nextState instanceof IdleState) {
      // return unitEnt to original position
      let { x, y } = this.unitEnt.unit.getPosition();
      let originalPos = this.controller.coords.toPixels(x, y);
      this.unitEnt.rect.moveTo(originalPos.x, originalPos.y);
    }

    this.controller.uiEvents.off("select_action", this.onActionSelected);
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    
    if (this.unitEnt.unit.getMoveRange().includes(tileCoords)) {
      this.setState(new MovingState());
      
      // pass mousedown event to next state
      this.controller.currentState.onMouseDown(event);
    }
    else {
      this.setState(new IdleState());
    }
  }

  getTargetPos(): IVector2 {
    return this.pathEnt.getLastNode();
  }

  onActionSelected(action: string) {
    if (action === "cancel") {
      this.setState(new IdleState());
    }
    else {
      this.setState(new ActingState(this.getTargetPos(), action));
    }
  }
}

class ActingState extends ControllerState {
  unitEnt: UnitPiece;
  selectedUnit: any;
  moveTarget: IVector2;  // coords from which the unit will attack
  action: string;
  actionRangeEnt: UnitActionRange;

  constructor(moveTarget: IVector2, action: string) {
    super();
    this.moveTarget = moveTarget;
    this.action = action;
  }

  onEnter(prevState: ControllerState) {
    const { game, selectedPiece, scene } = this.controller;
    this.unitEnt = selectedPiece;
    this.selectedUnit = selectedPiece.unit;
    
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      this.moveTarget
    );
    this.actionRangeEnt.addToScene(scene);
    scene.draw();
  }

  onExit(prevState: ControllerState): void {
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
      this.unitEnt.rect.moveTo(originalPos.x, originalPos.y);

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
    if (this.currentState) this.currentState.onExit(nextState);

    nextState.bindController(this);
    this.currentState = nextState;
    this.currentState.onEnter(prevState);
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