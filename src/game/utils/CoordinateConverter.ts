import { IVector2 } from "engine/utils/Vector2";

enum RectMode {
  TOPLEFT,
  CENTER
}

class CoordinateConverter {
  static RectMode = RectMode;
  
  mapWidth: number;
  mapHeight: number;
  tileWidth: number;
  tileHeight: number;

  constructor(
    mapWidth: number,
    mapHeight: number,
    tileWidth: number,
    tileHeight: number
  ) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  /**
   * Clamp tile coordinates to the dimensions of the map
   * @param x 
   * @param y 
   * @returns a tile coordinate pair
   */
  clampTileCoords(x: number, y: number) {
    x = Math.max(0, Math.min(x, this.mapWidth - 1));
    y = Math.max(0, Math.min(y, this.mapHeight - 1));
    return { x, y }
  }

  /**
   * Converts pixel coordinates to tile coordinates
   * @param {number} x 
   * @param {number} y 
   */
  toTiles(x: number, y: number): IVector2 {
    let { tileWidth, tileHeight } = this;
    x = Math.floor(x / tileWidth);
    y = Math.floor(y / tileHeight);
    return this.clampTileCoords(x, y);
  }

  /**
   * Converts tile coordinates to pixel coordinates
   * @param {number} x
   * @param {number} y
   * @param {string} mode One of `'topLeft'`, `'center'`
   */
  toPixels(
    x: number,
    y: number,
    mode: RectMode = RectMode.TOPLEFT
  ): IVector2 {
    let { tileWidth, tileHeight } = this;

    switch(mode) {
      case RectMode.TOPLEFT:
        x = x * tileWidth;
        y = y * tileHeight;
        break;
      case RectMode.CENTER:
        x = (x + 0.5) * tileWidth;
        y = (y + 0.5) * tileHeight;
        break;
      default:
        throw new Error('Invalid mode');
    }
    return { x, y }
  }
}

export default CoordinateConverter