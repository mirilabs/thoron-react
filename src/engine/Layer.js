class Layer {
  constructor(scene, id) {
    this.id = id;
    this.ctx = scene.ctx;

    this.draw = this.draw.bind(this);
    this.getScene = () => { return scene }
    this.remove = () => { scene.removeLayer(this.id) }

    this._entities = {
      ids: [],
      byId: {}
    }
  }

  get entities() {
    return this._entities.ids.map(id => this._entities.byId[id]);
  }

  addEntity(id, entity) {
    this._entities.ids.push(id);
    this._entities.byId[id] = entity;
    
    entity.getLayer = () => { return this }
    entity.getScene = this.getScene;
    entity.init();
    
    return this;
  }

  draw() {
    this.entities.forEach(entity => {
      entity.draw(this.ctx);
    })
  }
}

export default Layer;