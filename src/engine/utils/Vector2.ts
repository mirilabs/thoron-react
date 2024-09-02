import { Vector2 as IVector2 } from "../components";

class Vector2 implements IVector2 {
  x: number;
  y: number;

  static copy(v: IVector2) {
    return {
      x: v.x,
      y: v.y
    }
  }

  static eq(left: IVector2, right: IVector2): boolean {
    return left.x === right.x && left.y === right.y;
  }

  static sum(left: IVector2, right: IVector2): IVector2 {
    return {
      x: left.x + right.x,
      y: left.y + right.y
    }
  }

  static difference(left: IVector2, right: IVector2): IVector2 {
    return {
      x: left.x - right.x,
      y: left.y - right.y
    }
  }

  static lengthSquared(v: IVector2): number {
    return v.x ** 2 + v.y ** 2;
  }

  static length(v: IVector2): number {
    return Math.sqrt(this.lengthSquared(v));
  }

  static distanceSquared(left: IVector2, right: IVector2): number {
    let d = this.difference(left, right);
    return this.lengthSquared(d);
  }

  static distance(left: IVector2, right: IVector2): number {
    let d = this.difference(left, right);
    return this.length(d);
  }

  static normalize(v: IVector2): IVector2 {
    let scale = 1 / this.length(v);
    return this.scale(v, scale);
  }

  static scale(v: IVector2, scale: number): IVector2 {
    return {
      x: v.x * scale,
      y: v.y * scale
    }
  }

  static lerp(v1: IVector2, v2: IVector2, fraction: number) {
    let d = this.difference(v2, v1);
    return {
      x: v1.x + (d.x * fraction),
      y: v1.y + (d.y * fraction)
    }
  }

  static rotateAboutOrigin(v: IVector2, theta: number): IVector2 {
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