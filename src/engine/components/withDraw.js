function withDraw(drawFn) {
  this.draw = drawFn;

  return this.withBehavior({
    init() {
      this.draw(this.getLayer().ctx);
    }
  });
}

export default withDraw;