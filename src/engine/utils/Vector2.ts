import { Vector2 as IVector2 } from "../components";

class Vector2 implements IVector2 {
  x: number;
  y: number;

  static eq(left: IVector2, right: IVector2) {
    return left.x === right.x && left.y === right.y;
  }

  static sum(left: IVector2, right: IVector2) {
    return {
      x: left.x + right.x,
      y: left.y + right.y
    }
  }

  static difference(left: IVector2, right: IVector2) {
    return {
      x: left.x - right.x,
      y: left.y - right.y
    }
  }

  static scale(v: IVector2, scale: number) {
    return {
      x: v.x * scale,
      y: v.y * scale
    }
  }

  static rotateAboutOrigin(v: IVector2, theta: number) {
    let { x, y } = v;
    let sinT = Math.sin(theta);
    let cosT = Math.cos(theta);
    
    return {
      x: x * cosT - y * sinT,
      y: y * cosT + x * sinT
    }
  }
}

export default Vector2;