import Entity from '../engine/Entity';

function createBackground(width, height, src = null) {
  return new Entity()
    .withPosition(0, 0)
    .withRect(width, height)
    .withSprite(src);
}

function createGrid(width, height, tileWidth, tileHeight) {
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

function createUnit(unit, eventEmitter, {tileWidth, tileHeight}) {
  let spriteUrl = unit.record['sprite'];

  return new Entity({
    unit
  })
    .withPosition(0, 0)
    .withRect(tileWidth, tileHeight)
    .withSprite(spriteUrl)

    .withPointerEvents()
    // .withEventHandlers({
    //   onMouseDown({ x, y, target }) {
    //     if (target === this)
    //       eventEmitter.emit('select_unit', this.unit);
    //   }
    // })
}

export {
  createBackground,
  createGrid,
  createUnit
}