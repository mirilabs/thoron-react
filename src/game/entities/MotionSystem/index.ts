import GameObject from "engine/GameObject";
import Scene from "engine/Scene";
import Game from "game/Game";
import { GameController, ChapterEvent } from "thoron";
import AsyncQueue from "./AsyncQueue";
import AttackMotion from "./AttackMotion";

class MotionSystem extends GameObject {
  game: Game;
  gameController: GameController;
  motionQueue: AsyncQueue = new AsyncQueue();

  private removeGameListener: () => void;

  constructor(game: Game) {
    super();
    this.game = game;
    this.gameController = game.gameController;
  }

  onInit(scene: Scene): void {
    const unsubscribe = this.gameController.subscribe((result) => {
      let motions = result.events.map(event => {
        return this.getMotionCallback(event);
      });
      this.motionQueue.add(...motions);
    });

    this.removeGameListener = unsubscribe;
  }

  onDestroy(): void {
    this.removeGameListener();
  }

  getMotionCallback(event: ChapterEvent): () => Promise<void> {
    const unit = this.game.getUnitBody(event.unitId);

    switch(event.type) {
      case "combat_attack":
        let target = this.game.getUnitBody(event.targetId);
        return AttackMotion(this.game, unit, target, event);
      case "end_action":
        return async () => {
          unit.grayscale = true;
        }
      default:
        return
    }
  }
}

export default MotionSystem;