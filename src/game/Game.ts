import CoordinateConverter from './utils/CoordinateConverter';
import Scene from '../engine/Scene';
import { Background, Grid } from './entities';
import UIEventEmitter from '../shared/UIEventEmitter';
import ControlSystem from './entities/ControlSystem';
import Chapter, { GameController } from 'thoron';
import MotionSystem from './entities/MotionSystem';
import UnitBody from './entities/UnitBody';
import { Map as MapRecord } from '@/data/db';
import GameObject from '../engine/GameObject';


interface IGameConfig {
  tileWidth: number;
  tileHeight: number;
  highlightColors: {
    move: string;
    attack: string;
    staff: string;
    interact: string;
  }
  highlightAlpha: number;
}

const defaultConfig: IGameConfig = {
  tileWidth: 64,
  tileHeight: 64,
  highlightColors: {
    move: '#0000ff',    // blue
    attack: '#ff0000',  // red
    staff: '#00ff00',   // green
    interact: '#ff00ff',// magenta
  },
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
  systems: GameObject[] = [];


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
    if (this.scene) {
      this.scene.unsetCanvas();
      delete this.scene;
    }
    delete this.canvas;
  }

  destroy() {
    for (let body of this.unitBodies.values()) {
      body.destroy();
    }
    this.unitBodies.clear();

    for (let system of this.systems) {
      system.destroy();
    }
    this.systems = [];

    this.unsetCanvas();
  }


  init() {
    let scene = this.scene;
    let { terrain } = this.chapter;
    let rows = terrain.width;
    let columns = terrain.height;
    let width = rows * this.config.tileWidth;
    let height = columns * this.config.tileHeight;

    const background = (terrain.record as MapRecord).background;
    const backgroundUrl = URL.createObjectURL(background);
    let bg = new Background(width, height, backgroundUrl);
    bg.addToScene(scene);

    this.systems.push(bg);

    let grid = new Grid(rows, columns, this.config);
    grid.addToScene(scene);
    this.systems.push(grid);

    let controlSystem = new ControlSystem(this);
    controlSystem.addToScene(scene);
    this.systems.push(controlSystem);

    let motionSystem = new MotionSystem(this);
    motionSystem.addToScene(scene);
    this.systems.push(motionSystem);


    let units = this.chapter.getUnits();
    for (let unit of units) {
      const unitBody = new UnitBody(unit, this);
      unitBody.addToScene(this.scene);
      unitBody.resetPosition(); // move to initial position
      this.unitBodies.set(unit.id, unitBody);
    }

    // center camera on center of map
    this.scene.camera.translate = {
      x: this.canvas.width / 2 - width / 2,
      y: this.canvas.height / 2 - height / 2
    }

    this.scene.draw();
  }

  getUnitBody(unitId: string | number) {
    return this.unitBodies.get(unitId);
  }

  addUnitBody(unitId: string | number) {
    const unit = this.chapter.getUnitById(unitId);
    if (!unit) {
      throw new Error(`Unit ${unitId} not found`);
    }
    const unitBody = new UnitBody(unit, this);
    unitBody.addToScene(this.scene);
    this.unitBodies.set(unitId, unitBody);
  }

  removeUnitBody(unitId: string | number) {
    let body = this.unitBodies.get(unitId);
    body.destroy();
    this.unitBodies.delete(unitId);
  }
}

export default Game;
export {
  IGameConfig
}