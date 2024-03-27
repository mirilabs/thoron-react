const sprite = {
  _load() {
    return new Promise((resolve, reject) => {
      let img = new Image(this.width, this.height);

      if (this.spriteUrl == null) {
        resolve(img)
      }

      img.src = this.spriteUrl;
      img.onload = () => { resolve(img) }
      img.onerror = err => { reject(err) }
    })
  },

  async loadSprite() {
    this.image = await this._load();
    this.draw(this.getLayer().ctx);
  },
  
  draw(ctx) {
    if (this.image == null) return;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function withSprite(url) {
  Object.assign(this, {
    spriteUrl: url,
    ...sprite
  })
  this.withEventHandlers({ onInit: this.loadSprite.bind(this) });

  return this;
}

export default withSprite;