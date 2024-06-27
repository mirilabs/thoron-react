import Prototype from "../../engine/Prototype";
import Game from "../Game";

function Pointer(game: Game) {
  let {
    chapter,
    coords,
    uiEvents
  } = game;

  let lastX: number;
  let lastY: number;

  return new Prototype({
    position: { x: 0, y: 0 },
    cursorEvents: {
      onMouseDown({ x, y }) {
        let tileCoords = coords.toTiles(x, y);
        if (tileCoords.x === lastX && tileCoords.y === lastY) return;
        
        // set selected tile in ui
        let tile = chapter.terrain.getTile(tileCoords.x, tileCoords.y);
        uiEvents.emit('select_tile', tile);
        
        // set selected unit in ui
        let unit = chapter.getUnitAt(tileCoords);
        if (unit)
          uiEvents.emit('select_unit', unit);

        lastX = tileCoords.x;
        lastY = tileCoords.y;
      }
    }
  });
}

export default Pointer;