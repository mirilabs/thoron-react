import {
    IRectangle,
    ISprite,
    ComponentId,
    Component
} from "../components";
import Entity from "../Entity";
import DrawSystem from "./DrawSystem";

class SpriteSystem extends DrawSystem {
    signature: Set<ComponentId> = new Set([
        'position',
        'rectangle',
        'sprite',
    ]);

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
    
    onComponentAdded(
        entity: Entity,
        componentId: ComponentId,
        component: Component
    ): void {
        super.onComponentAdded(entity, componentId, component);

        if (componentId === 'sprite') {
            // load sprite
            let sprite: ISprite = component as ISprite;
            let rect: IRectangle = entity.getComponent('rectangle');

            SpriteSystem.loadSprite(
                sprite.url, rect.width, rect.height
            )
                .then((image) => { sprite.image = image; })
                .then(() => {
                    console.log("Loaded image: " + sprite.url);

                    // redraw scene with newly loaded image
                    this.scene.draw();
                })
                .catch((e) => { throw e; })
        }
    }

    draw() {
        this.components.forEach(({ position, rectangle, sprite }) => {
            if (sprite.image) {
                this.ctx.drawImage(
                    sprite.image,
                    position.x, position.y,
                    rectangle.width, rectangle.height
                );
            }
            else {
                // draw placeholder
                this.ctx.fillText("?", position.x, position.y, rectangle.width);
            }
        });
    }
}

export default SpriteSystem;