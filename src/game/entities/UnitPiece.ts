import GameObject from '../../engine/GameObject';
import Rect from '../../engine/utils/Rect';
import CoordinateConverter from 'game/utils/CoordinateConverter';
import UnitRange from './ui/UnitMoveRange';
import Game from 'game/Game';

class UnitPiece extends GameObject {
  rect: Rect;
  unit: any;
  _game: WeakRef<Game>;

  moveRangeEnt: UnitRange;

  constructor(unit, game: Game) {
    super();
    this.components = {
      position: { x: 0, y: 0 },
      rectangle: {
        width: game.coords.tileWidth,
        height: game.coords.tileHeight
      },
      sprite: {
        url: unit.record['sprite']
      }
    }
    
    this._game = new WeakRef(game);
    this.unit = unit;
    this.rect = new Rect(
      this.components.position,
      this.components.rectangle
    );
  }

  get game(): Game {
    return this._game.deref();
  }

  get coords(): CoordinateConverter {
    return this.game.coords;
  }

  resetPosition() {
    let tileCoords = this.unit.getPosition();
    let pixelCoords = this.coords.toPixels(tileCoords.x, tileCoords.y);
    this.rect.moveTo(pixelCoords.x, pixelCoords.y);
  }

  showMoveRange() {
    if (this.moveRangeEnt !== undefined) return;
    
    this.moveRangeEnt = new UnitRange(this.game, this.unit);
    this.moveRangeEnt.addToScene(this.game.scene);
  }

  hideMoveRange() {
    if (this.moveRangeEnt === undefined) return;
    
    this.moveRangeEnt.destroy();
    delete this.moveRangeEnt;
  }
}

export default UnitPiece;