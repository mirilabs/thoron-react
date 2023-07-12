import DrawnEntity from './DrawnEntity';

class Grid extends DrawnEntity {
  constructor(width, height, tileWidth, tileHeight) {
    super(0, 0, width, height);
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  draw(ctx) {
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

export default Grid;