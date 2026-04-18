import { PayloadAction, removeListener } from "@reduxjs/toolkit";
import GameObject from "@/engine/GameObject";
import Scene from "@/engine/Scene";
import CursorEventHandler, { ICursorEvent } from "@/engine/components/CursorEventHandler";
import Game, { IGameConfig } from "@/game/Game";
import CoordinateConverter from "@/game/utils/CoordinateConverter";
import UIEventEmitter from "@/shared/UIEventEmitter";
import ControllerState from "./ControllerState";
import controllerStore, { phaseChanged } from "@/shared/store";
import { addAppListener } from "@/shared/listenerMiddleware";
import {
  IdleState,
  MovingState,
  FreeMoveState
} from "./states";
import Chapter, { Controller } from "thoron";
import UnitBody from "../UnitBody";

class ControlSystem extends GameObject {
  game: Game;
  config: IGameConfig;
  uiEvents: UIEventEmitter;
  coords: CoordinateConverter;
  gameController: Controller;
  chapter: Chapter;
  scene: Scene;
  selectedUnitBody: UnitBody;
  currentState: ControllerState;

  private selectionEffect = (action: PayloadAction) => (
    this.onUnitSelected(action.payload)
  );

  constructor(game: Game) {
    super();
    this.game = game;
    this.config = game.config;
    this.uiEvents = game.uiEvents;
    this.coords = game.coords;
    this.chapter = game.chapter;
    this.scene = game.scene;

    this.components = [
      new CursorEventHandler({
        onMouseDown: this.onMouseDown.bind(this),
        onMouseMove: this.onMouseMove.bind(this),
        onMouseUp: this.onMouseUp.bind(this)
      })
    ]

    controllerStore.dispatch(addAppListener({
      type: "controller/unitSelected",
      effect: this.selectionEffect
    }));


    this.setState(new IdleState());
  }

  onDestroy(): void {
    controllerStore.dispatch(removeListener({
      type: "controller/unitSelected",
      effect: this.selectionEffect
    }));
  }


  getUnitBody(unitId: string | number) {
    return this.game.getUnitBody(unitId);
  }

  onUnitSelected(unitId) {
    const unit = this.chapter.getUnitById(unitId);

    // unselect previous unit
    if (this.selectedUnitBody) {
      this.selectedUnitBody.resetPosition();
      this.selectedUnitBody.hideMovePath();
      this.selectedUnitBody.hideMoveRange();
      this.scene.draw();
    }

    // set new unit
    if (unit) {
      this.selectedUnitBody = this.getUnitBody(unit.id);

      // if in unit move mode, enter free move state
      const editMode = controllerStore.getState().editMode;
      if (editMode === "unit_move") {
        this.setState(new FreeMoveState());
        return;
      }

      this.selectedUnitBody.showMoveRange();

      let { canAct, team } = unit.getActionState();
      if (canAct && team === this.chapter.actionController.currentPhase) {
        this.setState(new MovingState());
      }
    }
    else {
      delete this.selectedUnitBody;
      if (!(this.currentState instanceof IdleState)) {
        this.setState(new IdleState());
      }
    }
  }

  get selectedUnit() {
    return this.selectedUnitBody.unit;
  }

  setState(nextState: ControllerState) {
    // console.log(
    //   this.currentState?.constructor.name + " --> " +
    //   nextState.constructor.name
    // );

    const prevState = this.currentState;
    if (this.currentState) this.currentState.onExit(nextState);

    nextState.bindController(this);
    this.currentState = nextState;
    this.currentState.onEnter(prevState);

    controllerStore.dispatch(phaseChanged(nextState.id));
  }

  onMouseDown(event: ICursorEvent) {
    this.currentState.onMouseDown(event);
  }

  onMouseMove(event: ICursorEvent) {
    this.currentState.onMouseMove(event);
  }

  onMouseUp(event: ICursorEvent) {
    this.currentState.onMouseUp(event);
  }
}

export default ControlSystem;