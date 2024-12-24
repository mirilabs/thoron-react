import Component from "./Component";
import { DrawFn } from "./DrawHandler";

interface ISprite {
  image?: HTMLImageElement;
  preprocess?: DrawFn;
}

class Sprite extends Component implements ISprite {
  image?: HTMLImageElement;
  preprocess?: DrawFn;

  constructor(url: string, preprocess?: DrawFn) {
    super();
    this.preprocess = preprocess;

    this.loadImage(url).then(img => {
      this.image = img;
    });
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
}

export default Sprite;