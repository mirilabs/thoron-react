class RendererLayer {
  constructor(renderer, id) {
    this.id = id;
    this.params = renderer.params;

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
    this._entities.ids.push(id);
    this._entities.byId[id] = entity;
    entity.init().then(this.draw);

    return new Promise((resolve, reject) => {
      entity.init()
        .then(this.draw)
        .then(resolve(entity))
        .catch(e => reject(e));
    })
  }

  draw() {
    this._entities.ids.forEach(id => {
      let entity = this._entities.byId[id];
      entity.draw(this.params.ctx);
    })
  }
}

export default RendererLayer;