import GameObject from '../../engine/GameObject';
import { IGameConfig } from '../Game';

class Unit extends GameObject {
  constructor(
    unitRecord,
    cfg: IGameConfig
  ) {
    super();
    this.components = {
      position: { x: 0, y: 0 },
      rectangle: {
        width: cfg.tileWidth,
        height: cfg.tileHeight
      },
      sprite: {
        url: unitRecord.record['sprite']
      }
    }
  }
}

export default Unit;