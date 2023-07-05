import Sprite from './Sprite';

class Background extends Sprite {
  constructor(src, width, height, tileWidth, tileHeight) {
    super(src, 0, 0, width, height);

    this.src = src;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.z = -1
  }

  draw(ctx) {
    if (this.image != null) {
      ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }

    this._drawGrid(ctx);
  }

  _drawGrid(ctx) {
    let x, y;
    
    ctx.beginPath();
    for (x = 0; x <= this.width; x += this.tileWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }
    for (y = 0; y <= this.height; y += this.tileHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.stroke();
  }
}

export default Background;