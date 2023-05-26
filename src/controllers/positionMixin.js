const positionMixin = {
  /**
   * Determine position of the cursor relative to the canvas origin
   * @param {Event} event any MouseEvent or Touch
   */
  getCursorPosition(event) {
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    return [x, y]
  },

  /**
   * Converts pixel coordinates to tile coordinates
   * @param {number} x 
   * @param {number} y 
   */
  getTileCoords(x, y) {
    if (x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height) {
      return null
    }

    let { tileWidth, tileHeight } = this;
    x = Math.floor(x / tileWidth);
    y = Math.floor(y / tileHeight);
    return [x, y]
  },

  /**
   * Converts tile coordinates to pixel coordinates
   * @param {number} x
   * @param {number} y
   * @param {string} mode One of `'topLeft'`, `'center'`
   */
  getTilePosition(x, y, mode = 'center') {
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
        throw new Error('Invalid mode provided');
    }
    return [x, y]
  }
}

export default positionMixin;