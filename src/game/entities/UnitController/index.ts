import GameObject from "engine/GameObject";
import Scene from "engine/Scene";
import Game, { IGameConfig } from "game/Game";
import CoordinateConverter from "game/utils/CoordinateConverter";
import UIEventEmitter from "utils/UIEventEmitter";
import UnitPiece from "../UnitPiece";
import { CursorEvent } from "engine/components";
import ControllerState from "./ControllerState";
import IdleState from "./IdleState";

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
    let unitPiece = new UnitPiece(unit, this.game);
    unitPiece.addToScene(this.scene);

    this.unitPieces.set(unit, unitPiece);

    // move to initial position
    unitPiece.resetPosition();
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

    // unselect previous unit
    if (this.selectedPiece) {
      this.selectedPiece.hideMoveRange();
      this.scene.draw();
    }
    
    // set new unit
    if (unit) {
      this.selectedPiece = this.getUnitPiece(unit);
      this.selectedPiece.showMoveRange();
      this.scene.draw();
    }
    else {
      delete this.selectedPiece;
    }
  }

  setState(nextState: ControllerState) {
    // console.log(
    //   this.currentState?.constructor.name + " => " +
    //   nextState.constructor.name
    // );

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