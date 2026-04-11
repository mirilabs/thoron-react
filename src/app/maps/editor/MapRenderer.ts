import { Map } from "@/data/db";

const TILE_SIZE = 64;

const TERRAIN_COLORS = [
  "#ffffff",
  "#00ff00",
  "#0000ff",
  "#ff0000",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ffaa00",
  "#aa00ff",
  "#00ffaa",
]

class MapRenderer {
  private ctx: CanvasRenderingContext2D;
  private map: Map;
  private options: {
    showGrid?: boolean,
    showTerrainLabels?: boolean,
    showTerrainTints?: boolean
  };

  constructor(ctx: CanvasRenderingContext2D, map: Map, options: {
    showGrid?: boolean,
    showTerrain?: boolean,
    showTerrainLabels?: boolean,
    showTerrainTints?: boolean
  } = {}) {
    this.ctx = ctx;
    this.map = map;
    this.options = {
      showGrid: true,
      showTerrainLabels: true,
      showTerrainTints: false,
      ...options
    };
  }

  get terrainMap(): number[][] {
    return this.map.map;
  }

  get width(): number {
    return this.map.map[0].length;
  }

  get height(): number {
    return this.map.map.length;
  }

  get widthPx(): number {
    return this.width * TILE_SIZE;
  }

  get heightPx(): number {
    return this.height * TILE_SIZE;
  }

  draw() {
    this.drawBackground();

    if (this.options.showTerrainTints) {
      this.drawTerrainTints();
    }

    if (this.options.showTerrainLabels) {
      this.drawTerrainLabels();
    }

    if (this.options.showGrid) {
      this.drawGrid();
    }
  }

  drawBackground() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.widthPx, this.heightPx);

    if (this.map.background) {
      const image = new Image();
      image.src = URL.createObjectURL(this.map.background);
      image.onload = () => {
        this.ctx.drawImage(image, 0, 0, this.widthPx, this.heightPx);
      };
    }
  }

  drawGrid() {
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.width; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * TILE_SIZE, 0);
      this.ctx.lineTo(x * TILE_SIZE, this.height * TILE_SIZE);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.height; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * TILE_SIZE);
      this.ctx.lineTo(this.width * TILE_SIZE, y * TILE_SIZE);
      this.ctx.stroke();
    }
  }

  drawTerrainLabels() {
    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;
    this.ctx.font = "16px monospace";
    this.ctx.textBaseline = "hanging";

    this.terrainMap.forEach((row, y) => {
      row.forEach((_, x) => {
        this._drawTerrainLabel(x, y);
      });
    });
    this.ctx.restore();
  }

  _drawTerrainLabel(x: number, y: number) {
    const tileId = this.terrainMap[y][x];
    const tile = this.map.tiles[tileId];
    const pixelX = x * TILE_SIZE;
    const pixelY = y * TILE_SIZE;

    // label
    const text = tile?.name || "?";
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
    this.ctx.clip();
    this.ctx.fillText(text, pixelX + 4, pixelY + 4);
    this.ctx.strokeText(text, pixelX + 4, pixelY + 4);
    this.ctx.restore();
  }

  drawTerrainTints() {
    this.ctx.save();
    this.terrainMap.forEach((row, y) => {
      row.forEach((_, x) => {
        this._drawTerrainTint(x, y);
      });
    });
    this.ctx.restore();
  }

  _drawTerrainTint(x: number, y: number) {
    const tileIndex = this.terrainMap[y][x];
    const pixelX = x * TILE_SIZE;
    const pixelY = y * TILE_SIZE;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
    this.ctx.clip();
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillStyle = TERRAIN_COLORS[tileIndex % TERRAIN_COLORS.length];
    this.ctx.fillRect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
    this.ctx.restore();
  }

  showGrid() {
    this.options.showGrid = true;
    this.draw();
  }

  hideGrid() {
    this.options.showGrid = false;
    this.draw();
  }

  showTerrainLabels() {
    this.options.showTerrainLabels = true;
    this.draw();
  }

  hideTerrainLabels() {
    this.options.showTerrainLabels = false;
    this.draw();
  }

  showTerrainTints() {
    this.options.showTerrainTints = true;
    this.draw();
  }

  hideTerrainTints() {
    this.options.showTerrainTints = false;
    this.draw();
  }
}

export default MapRenderer;