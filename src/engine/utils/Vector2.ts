import { Vector2 as IVector2 } from "../components";

class Vector2 implements IVector2 {
  x: number;
  y: number;

  static eq(left: Vector2, right: Vector2) {
    return left.x === right.x && left.y === right.y;
  }
}

export default Vector2;