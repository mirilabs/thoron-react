function withDraw(drawFn) {
  this.draw = drawFn;

  return this.withEventHandlers({
    onInit() {
      this.draw(this.getLayer().ctx);
    }
  });
}

export default withDraw;