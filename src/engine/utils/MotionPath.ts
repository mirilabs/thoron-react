import Entity from "engine/Entity";
import Vector2 from "./Vector2";
import { Vector2 as IVector2 } from "../components";

enum MovementMode {
  LINEAR
}

class MotionPath {
  entity: Entity;
  segments: MotionPathSegment[] = [];
  currentIndex: number = 0;
  repeat: boolean = false;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  get currentSegment(): MotionPathSegment {
    return this.segments[this.currentIndex];
  }

  get lastSegment(): MotionPathSegment {
    return this.segments[this.segments.length - 1];
  }

  /**
   * Add a new target location to the path
   * @param dest Vector coordinates
   * @param time Amount of time it will take to get there
   * @param mode Type of motion
   */
  addNode(
    dest: IVector2,
    time = 200,
    mode: MovementMode = MovementMode.LINEAR
  ) {
    // get origin from end of last segment,
    // or, if no segments exist, from entity position
    let origin = this.lastSegment ?
      this.lastSegment.destination :
      Vector2.copy(this.entity.getComponent("position"));

    this.segments.push(new MotionPathSegment(origin, dest, time, mode));
  }

  private nextSegment(): MotionPathSegment | undefined {
    this.currentIndex++;
    
    // if repeating, return to first segment
    if (this.currentIndex >= this.segments.length) {
      this.currentIndex = this.repeat ? 0 : undefined;
    }

    return this.currentSegment;
  }

  /**
   * Start moving the entity along this MotionPath
   * @returns A promise that resolves when the motion has finished
   */
  start(): Promise<void> {
    return new Promise<void>((resolve) => {
      let position = this.entity.getComponent("position") as IVector2;
      let elapsedTime = 0;
      let motion = this.entity.addChild();
  
      motion.addComponent("update", (dT: number) => {
        elapsedTime += dT;
        
        // update position
        let nextPos = this.currentSegment.getPosition(elapsedTime);
        position.x = nextPos.x;
        position.y = nextPos.y;
  
        // move to next segment if done with current one
        if (elapsedTime >= this.currentSegment.time) {
          let nextSegment = this.nextSegment();
  
          if (nextSegment) {
            elapsedTime = 0;
          }
          else {
            // if next segment does not exist, end motion
            motion.destroy();
            resolve();
          }
        }
      });
    });
  }
}

class MotionPathSegment {
  origin: IVector2;
  destination: IVector2;
  time: number;
  mode: MovementMode;

  constructor(
    origin: IVector2,
    dest: IVector2,
    time: number,
    mode: MovementMode
  ) {
    this.origin = origin;
    this.destination = dest;
    this.time = time;
    this.mode = mode;
  }

  getPosition(elapsedTime: number): IVector2 {
    let progress = elapsedTime / this.time;
    return Vector2.lerp(this.origin, this.destination, progress);
  }
}

export default MotionPath;