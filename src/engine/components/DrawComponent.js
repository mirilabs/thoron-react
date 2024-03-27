import Node from "../Node";

class DrawComponent extends Node {
  constructor(zIndex, drawFn) {
    super();
    this.zIndex = zIndex;
    this.drawFn = drawFn;
  }

  draw(ctx) {
    this.drawFn(ctx);
  }

  onInit(scene) {
    this._unbindDrawFn = scene.renderer.addDrawStep(this.zIndex, this.draw);
  }

  onDestroy() {
    if (this._unbindDrawFn)
      this._unbindDrawFn();
  }
}

export default DrawComponent;