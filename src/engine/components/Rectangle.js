import Position from "./Position";

class Rectangle {
  constructor(ent, width, height) {
    this.position = ent.getComponent(Position);
    this.width = width;
    this.height = height;
  }

  get x() { return this.position.x }
  get y() { return this.position.y }

  get left() { return this.x }
  get right() { return this.x + this.width }
  get top() { return this.y }
  get bottom() { return this.y + this.height }

  collidePoint(x, y) {
    return x >= this.left && x <= this.right &&
      y >= this.top && y <= this.bottom;
  }
}

export default Rectangle;