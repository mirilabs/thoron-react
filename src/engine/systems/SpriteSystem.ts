import {
  ComponentId
} from "../components";
import DrawSystem from "./DrawSystem";

class SpriteSystem extends DrawSystem {
  signature: Set<ComponentId> = new Set([
    'position',
    'rectangle',
    'sprite',
  ]);

  draw() {
    this.componentGroups.forEach(({ position, rectangle, sprite }) => {
      this.ctx.save();

      if (sprite.preprocess) {
        sprite.preprocess(this.ctx);
      }

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
      
      this.ctx.restore();
    });
  }
}

export default SpriteSystem;