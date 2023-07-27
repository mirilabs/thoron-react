function withDraw(drawFn) {
  this.draw = drawFn;

  return this.withBehavior({
    onInit() {
      this.draw(this.getLayer().ctx);
    }
  });
}

export default withDraw;