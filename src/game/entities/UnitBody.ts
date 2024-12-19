import GameObject from '../../engine/GameObject';
import Rect from '../../engine/utils/Rect';
import CoordinateConverter from 'game/utils/CoordinateConverter';
import Game from 'game/Game';
import UnitRange from './ui/UnitMoveRange';
import TargetIndicator from './ui/TargetIndicator';
import UnitPath from './ui/UnitPath';
import { Vector2 } from 'engine/components';
import controllerStore from 'shared/store';
import { DeployedUnit } from 'thoron';

class UnitBody extends GameObject {
  rect: Rect;
  unit: DeployedUnit;
  _game: WeakRef<Game>;
  
  moveRangeEnt: UnitRange;
  pathEnt: UnitPath;
  targetIndicatorEnt: TargetIndicator;

  grayscale: boolean = false;

  constructor(unit, game: Game) {
    super();
    this.components = {
      position: { x: 0, y: 0 },
      rectangle: {
        width: game.coords.tileWidth,
        height: game.coords.tileHeight
      },
      sprite: {
        url: unit.record['sprite'],
        preprocess: (ctx) => {
          if (this.grayscale) {
            ctx.filter = "grayscale(1)";
          }
        }
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

  showMovePath() {
    if (this.pathEnt !== undefined) return;
    this.pathEnt = new UnitPath(this.game, this.unit);
    this.pathEnt.addToScene(this.game.scene);

    let initialDest = controllerStore.getState().pendingMove.destination;
    if (initialDest) {
      this.pathEnt.updateTargetPos(initialDest);
    }
  }

  hideMovePath() {
    if (this.pathEnt === undefined) return;
    this.pathEnt.destroy();
    delete this.pathEnt;
  }

  getDestination() {
    return this.pathEnt.getLastNode();
  }

  setDestination(dest: Vector2) {
    this.pathEnt.updateTargetPos(dest);
  }

  showTargetIndicator() {
    if (this.targetIndicatorEnt !== undefined) return;
    this.targetIndicatorEnt = new TargetIndicator(this);
    this.targetIndicatorEnt.addToScene(this.game.scene);
  }

  hideTargetIndicator() {
    if (this.targetIndicatorEnt === undefined) return;
    this.targetIndicatorEnt.destroy();
    delete this.targetIndicatorEnt;
  }
}

export default UnitBody;