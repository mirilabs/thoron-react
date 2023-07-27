function withRect(width = 0, height = 0) {
  Object.assign(this, {
    width,
    height,

    collidePoint(x, y) {
      return x >= this.left && x <= this.right &&
        y >= this.top && y <= this.bottom;
    }
  })

  Object.defineProperties(this, {
    left: {
      get() { return this.x }
    },
    right: {
      get() { return this.x + this.w }
    },
    top: {
      get() { return this.y }
    },
    bottom: {
      get() { return this.y + this.h }
    }
  })

  return this;
}

export default withRect;