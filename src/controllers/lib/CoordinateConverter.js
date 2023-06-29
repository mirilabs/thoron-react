class CoordinateConverter {
  constructor({ width, height }, tileWidth, tileHeight) {
    this.maxWidth = width;
    this.maxHeight = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  /**
   * Converts pixel coordinates to tile coordinates
   * @param {number} x 
   * @param {number} y 
   */
  toTiles(x, y) {
    if (x < 0 || x > this.maxWidth || y < 0 || y > this.maxHeight) {
      return null
    }

    let { tileWidth, tileHeight } = this;
    x = Math.floor(x / tileWidth);
    y = Math.floor(y / tileHeight);
    return [x, y]
  }

  /**
   * Converts tile coordinates to pixel coordinates
   * @param {number} x
   * @param {number} y
   * @param {string} mode One of `'topLeft'`, `'center'`
   */
  toPixels(x, y, mode = 'center') {
    let { tileWidth, tileHeight } = this;

    switch(mode) {
      case 'topLeft':
        x = x * tileWidth;
        y = y * tileHeight;
        break;
      case 'center':
        x = (x + 0.5) * tileWidth;
        y = (y + 0.5) * tileHeight;
        break;
      default:
        throw new Error('Invalid mode');
    }
    return [x, y]
  }
}

export default CoordinateConverter