import GameObject from "engine/GameObject";
import Scene from "engine/Scene";
import Game from "game/Game";
import { GameController, ChapterEvent } from "thoron";
import AsyncQueue from "./AsyncQueue";
import MotionPath from "engine/utils/MotionPath";

class MotionSystem extends GameObject {
  game: Game;
  gameController: GameController;
  motionQueue: AsyncQueue;

  private removeGameListener: () => void;

  constructor(game: Game) {
    super();
    this.game = game;
    this.gameController = game.gameController;
  }

  onInit(scene: Scene): void {
    this.removeGameListener = this.gameController.subscribe((result) => {
      console.log(result.events);
    });
  }

  onDestroy(): void {
    this.removeGameListener();
  }

  addEvent(event: ChapterEvent) {
    // TODO create entities/MotionPaths depending on event type and add them to
    //  motionQueue
    switch(event.type) {
      case "combat_attack":
        break;
      default:
        return
    }
  }
}

export default MotionSystem;