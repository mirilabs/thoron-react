import GameObject from '../../engine/GameObject';
import CoordinateConverter from 'game/utils/CoordinateConverter';
import Game from 'game/Game';
import UnitRange from './ui/UnitMoveRange';
import TargetIndicator from './ui/TargetIndicator';
import UnitPath from './ui/UnitPath';
import { Position, Rectangle, Sprite } from 'engine/components';
import controllerStore from 'shared/store';
import { DeployedUnit } from 'thoron';
import { IVector2 } from 'engine/utils/Vector2';

class UnitBody extends GameObject {
  unit: DeployedUnit;
  _game: WeakRef<Game>;
  
  moveRangeEnt: UnitRange;
  pathEnt: UnitPath;
  targetIndicatorEnt: TargetIndicator;

  grayscale: boolean = false;

  constructor(unit: DeployedUnit, game: Game) {
    super();
    this.components = [
      new Position(0, 0),
      new Rectangle(game.coords.tileWidth, game.coords.tileHeight),
      new Sprite(unit.record['sprite'], 40, (ctx) => {
        if (this.grayscale) {
          ctx.filter = "grayscale(1)";
        }
      })
    ]
    
    this._game = new WeakRef(game);
    this.unit = unit;
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
    this.entity.getComponent("position").moveTo(pixelCoords);
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

  setDestination(dest: IVector2) {
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