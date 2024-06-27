import CoordinateConverter from './utils/CoordinateConverter';
import Scene from '../engine/Scene';
import { Background, Grid, Unit } from './entities';
import EventEmitter from '../lib/EventEmitter';
import Pointer from './entities/Pointer';

interface IGameSettings {
  tileSize: number;
}

class Game {
  chapter;
  opts;
  coords: CoordinateConverter;
  uiEvents: EventEmitter;
  canvas: HTMLCanvasElement;
  scene: Scene;

  constructor(chapter, opts: Partial<IGameSettings> = {}) {
    this.chapter = chapter;
    this.opts = {
      tileWidth: opts.tileSize ?? 64,
      tileHeight: opts.tileSize ?? 64,
      ...opts
    }
    this.coords = new CoordinateConverter(
      this.tileWidth,
      this.tileHeight,
      {
        width: this.chapter.terrain.width * this.tileWidth,
        height: this.chapter.terrain.height * this.tileHeight
      }
    );
    this.uiEvents = new EventEmitter();
  }

  get tileWidth() { return this.opts.tileWidth }
  get tileHeight() { return this.opts.tileHeight }

  setCanvas(canvas) {
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

    let bg = Background(width, height, null);
    bg.instantiate(scene);

    let grid = Grid(width, height, this.opts.tileWidth, this.opts.tileHeight);
    grid.instantiate(scene);

    let pointer = Pointer(this);
    pointer.instantiate(scene);

    this.chapter.units.forEach(unit => {
      let unitPrototype = Unit(unit, this.uiEvents, this.opts);
      let unitEntity = unitPrototype.instantiate(scene);
      
      // move to initial position
      let { x, y } = this.chapter.getUnitById(unit.id).getPosition();
      let pixelCoords = this.coords.toPixels(x, y);
      Object.assign(unitEntity.getComponent('position'), pixelCoords);
    })

    this.scene.draw();
  }
}

export default Game;