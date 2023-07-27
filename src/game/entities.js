import Entity from '../engine/Entity';

function Background(width, height, src = null) {
  return new Entity()
    .withPosition(0, 0)
    .withRect(width, height)
    .withSprite(src);
}

function Grid(width, height, tileWidth, tileHeight) {
  return new Entity()
    .withDraw(ctx => {
      let x, y;
    
      ctx.beginPath();
      for (x = 0; x <= width; x += tileWidth) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (y = 0; y <= height; y += tileHeight) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    })
}

function Unit(width, height, src) {
  return new Entity()
    .withPosition(0, 0)
    .withRect(width, height)
    .withSprite(src);
}

export {
  Background,
  Grid,
  Unit
}