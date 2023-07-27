function withDraw(drawFn) {
  this.draw = drawFn;

  return this;
}

export default withDraw;