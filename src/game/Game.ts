import CoordinateConverter from './utils/CoordinateConverter';
import Scene from '../engine/Scene';
import { Background, Grid } from './entities';
import UIEventEmitter from '../utils/UIEventEmitter';
import UnitController from './entities/UnitController';

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
  chapter;
  config: IGameConfig;
  coords: CoordinateConverter;
  uiEvents: UIEventEmitter;
  canvas: HTMLCanvasElement;
  scene: Scene;

  _selectedUnit: any;

  constructor(chapter, cfg: Partial<IGameConfig> = {}) {
    this.chapter = chapter;
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
    this.uiEvents.on('select_unit', (unit) => {
      this._selectedUnit = unit
    });
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

    let pointer = new UnitController(this);
    pointer.addToScene(scene);
    
    this.scene.draw();
  }
}

export default Game;
export {
  IGameConfig
}