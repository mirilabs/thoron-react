import CoordinateConverter from './utils/CoordinateConverter';
import Scene from '../engine/Scene';
import { Background, Grid } from './entities';
import UIEventEmitter from '../shared/UIEventEmitter';
import ControlSystem from './entities/ControlSystem';
import Chapter, { GameController } from 'thoron';
import MotionSystem from './entities/MotionSystem';
import UnitBody from './entities/UnitBody';

interface IGameConfig {
  tileWidth: number;
  tileHeight: number;
  moveColor: string;
  attackColor: string;
  healColor: string;
  interactColor: string;
  highlightAlpha: number;
}

const defaultConfig: IGameConfig = {
  tileWidth: 64,
  tileHeight: 64,
  moveColor: '#0000ff',     // blue
  attackColor: '#ff0000',   // red
  healColor: '#00ff00',     // green
  interactColor: 'ff00ff',  // magenta
  highlightAlpha: 0.2,
}

class Game {
  gameController: GameController;
  chapter: Chapter;
  config: IGameConfig;
  coords: CoordinateConverter;
  uiEvents: UIEventEmitter;
  canvas: HTMLCanvasElement;
  scene: Scene;
  unitBodies: Map<any, UnitBody> = new Map();

  constructor(gameController: GameController, cfg: Partial<IGameConfig> = {}) {
    this.gameController = gameController
    this.chapter = gameController.chapter;
    this.config = {
      ...defaultConfig,
      ...cfg
    }
    this.coords = new CoordinateConverter(
      this.chapter.terrain.width,
      this.chapter.terrain.height,
      this.config.tileWidth,
      this.config.tileHeight
    );

    this.uiEvents = new UIEventEmitter();
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new Scene(canvas);
    this.init();
  }

  unsetCanvas() {
    this.scene.unsetCanvas();
    delete this.scene;
    delete this.canvas;
  }

  init() {
    let scene = this.scene;
    let { width, height } = this.canvas;
    let rows = this.chapter.terrain.width;
    let columns = this.chapter.terrain.height;

    let bg = new Background(width, height, null);
    bg.addToScene(scene);

    let grid = new Grid(rows, columns, this.config);
    grid.addToScene(scene);

    let controlSystem = new ControlSystem(this);
    controlSystem.addToScene(scene);

    let motionSystem = new MotionSystem(this);
    motionSystem.addToScene(scene);

    let units = this.chapter.getUnits();
    for (let unit of units) {
      const unitBody = new UnitBody(unit, this);
      unitBody.addToScene(this.scene);
      unitBody.resetPosition(); // move to initial position
      this.unitBodies.set(unit.id, unitBody);
    }
    
    this.scene.draw();
  }

  getUnitBody(unitId: string | number) {
    return this.unitBodies.get(unitId);
  }

  removeUnit(unitId: string | number) {
    let body = this.unitBodies.get(unitId);
    body.destroy();
    this.unitBodies.delete(unitId);
  }
}

export default Game;
export {
  IGameConfig
}