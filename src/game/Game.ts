import CoordinateConverter from './utils/CoordinateConverter';
import Scene from '../engine/Scene';
import { Background, Grid, Unit } from './entities';
import EventEmitter from '../lib/EventEmitter';
import Pointer from './entities/ui/Pointer';

interface IGameConfig {
  tileWidth: number;
  tileHeight: number;
  moveColor: string;
  attackColor: string;
  healColor: string;
  interactColor: string;
}

const defaultConfig: IGameConfig = {
  tileWidth: 64,
  tileHeight: 64,
  moveColor: '#0000ff',
  attackColor: '#ff0000',
  healColor: '#00ff00',
  interactColor: 'ff00ff'
}

class Game {
  chapter;
  config: IGameConfig;
  coords: CoordinateConverter;
  uiEvents: EventEmitter;
  canvas: HTMLCanvasElement;
  scene: Scene;

  constructor(chapter, cfg: Partial<IGameConfig> = {}) {
    this.chapter = chapter;
    this.config = {
      ...defaultConfig,
      ...cfg
    }
    this.coords = new CoordinateConverter(
      this.config.tileWidth,
      this.config.tileHeight,
      {
        width: this.chapter.terrain.width * this.config.tileWidth,
        height: this.chapter.terrain.height * this.config.tileHeight
      }
    );
    this.uiEvents = new EventEmitter();
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

    let bg = new Background(width, height, null);
    bg.addToScene(scene);

    let grid = new Grid(width, height, this.config);
    grid.addToScene(scene);

    let pointer = new Pointer(this);
    pointer.addToScene(scene);

    this.chapter.units.forEach(unit => {
      let unitPrototype = new Unit(unit, this.config);
      let unitEntity = unitPrototype.addToScene(scene);
      
      // move to initial position
      let { x, y } = this.chapter.getUnitById(unit.id).getPosition();
      let pixelCoords = this.coords.toPixels(x, y);
      Object.assign(unitEntity.getComponent('position'), pixelCoords);
    })

    this.scene.draw();
  }
}

export default Game;
export {
  IGameConfig
}