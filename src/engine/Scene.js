import SortedArray from '../lib/SortedArray.js';
import RendererLayer from './Layer.js';

class Scene {
  /**
   * Creates a scene that can draw entities to a canvas
   * @param {HTMLCanvasElement} canvas The target <canvas> element
   */
  constructor(canvas) {
    this.setCanvas(canvas);

    this._layerIds = new SortedArray();
    this._layers = {}
    this._layerAliases = {}
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  get width() { return this.canvas.width }
  get height() { return this.canvas.height }
  
  // Array of Layers from bottom to top
  get layers() {
    return this._layerIds.map(id => this._layers[id]);
  }
  
  /**
   * Draws a new frame
   */
  draw() {
    this.clear();
    this.layers.forEach(layer => layer.draw());
  }
  
  /**
   * Clears canvas
   */
  clear() {
    console.log('clearing')
    let { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * Gets a layer
   * @param {string|number} id Layer's name or id
   * @returns The layer (one will be created if it doesn't exist).
   */
  layer(id) {
    return this._layers[id] ??
      this._layers[this._layerAliases[id]] ??
      this.addLayer(id)
  }

  /**
   * Creates a new layer
   * @param {number} id Layers with lower id values are drawn first.
   * @param {string} alias The layer will be accessible by this name.
   */
  addLayer(id, alias) {
    let layer = new RendererLayer(this, id);
    this._layerIds.add(id);
    this._layers[id] = layer;

    if (alias != undefined) {
      this._layerAliases[alias] = id;
    }
    return layer;
  }

  removeLayer(idOrAlias) {
    let id = this._layers[idOrAlias] ? id : this._layerAliases[idOrAlias];

    this._layerIds.splice(this._layerIds.indexOf(id), 1);
    delete this._layers[id];
    Object.keys(this._layerAliases)
      .filter(alias => this._layerAliases[alias] === id)
      .forEach(alias => delete this._layerAliases[alias]);
  }

  removeAllLayers() {
    this._layerIds.forEach(id => this.removeLayer(id));
  }

  addEntity(entity, layerId) {
    this.layer(layerId).addEntity(entity);
  }

  listEntities() {
    return this.layers.reduce((list, currentLayer) => {
      return list.concat(currentLayer.entities);
    }, [])
  }

  /**
   * Get the entity that a pointer event should target
   * @param {*} x 
   * @param {*} y 
   */
  getPointerTarget(x, y) {
    for (let layer of this.layers) {
      let targetEntity = layer.getPointerTarget(x, y);
      if (targetEntity != null) return targetEntity;
    }
    return null;
  }

  /**
   * Determine position of the cursor relative to the canvas origin
   * @param {Event} event any MouseEvent or Touch
   */
  _getCursorPosition(event) {
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    return [x, y]
  }

  onMouseDown(event) {
    let [x, y] = this._getCursorPosition(event);
    console.log(this.getPointerTarget(x, y));
  }

  onMouseMove(event) {
    
  }

  onMouseUp(event) {

  }
}

export default Scene;