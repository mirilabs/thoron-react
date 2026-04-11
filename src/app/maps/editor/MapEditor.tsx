import React from "react";
import { Map } from "@/data/db";
import { Button } from "@mui/material";
import MapTools from "./MapTools";
import MapRenderer from "./MapRenderer";
import { ITileRecord } from "thoron";
import { useImmer } from "use-immer";

const TILE_SIZE = 64;

function MapEditor({
  record,
  onSave,
  onCancel
}: {
  record: Map,
  onSave: () => void,
  onCancel: () => void
}) {
  const [map, setMap] = useImmer(record);

  const handleNameChange = (value: string) => {
    setMap(prev => {
      prev.name = value;
    });
  }

  const width = map.map[0].length;
  const height = map.map.length;

  const handleWidthChange = (value: number) => {
    setMap(prev => {
      if (value === width + 1) {
        prev.map.forEach((row: number[]) => {
          row.push(0);
        });
      }
      else if (value === width - 1) {
        prev.map.forEach((row: number[]) => {
          row.pop();
        });
      }
    });
  }

  const handleHeightChange = (value: number) => {
    setMap(prev => {
      if (value === height + 1) {
        prev.map.push(Array(width).fill(0));
      }
      else if (value === height - 1) {
        prev.map.pop();
      }
    });
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
  }, [map]);

  const draw = () => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    renderer.draw();
  }

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

  const [selectedTileId, setSelectedTileId] =
    React.useState<number | null>(null);

  const handleSetSelectedTileId = (tileId: number) => {
    setSelectedTileId(tileId);
  }

  const handleTileCreate = (tile: ITileRecord) => {
    setMap(prev => {
      prev.tiles.push(tile);
    });
    setSelectedTileId(map.tiles.length);
  }

  const handleTileUpdate = (tileId: number, tile: ITileRecord) => {
    setMap(prev => {
      prev.tiles[tileId] = tile;
    });
    draw();
  }

  const handleTileDelete = (tileId: number) => {
    if (map.tiles.length > 1) {
      setMap(prev => {
        prev.tiles.splice(tileId, 1);

        // update tile ids
        prev.map.forEach((row) => {
          row.forEach((tileId, x) => {
            if (tileId > tileId) {
              row[x] = tileId - 1;
            }
          });
        });
      });
      setSelectedTileId(null);
    }
    draw();
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
        onMapChange={setMap}
        onNameChange={handleNameChange}
        onWidthChange={handleWidthChange}
        onHeightChange={handleHeightChange}
        showGrid={showGrid}
        onShowGridChange={handleSetShowGrid}
        showTerrain={showTerrain}
        onShowTerrainChange={handleSetShowTerrain}
        selectedTileId={selectedTileId}
        onTileSelect={handleSetSelectedTileId}
        onTileCreate={handleTileCreate}
        onTileUpdate={handleTileUpdate}
        onTileDelete={handleTileDelete}
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