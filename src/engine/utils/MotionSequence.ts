import Entity from "@/engine/Entity";
import Vector2, { IVector2 } from "./Vector2";
import { UpdateFunction } from "../components";
import { EASE } from "./easingFunctions";
import type { EasingFunction } from "./easingFunctions";

interface MotionSegment {
  update: (progress: number) => void;
  time: number;
  easingFunction: EasingFunction
}

class MotionSequence {
  private repeating: boolean = false;
  entity: Entity;
  lastPosition: IVector2;
  segments: MotionSegment[] = [];
  currentIndex: number = 0;

  constructor(parent: Entity) {
    this.entity = parent;
  }

  get currentSegment() {
    return this.segments[this.currentIndex];
  }

  /**
   *  Adds a motion to the sequence
   *  @param update Called every frame while the motion is active. Accepts a
   *    variable `progress`, which is how much time out of the total time has
   *    elapsed at that frame (a number from 0 to 1).
   *  @param time Amount of time the motion should take (milliseconds)
   *  @param easingFunction Specify to modulate the rate at which `progress`
   *    increases
   */
  addMotion(
    update: (progress: number) => void,
    time: number,
    easingFunction: EasingFunction = EASE.linear
  ): MotionSequence {
    this.segments.push({
      update,
      time,
      easingFunction
    });

    return this;
  }

  /**
   *  Adds a delay to the motion queue
   *  @param time Time to wait, in milliseconds
   *  @returns this
   */
  wait(time: number): MotionSequence {
    this.addMotion(() => {}, time);
    return this;
  }

  /**
   * Add a new target location to the path
   * @param dest Vector coordinates
   * @param time Amount of time it will take to get there (milliseconds)
   * @param mode Type of motion
   */
  moveTo(
    dest: IVector2,
    time = 200,
    easingFunction: EasingFunction = EASE.linear
  ): MotionSequence {
    const origin = Vector2.copy(
      this.lastPosition ?? this.entity.getComponent("position")
    );
    const position = this.entity.getComponent("position");

    const update = (progress: number) => {
      let nextPos = Vector2.lerp(origin, dest, progress);
      position.x = nextPos.x;
      position.y = nextPos.y;
    }

    this.addMotion(update, time, easingFunction);
    this.lastPosition = dest;
    return this;
  }

  /**
   * Begin the motion sequence
   * @returns A promise that resolves when the sequence has finished
   */
  start(): Promise<void> {
    return new Promise((resolve) => {
      let elapsedTime = 0, progress: number;
      const ent = this.entity.addChild();
      
      const update = (dT: number) => {
        let { update, time, easingFunction } = this.currentSegment;

        elapsedTime += dT;
        progress = easingFunction(elapsedTime / time);
        
        update(progress);

        // move to next segment if done with current one
        if (elapsedTime >= time) {
          elapsedTime = 0;
          this.currentIndex++;

          // if done with all segments, either repeat or destroy entity
          if (this.currentIndex >= this.segments.length) {
            if (this.repeating) {
              this.currentIndex = 0;
            }
            else {
              ent.destroy();
              resolve();
            }
          }
        }
      }

      ent.addComponent(new UpdateFunction(update));
    });
  }

  /**
   * Begin the motion sequence on repeat
   */
  repeat(): void {
    this.repeating = true;
    this.start();
  }
}

export default MotionSequence;
export {
  EasingFunction,
  EASE
}