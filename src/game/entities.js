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

function Unit(unit, eventEmitter, {tileWidth, tileHeight}) {
  let spriteUrl = unit.record['sprite'];

  return new Entity({
    unit,
    isPointerTarget: true
  })
    .withPosition(0, 0)
    .withRect(tileWidth, tileHeight)
    .withSprite(spriteUrl)

    .withPointerEvents()
    .withBehavior({
      onMouseDown({ x, y, target }) {
        if (target === this)
          eventEmitter.emit('select_unit', this.unit);
      }
    })
}

export {
  Background,
  Grid,
  Unit
}