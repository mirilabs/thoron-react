import { IPosition, IRectangle } from "../components";

class Rect {
  pos: IPosition;
  rect: IRectangle;

  constructor(pos: IPosition, rect: IRectangle) {
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

  collidePoint(p: IPosition): boolean {
    let { x, y } = p;

    return x > this.left() &&
      x < this.right() &&
      y > this.top() &&
      y < this.bottom();
  }
}

export default Rect;