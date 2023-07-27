function withPosition(x = 0, y = 0) {
  Object.assign(this, {
    x,
    y,

    moveTo(x, y) {
      this.x = x;
      this.y = y;
    }
  })

  return this;
}

export default withPosition;