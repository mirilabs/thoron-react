import DrawComponent from "./DrawComponent";
import Rectangle from "./Rectangle";

class Sprite extends DrawComponent {
  constructor(ent, zIndex, spriteUrl) {
    super(zIndex, null);
    this.zIndex = zIndex;
    this.url = spriteUrl;

    this.rect = ent.getComponent(Rectangle);
  }

  static load(url) {
    return new Promise((resolve, reject) => {
      let img = new Image(this.width, this.height);
  
      if (!url) {
        resolve(img)
      }
  
      img.src = url;
      img.onload = () => { resolve(img) }
      img.onerror = err => { reject(err) }
    })
  }

  draw(ctx) {
    let { x, y, width, height } = this.rect;
    ctx.drawImage(this.image, x, y, width, height);
  }

  onInit(scene) {
    Sprite.load(this.url)
      .then(image => {
        this.image = image;
        this._unbindDrawFn = scene.renderer.addDrawStep(this.zIndex, this.draw);
      })
  }

  onDestroy() {
    if (this._unbindDrawFn)
      this._unbindDrawFn();
  }
}

export default Sprite;