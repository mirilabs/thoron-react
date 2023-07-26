class RendererLayer {
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

    return new Promise((resolve, reject) => {
      entity.init()
        .then(this.draw)
        .then(resolve(entity))
        .catch(e => reject(e));
    })
  }

  draw() {
    this.entities.forEach(entity => {
      entity.draw(this.ctx);
    })
  }
}

export default RendererLayer;