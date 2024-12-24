import Entity from "engine/Entity";
import Component from "./Component";
import { DrawFn, IDrawHandler } from "./DrawHandler";
import Position from "./Position";
import Rectangle from "./Rectangle";

interface ISprite {
  image?: HTMLImageElement;
  preprocess?: DrawFn;
}

class Sprite extends Component implements ISprite, IDrawHandler {
  image?: HTMLImageElement;
  preprocess?: DrawFn;
  zIndex?: number;

  pos: Position;
  rect: Rectangle;

  constructor(url: string, zIndex: number = 0, preprocess?: DrawFn) {
    super();
    this.zIndex = zIndex;
    this.preprocess = preprocess;

    this.loadImage(url).then(img => {
      this.image = img;
    });
  }

  onInit(entity: Entity): void {
    this.pos = entity.getComponent("position");
    this.rect = entity.getComponent("rectangle");
  }

  loadImage(
    url: string,
    width?: number,
    height?: number
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image(width, height);
  
      if (url === null) resolve(image);
  
      image.src = url;
      image.onload = () => { resolve(image) }
      image.onerror = (err) => { reject(err) }
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    if (this.preprocess) {
      this.preprocess(ctx);
    }

    if (this.image) {
      ctx.drawImage(
        this.image,
        this.pos.x, this.pos.y,
        this.rect.width, this.rect.height
      );
    }
    else {
      // draw placeholder
      ctx.fillText("?", this.pos.x, this.pos.y, this.rect.width);
    }
    
    ctx.restore();
  }
}

export default Sprite;