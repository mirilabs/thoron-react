import React from "react";
import { ITileRecord } from "thoron";
import TileChip from "./TileChip";

function TileList({ tiles, selectedTileId, onTileSelect, onTileDelete }: {
  tiles: ITileRecord[],
  selectedTileId: number,
  onTileSelect: (tileId: number) => void,
  onTileDelete: (tileId: number) => void
}) {
  const handleTileDelete = (tileId: number) => {
    if (tiles.length > 1) {
      onTileDelete(tileId);
    }
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {tiles.map((tile, i) => (
        <TileChip
          key={i}
          index={i}
          tile={tile}
          showDetail={selectedTileId === i}
          onEdit={() => { }}
          onDelete={tiles.length > 1 ? handleTileDelete : undefined}
          onClick={() => onTileSelect(i)}
        />
      ))}
    </div>
  )
}

export default TileList;