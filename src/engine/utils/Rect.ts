import { Vector2, IRectangle } from "../components";

class Rect {
  pos: Vector2;
  rect: IRectangle;

  constructor(pos: Vector2, rect: IRectangle) {
    this.pos = pos;
    this.rect = rect;
  }

  left(): number {
    return this.pos.x;
  }

  top(): number {
    return this.pos.y;
  }

  right(): number {
    return this.pos.x + this.rect.width;
  }

  bottom(): number {
    return this.pos.y + this.rect.height;
  }

  move(x: number, y: number): void {
    this.pos.x += x;
    this.pos.y += y;
  }

  moveTo(x: number, y: number): void {
    this.pos.x = x;
    this.pos.y = y;
  }

  collidePoint(p: Vector2): boolean {
    let { x, y } = p;

    return x > this.left() &&
      x < this.right() &&
      y > this.top() &&
      y < this.bottom();
  }
}

export default Rect;