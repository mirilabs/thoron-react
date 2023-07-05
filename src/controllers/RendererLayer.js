class RendererLayer {
  constructor(renderer, id) {
    this.id = id;
    this.ctx = renderer.ctx;
    Object.assign(renderer.params, this);

    this.draw = this.draw.bind(this);
    this.remove = () => {
      renderer.removeLayer(id);
    }

    this._entities = {
      ids: [],
      byId: {}
    }
  }

  addEntity(id, entity) {
    this.entities.ids.push(id);
    this.entities.byId[id] = entity;
    entity.init().then(this.draw);
  }

  draw() {
    this._entities.ids.forEach(id => {
      entity = this.entities.byId[id];
      entity.draw(this.ctx);
    })
  }
}