import CoordinateConverter from '../lib/CoordinateConverter';
import Scene from '../engine/Scene';
import { Background, Grid, Unit } from './entities';

class Game {
  constructor(chapter, opts = {}) {
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
    )
  }

  get tileWidth() { return this.opts.tileWidth }
  get tileHeight() { return this.opts.tileHeight }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.scene = new Scene(canvas);
    this.init();
  }

  unsetCanvas() {
    delete this.canvas;
    delete this.scene;
  }

  init() {
    let scene = this.scene;
    let { width, height } = this.canvas;

    let bg = Background(width, height, null)
    scene.addLayer(0, 'background') 
      .addEntity('BACKGROUND', bg)

    let grid = Grid(width, height, this.opts.tileWidth, this.opts.tileHeight)
    scene.addLayer(1, 'grid')
      .addEntity('GRID', grid)

    scene.addLayer(2, 'units');
    this.chapter.units.forEach(unit => {
      // Create entity
      let ent = Unit(unit, this.tileWidth, this.tileHeight);
      scene.layer('units').addEntity(unit.id, ent);
      
      // Move to initial position
      let [x, y] = this.chapter.getPosition(unit.id);
      [x, y] = this.coords.toPixels(x, y, 'topLeft');
      ent.moveTo(x, y);
    })
  }
}

export default Game;