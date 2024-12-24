import Vector2, { IVector2 } from "./utils/Vector2";

class Camera {
  translate: IVector2 = { x: 0, y: 0 }
  rotateDeg: number = 0;
  scale: number = 1;

  get rotateRad() {
    return this.rotateDeg * Math.PI/180;
  }
  
  pan(offset: IVector2) {
    this.translate = Vector2.sum(this.translate, offset);
  }

  rotate(angle: number) {
    this.rotateDeg += angle;
  }

  zoom(increment: number) {
    this.scale += increment;
  }

  /**
   * Applies the current camera transformation to a rendering context. Objects
   * drawn afterwards will have the transform applied to them. Undo this using
   * ctx.resetTransform()
   * @param ctx 
   */
  transformContext(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.translate.x, this.translate.y);
    ctx.rotate(this.rotateRad);
    ctx.scale(this.scale, this.scale);
  }

  /**
   * Applies the current camera transformation to a vector
   * @param vector 
   * @returns A vector with the transformation applied
   */
  transformVector(vector: IVector2) {
    let v = Vector2.sum(vector, this.translate); // translate
    v = Vector2.rotateAboutOrigin(v, this.rotateRad); // rotate
    v = Vector2.scale(v, this.scale); // scale
    return v;
  }

  /**
   * Applies the inverse of the current camera transformation to a vector
   * @param vector 
   * @returns A vector with the transformation applied
   */
  reverseTransformVector(vector: IVector2) {
    let v = Vector2.scale(vector, this.scale);  // scale
    v = Vector2.rotateAboutOrigin(v, -this.rotateRad);  // rotate
    v = Vector2.difference(v, this.translate);  // translate
    return v;
  }
  
}

export default Camera;