import GameObject from '../../engine/GameObject';
import Rect from '../../engine/utils/Rect';
import CoordinateConverter from 'game/utils/CoordinateConverter';

class UnitPiece extends GameObject {
  rect: Rect;
  unit: any;
  coords: CoordinateConverter;

  constructor(unit, coords: CoordinateConverter) {
    super();
    this.components = {
      position: { x: 0, y: 0 },
      rectangle: {
        width: coords.tileWidth,
        height: coords.tileHeight
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
    this.coords = coords;
  }

  resetPosition() {
    let tileCoords = this.unit.getPosition();
    let pixelCoords = this.coords.toPixels(tileCoords.x, tileCoords.y);
    this.rect.moveTo(pixelCoords.x, pixelCoords.y);
  }
}

export default UnitPiece;