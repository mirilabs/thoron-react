import Entity from "@/engine/Entity";
import Component from "./Component";
import Position, { IPosition } from "./Position";

interface IRect {
  width: number;
  height: number;
}

class Rectangle extends Component implements IRect {
  pos: Position;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  onInit(entity: Entity): void {
    this.pos = entity.getComponent("position");
  }

  left(): number {
    return this.pos.x;
  }

  top(): number {
    return this.pos.y;
  }

  right(): number {
    return this.pos.x + this.width;
  }

  bottom(): number {
    return this.pos.y + this.height;
  }

  collidePoint(p: IPosition): boolean {
    let { x, y } = p;

    return x > this.left() &&
      x < this.right() &&
      y > this.top() &&
      y < this.bottom();
  }
}

export default Rectangle;