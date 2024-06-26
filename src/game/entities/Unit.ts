import Prototype from '../../engine/Prototype';

function Unit(unitRecord, eventEmitter, { tileWidth, tileHeight }) {
  return new Prototype({
    position: {
      x: 0,
      y: 0
    },
    rectangle: {
      width: tileWidth,
      height: tileHeight
    },
    sprite: {
      url: unitRecord.record['sprite']
    },
    cursorEvents: {
      onMouseDown({ isTarget }) {
        if (isTarget) {
          console.log('u clicked me!!')
        }
      }
    }
  })
}

/*
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
      onMouseDown({ target }) {
        if (target === this) {
          eventEmitter.emit('select_unit', this.unit);
          this.moveRange = UnitRange(unit, { tileWidth, tileHeight });
        }
        else if (this.moveRange) {
          this.moveRange.destroy();
          delete this.moveRange;
        }
      }
    })
}
*/

export default Unit;