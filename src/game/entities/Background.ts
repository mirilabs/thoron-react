import GameObject from '../../engine/GameObject';

class Background extends GameObject {
  constructor(
    width: number,
    height: number,
    src: string = null
  ) {
    super();
    this.components = {
      position: { x: 0, y: 0 },
      rectangle: { width, height },
      sprite: {
        url: src
      }
    }
  }
}

export default Background;