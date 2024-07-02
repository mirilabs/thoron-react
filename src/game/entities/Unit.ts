import GameObject from '../../engine/GameObject';
import Game from '../Game';

class Unit extends GameObject {
  constructor(
    game: Game,
    unit
  ) {
    super();
    this.components = {
      position: { x: 0, y: 0 },
      rectangle: {
        width: game.config.tileWidth,
        height: game.config.tileHeight
      },
      sprite: {
        url: unit.record['sprite']
      }
    }
  }
}

export default Unit;