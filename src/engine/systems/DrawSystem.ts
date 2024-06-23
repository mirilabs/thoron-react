import Scene from "../Scene";
import System from "./System";
import { IPosition, IRectangle } from "../components";

class DrawSystem extends System {
    ctx: CanvasRenderingContext2D;

    constructor(scene: Scene) {
        super(scene);
        this.ctx = scene.canvas.getContext('2d');
    }

    static loadSprite(
        url: string,
        width: number,
        height: number
    ): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
          const image = new Image(width, height);
    
          if (url === null) resolve(image);
    
          image.src = url;
          image.onload = () => { resolve(image) }
          image.onerror = (err) => { reject(err) }
        })
    }

    clearCanvas() {
        let { width, height } = this.scene.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }

    draw() {
        this.clearCanvas();

        // draw 'draw function' components
        let drawFns = this.componentMap.components['draw'];
        drawFns.forEach((drawFn, entityId) => {
            drawFn(this.ctx, this.scene.getEntity(entityId));
        })

        // draw sprite components
        let sprites = this.componentMap.components['sprite'];
        
        sprites.forEach((sprite, entityId) => {
            let entity = this.scene.getEntity(entityId);
            let pos = entity.getComponent<IPosition>('position');
            let rect = entity.getComponent<IRectangle>('rectangle');

            if (sprite.image) {
                this.ctx.drawImage(
                    sprite.image,
                    pos.x, pos.y,
                    rect.width, rect.height
                );
            }
            else {
                // draw placeholder
                this.ctx.fillText("?", pos.x, pos.y, rect.width);

                DrawSystem.loadSprite(
                    sprite.url, rect.width, rect.height
                )
                    .then((image) => {
                        sprite.image = image;
                    })
                    .then(() => {
                        console.log("Loaded image: " + sprite.url);

                        // redraw scene with newly loaded image
                        this.draw();
                    })
                    .catch((e) => {
                        throw e;
                    })
            }
        });
    }
}

export default DrawSystem;