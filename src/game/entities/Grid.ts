import Prototype from "../../engine/Prototype";

function Grid(width, height, tileWidth, tileHeight) {
  return new Prototype({
    draw(ctx) {
      let x, y;
    
      ctx.beginPath();
      for (x = 0; x <= width; x += tileWidth) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (y = 0; y <= height; y += tileHeight) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }
  })
}

export default Grid;