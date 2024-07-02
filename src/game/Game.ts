import CoordinateConverter from './utils/CoordinateConverter';
import Scene from '../engine/Scene';
import { Background, Grid, Unit } from './entities';
import Pointer from './entities/ui/Pointer';
import UnitRange from './entities/ui/UnitRange';
import Entity from '../engine/Entity';
import UIEventEmitter from './entities/ui/UIEventEmitter';

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
  moveColor: '#0000ff',
  attackColor: '#ff0000',
  healColor: '#00ff00',
  interactColor: 'ff00ff',
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
  unitEntities: Map<any, Entity> = new Map();

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

    let bg = new Background(width, height, null);
    bg.addToScene(scene);

    let grid = new Grid(width, height, this.config);
    grid.addToScene(scene);

    let pointer = new Pointer(this);
    pointer.addToScene(scene);

    this.chapter.units.forEach(this.addUnit.bind(this));

    let unitRange = new UnitRange(this);
    unitRange.addToScene(scene);

    this.scene.draw();
  }

  addUnit(unit) {
    let unitPrototype = new Unit(this, unit);
    let unitEntity = unitPrototype.addToScene(this.scene);

    // move to initial position
    let { x, y } = this.chapter.getUnitById(unit.id).getPosition();
    let pixelCoords = this.coords.toPixels(x, y);
    Object.assign(unitEntity.getComponent('position'), pixelCoords);

    // add to entity lookup
    this.unitEntities.set(unit, unitEntity);
  }

  getSelectedUnit() {
    return this._selectedUnit;
  }

  getUnitEntity(unit) {
    return this.unitEntities.get(unit);
  }
}

export default Game;
export {
  IGameConfig
}