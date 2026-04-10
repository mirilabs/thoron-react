import { Map } from "@/data/db";

const TILE_SIZE = 64;

class MapRenderer {
  private ctx: CanvasRenderingContext2D;
  private map: Map;
  private options: {
    showGrid?: boolean
  };

  constructor(ctx: CanvasRenderingContext2D, map: Map, options: {
    showGrid?: boolean
  } = {}) {
    this.ctx = ctx;
    this.map = map;
    this.options = {
      showGrid: true,
      ...options
    };
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
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.widthPx, this.heightPx);

    if (this.options.showGrid) {
      this.drawGrid();
    }
  }

  drawBackground() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.widthPx, this.heightPx);

    if (this.map.background) {
      const image = new Image();
      image.src = this.map.background;
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

  showGrid() {
    this.options.showGrid = true;
    this.draw();
  }

  hideGrid() {
    this.options.showGrid = false;
    this.draw();
  }
}

export default MapRenderer;