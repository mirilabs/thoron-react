import SortedArray from "../lib/SortedArray";

class Renderer {
  drawQueue = new SortedArray((a, b) => a.z - b.z);

  constructor(scene) {
    this.scene = scene;
  }

  addDrawStep(zIndex, drawFn) {
    drawFn.z = zIndex;
    this.drawQueue.add(drawFn);

    return () => {
      this.removeDrawStep(drawFn);
    }
  }

  removeDrawStep(drawFn) {
    let index = this.drawQueue.indexOf(drawFn);
    if (index < 0) return;

    this.drawQueue.splice(drawFn, 1);
  }
  
  /**
   * Draw a new frame
   */
  draw() {
    this.drawQueue.forEach(drawFn => drawFn(this.scene.ctx));
  }
  
  /**
   * Clear canvas
   */
  clear() {
    let { ctx } = this.scene;
    let { width, height } = this.scene.canvas;

    if (ctx)
      ctx.clearRect(0, 0, width, height);
  }
}

export default Renderer;