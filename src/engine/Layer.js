class Layer {
  constructor(renderer, id) {
    this.id = id;
    this.ctx = renderer.ctx;

    this.draw = this.draw.bind(this);
    this.remove = () => {
      renderer.removeLayer(id);
    }

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
    entity.init().then(this.draw);

    return this;
  }

  draw() {
    this.entities.forEach(entity => {
      entity.draw(this.ctx);
    })
  }
}

export default Layer;