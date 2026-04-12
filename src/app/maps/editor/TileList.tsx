import React from "react";
import { ITileRecord } from "thoron";
import TileChip from "./TileChip";
import { IconButton } from "@mui/material";
import TileEdit from "./TileEdit";
import useHorizontalScroll from "./useHorizontalScroll";

function TileList({
  tiles,
  selectedTileId,
  onTileSelect,
  onTileCreate,
  onTileUpdate,
  onTileDelete
}: {
  tiles: ITileRecord[],
  selectedTileId: number,
  onTileSelect: (tileId: number) => void,
  onTileCreate: (tile: ITileRecord) => void,
  onTileUpdate: (tileId: number, tile: ITileRecord) => void,
  onTileDelete: (tileId: number) => void
}) {
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  const handleTileDelete = (tileId: number) => {
    if (tiles.length > 1) {
      onTileDelete(tileId);
    }
  }

  const tileElems = tiles.map((tile, i) => (
    <TileChip
      key={i}
      index={i}
      tile={tile}
      showDetail={selectedTileId === i}
      onSelect={() => onTileSelect(i)}
      onEdit={(tile) => onTileUpdate(i, tile)}
      onDelete={tiles.length > 1 ? handleTileDelete : undefined}
    />
  ));

  const scrollRef = useHorizontalScroll();

  return (
    <div
      ref={scrollRef}
      className="flex flex-row gap-2 overflow-x-scroll"
    >
      {tileElems}
      <IconButton
        className="w-[40px] h-[40px]"
        onClick={() => setCreateDialogOpen(true)}
      >
        <i className="fa-solid fa-plus" />
      </IconButton>
      {createDialogOpen && (
        <TileEdit
          onSave={(tile) => {
            onTileCreate(tile);
            setCreateDialogOpen(false);
          }}
          onCancel={() => setCreateDialogOpen(false)}
        />
      )}
    </div>
  )
}

export default TileList;