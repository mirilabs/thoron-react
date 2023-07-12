import Sprite from './Sprite';

class Background extends Sprite {
  constructor(src, width, height) {
    super(src, 0, 0, width, height);

    this.src = src;
  }

  draw(ctx) {
    if (this.image != null) {
      ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }
  }
}

export default Background;