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
    entity.destroy = () => { this.removeEntity(id) }

    entity.onInit();
    
    return this;
  }

  removeEntity(id) {
    this._entities.ids = this._entities.ids.splice(
      this._entities.ids.indexOf(id), 1
    )
    delete this._entities.byId[id];
  }

  draw() {
    this.entities.forEach(entity => {
      entity.draw(this.ctx);
    })
  }

  getPointerTarget(x, y) {
    let entity = this.entities.find(entity => (
      entity.isPointerTarget && entity.collidePoint(x, y)
    ));
    return entity ?? null;
  }
}

export default Layer;