interface IVector2 {
  x: number;
  y: number;
}

class Vector2 implements IVector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static copy(v: IVector2): Vector2 {
    return new Vector2(v.x, v.y);
  }

  copy(): Vector2 {
    return Vector2.copy(this);
  }

  static eq(v1: IVector2, v2: IVector2): boolean {
    return v1.x === v2.x && v1.y === v2.y;
  }

  eq(v: IVector2): boolean {
    return Vector2.eq(this, v);
  }

  static sum(v1: IVector2, v2: IVector2): Vector2 {
    return new Vector2(
      v1.x + v2.x,
      v1.y + v2.y
    )
  }

  sum(v: IVector2): Vector2 {
    return Vector2.sum(this, v);
  }

  static difference(v1: IVector2, v2: IVector2): Vector2 {
    return new Vector2(
      v1.x - v2.x,
      v1.y - v2.y
    );
  }

  difference(v: IVector2): Vector2 {
    return Vector2.difference(this, v);
  }

  static lengthSquared(v: IVector2): number {
    return v.x ** 2 + v.y ** 2;
  }

  lengthSquared(): number {
    return Vector2.lengthSquared(this);
  }

  static length(v: IVector2): number {
    return Math.sqrt(Vector2.lengthSquared(v));
  }

  length(): number {
    return Vector2.length(this);
  }

  static distanceSquared(v1: IVector2, v2: IVector2): number {
    let d = Vector2.difference(v1, v2);
    return Vector2.lengthSquared(d);
  }

  distanceSquared(v: IVector2): number {
    return Vector2.distanceSquared(this, v);
  }

  static distance(v1: IVector2, v2: IVector2): number {
    let d = Vector2.difference(v1, v2);
    return Vector2.length(d);
  }

  distance(v: IVector2): number {
    return Vector2.distance(this, v);
  }

  static normalize(v: IVector2): Vector2 {
    let scale = 1 / Vector2.length(v);
    return Vector2.scale(v, scale);
  }

  normalize(): Vector2 {
    return Vector2.normalize(this);
  }

  static scale(v: IVector2, scale: number): Vector2 {
    return new Vector2(
      v.x * scale,
      v.y * scale
    );
  }

  scale(scale: number): Vector2 {
    return Vector2.scale(this, scale);
  }

  static lerp(v1: IVector2, v2: IVector2, fraction: number): Vector2 {
    let d = Vector2.difference(v2, v1);
    return new Vector2(
      v1.x + (d.x * fraction),
      v1.y + (d.y * fraction)
    );
  }

  lerp(v: IVector2, fraction: number): Vector2 {
    return Vector2.lerp(this, v, fraction);
  }

  static rotateAboutOrigin(v: IVector2, theta: number): Vector2 {
    let { x, y } = v;
    let sinT = Math.sin(theta);
    let cosT = Math.cos(theta);
    
    return new Vector2(
      x * cosT - y * sinT,
      y * cosT + x * sinT
    );
  }

  rotateAboutOrigin(theta: number): Vector2 {
    return Vector2.rotateAboutOrigin(this, theta);
  }

  static ZERO: Vector2 = new Vector2(0, 0);
  static LEFT: Vector2 = new Vector2(-1, 0);
  static RIGHT: Vector2 = new Vector2(1, 0);
  static UP: Vector2 = new Vector2(0, -1);
  static DOWN: Vector2 = new Vector2(0, 1);
}

export default Vector2;
export { IVector2 }