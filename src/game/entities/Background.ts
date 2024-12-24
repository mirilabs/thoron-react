import { Rectangle, Sprite, Position } from 'engine/components';
import GameObject from '../../engine/GameObject';

class Background extends GameObject {
  constructor(
    width: number,
    height: number,
    src: string = null
  ) {
    super();
    this.components = [
      new Position(0, 0),
      new Rectangle(width, height),
      new Sprite(src)
    ]
  }
}

export default Background;