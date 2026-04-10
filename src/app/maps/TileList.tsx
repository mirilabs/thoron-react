import React from "react";
import { ITileRecord } from "thoron";

function TileCard({ index, tile }: {
  index: number,
  tile: ITileRecord
}) {
  return (
    <div className={
      "flex flex-row gap-2 items-center " +
      "border border-[var(--text-color-2)]/20 rounded-lg p-2 " +
      "bg-[var(--bg-color-2)]"
    }>
      <p className={
        "text-lg text-[var(--text-color-2)] font-bold w-4 text-center "
      }>
        {index}
      </p>
      <p className="text-sm font-medium">{tile.name}</p>
    </div>
  )
}

function TileList({ tiles }: {
  tiles: ITileRecord[]
}) {
  return (
    <div className="flex flex-col gap-2">
      {tiles.map((tile, i) => (
        <TileCard key={i} index={i} tile={tile} />
      ))}
    </div>
  )
}

export default TileList;