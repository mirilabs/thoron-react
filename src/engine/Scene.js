import PointerEventHandler from './PointerEvents.js';
import Renderer from './Renderer.js';

class Scene {
  /**
   * Creates a scene that can draw entities to a canvas
   * @param {HTMLCanvasElement} canvas The target <canvas> element
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.entities = [];
    this.renderer = new Renderer(this);
    this.pointerEventHandler = new PointerEventHandler(this);
  }

  draw() {
    this.renderer.draw();
  }
  
  /**
   * Add an Entity to the Scene
   * @param {Entity} entity 
   */
  addEntity(entity) {
    this.entities.push(entity);
    entity.handleEvent('onInit', this);
  }

  removeEntity(entity) {
    let index = this.entities.indexOf(entity);
    if (index < 0) return;

    this.entities.splice(index, 1);
    entity.handleEvent('onDestroy');
  }
}

export default Scene;