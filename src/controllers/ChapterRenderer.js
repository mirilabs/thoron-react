import Renderer from './Renderer';
import Background from './draw/Background';
import Grid from './draw/Grid';
import Sprite from './draw/Sprite';

class ChapterRenderer {
  constructor(canvas, coordinateConverter) {
    this.renderer = new Renderer(canvas);
    this.coords = coordinateConverter;

    this.handleChapterEvent = this.handleChapterEvent.bind(this);
  }

  handleChapterEvent(eventName, ...params) {
    this[eventName](...params);
  }

  subscribe(chapter) {
    this._initialize(chapter);
    // chapter.events.all(this.handleChapterEvent);
  }

  unsubscribe() {
    this.renderer.removeAllLayers();
    // this.chapter.events.off()
    delete this.chapter;
  }

  _initialize(chapter) {
    this.chapter = chapter;
    let renderer = this.renderer;
    let { width, height } = renderer;
    let { tileWidth, tileHeight } = this.coords;

    renderer.addLayer('background', 0);
    renderer.addLayer('grid', 1);
    renderer.addLayer('units', 2);

    let bg = new Background(null, renderer.width, renderer.height);
    renderer.layer('background').addEntity('BACKGROUND', bg);

    let grid = new Grid(width, height, tileWidth, tileHeight);
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

export default ChapterRenderer;