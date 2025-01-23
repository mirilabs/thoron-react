import { IVector2 } from "engine/utils/Vector2";
import Component from "./Component";

type IPosition = IVector2;

class Position extends Component implements IVector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  move({ x, y }: IVector2): void {
    this.x += x;
    this.y += y;
  }

  moveTo({ x, y }: IVector2): void {
    this.x = x;
    this.y = y;
  }
}

export default Position;
export {
  IPosition
}