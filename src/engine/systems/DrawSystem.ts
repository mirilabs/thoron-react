import ComponentMap from "../ComponentMap";
import Scene from "../Scene";
import { IPosition, IRectangle } from "../components";

class System {
    scene: Scene;
    
    constructor(scene: Scene) {
        this.scene = scene;
    }

    get componentMap(): ComponentMap {
        return this.scene.componentMap;
    }
}

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

    draw() {
        // draw 'draw function' components
        let drawFns = this.componentMap.components['draw'];
        drawFns.forEach((drawFn, entityId) => {
            drawFn(this.ctx, this.scene.getEntity(entityId));
        })

        // draw sprite components
        let sprites = this.componentMap.components['sprite'];
        
        sprites.forEach((sprite, entityId) => {
            let entity = this.scene.getEntity(entityId);
            let rect = entity.getComponent<IRectangle>('rectangle');

            if (sprite.image) {
                let pos = entity.getComponent<IPosition>('position');
                this.ctx.drawImage(
                    sprite.image,
                    pos.x, pos.y,
                    rect.width, rect.height
                );
            }
            else {
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