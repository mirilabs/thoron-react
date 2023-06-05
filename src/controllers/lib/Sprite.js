import DrawnEntity from './DrawnEntity';

class Sprite extends DrawnEntity {
  constructor(src, x, y, w, h) {
    super(x, y, w, h);
    this.src = src;
    this.image = null;
  }

  async init() {
    this.image = await this._load();
  }

  _load() {
    return new Promise((resolve, reject) => {
      let img = new Image(this.width, this.height);

      if (!this.src) {
        resolve(img);
      }

      img.src = this.src;
      img.onload = () => {
        resolve(img);
      }
      img.onerror = err => {
        reject(err);
      }
    })
  }
  
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Sprite;