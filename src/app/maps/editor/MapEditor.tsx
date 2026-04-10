import React from "react";
import { Map } from "@/data/db";
import { Button } from "@mui/material";
import MapTools from "./MapTools";
import MapRenderer from "./MapRenderer";

const TILE_SIZE = 64;

function MapEditor({
  map,
  onSave,
  onCancel
}: {
  map: Map,
  onSave: () => void,
  onCancel: () => void
}) {
  const [name, setName] = React.useState(map.name);

  const handleNameChange = (value: string) => {
    setName(value);
  }

  const tileMap = map.map;
  const [width, setWidth] = React.useState(map.map[0].length);
  const [height, setHeight] = React.useState(map.map.length);

  const handleWidthChange = (value: number) => {
    if (value === width + 1) {
      tileMap.forEach((row: number[]) => {
        row.push(0);
      });
    }
    else if (value === width - 1) {
      tileMap.forEach((row: number[]) => {
        row.pop();
      });
    }
    else return;
    setWidth(value);
  }

  const handleHeightChange = (value: number) => {
    if (value === height + 1) {
      tileMap.push(Array(width).fill(0));
    }
    else if (value === height - 1) {
      tileMap.pop();
    }
    else return;
    setHeight(value);
  }

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rendererRef = React.useRef<MapRenderer | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderer = new MapRenderer(ctx, map, { showGrid: true });
    rendererRef.current = renderer;
    renderer.draw();
  }, [tileMap, width, height]);

  const [showGrid, setShowGrid] = React.useState(true);
  const handleSetShowGrid = (show: boolean) => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    if (show) {
      renderer.showGrid();
    } else {
      renderer.hideGrid();
    }
    setShowGrid(show);
  }

  const [showTerrain, setShowTerrain] = React.useState(true);
  const handleSetShowTerrain = (show: boolean) => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    if (show) {
      renderer.showTerrain();
    } else {
      renderer.hideTerrain();
    }
    setShowTerrain(show);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={
        "flex flex-row items-center justify-between " +
        "border-b border-[var(--text-color)] pb-4"
      }>
        <h1 className="text-3xl font-bold text-[var(--accent-color)]">
          Editing {map.name}
        </h1>
        <span className="flex flex-row gap-2 ml-8">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </span>
      </div>
      <MapTools
        map={map}
        name={name}
        width={width}
        height={height}
        onNameChange={handleNameChange}
        onWidthChange={handleWidthChange}
        onHeightChange={handleHeightChange}
        showGrid={showGrid}
        onShowGridChange={handleSetShowGrid}
        showTerrain={showTerrain}
        onShowTerrainChange={handleSetShowTerrain}
      />
      <div className="border border-[var(--text-color)] rounded-lg">
        <canvas
          width={width * TILE_SIZE}
          height={height * TILE_SIZE}
          ref={canvasRef}
        />
      </div>
    </div>
  )
}

export default MapEditor;