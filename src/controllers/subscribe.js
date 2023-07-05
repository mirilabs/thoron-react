import CoordinateConverter from "./lib/CoordinateConverter";
import Background from './draw/Background';
import Grid from './draw/Grid';
import Sprite from './draw/Sprite';

class Subscriber {
  constructor(chapter, renderer) {
    this.chapter = chapter;
    this.renderer = renderer;

    let { canvas, tileWidth, tileHeight } = this.renderer;
    this.coords = new CoordinateConverter(canvas, tileWidth, tileHeight);

    this._initializeState()
  }

  _initializeState() {
    let { chapter, renderer } = this;

    renderer.addLayer('background', 0);
    renderer.addLayer('grid', 1);
    renderer.addLayer('units', 2);

    let bg = new Background(null, renderer.width, renderer.height);
    renderer.layer('background').addEntity('BACKGROUND', bg);

    let grid = new Grid(
      renderer.width, renderer.height,
      renderer.tileWidth, renderer.tileHeight
    );
    renderer.layer('grid').addEntity('GRID', grid);

    chapter.units.forEach(unit => {
      // Get pixel coordinates
      let [x, y] = chapter.getPosition(unit.id);
      [x, y] = this.coords.toPixels(x, y, 'topLeft');

      // Create sprite
      let src = unit.record['sprite'];
      let sprite = new Sprite(src, x, y, tileWidth, tileHeight);
      renderer.layer('units').addEntity(unit.id, sprite);
    })
  }
}

function subscribe(chapter, renderer) {
  const sub = new Subscriber(chapter, renderer);
  const subscription = (event, params) => sub[event](params);

  // chapter.events.all(subscription)
  // return () => { chapter.events.off(subscription) }
}

export default subscribe;