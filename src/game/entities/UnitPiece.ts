import GameObject from '../../engine/GameObject';
import Rect from '../../engine/utils/Rect';
import { IGameConfig } from '../Game';

class UnitPiece extends GameObject {
  rect: Rect;
  unit: any;

  constructor(unit, config: IGameConfig) {
    super();
    this.components = {
      position: { x: 0, y: 0 },
      rectangle: {
        width: config.tileWidth,
        height: config.tileHeight
      },
      sprite: {
        url: unit.record['sprite']
      }
    }
    
    this.unit = unit;
    this.rect = new Rect(
      this.components.position,
      this.components.rectangle
    );
  }
}

export default UnitPiece;