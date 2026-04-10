import React from "react";
import { Map } from "@/data/db";
import { Button } from "@mui/material";
import TileList from "../TileList";

function MapEditor({
  map,
  onSave,
  onCancel
}: {
  map: Map,
  onSave: () => void,
  onCancel: () => void
}) {
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
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fa-regular fa-square text-[var(--accent-color)]" />
          Tiles
        </h2>
        <TileList tiles={map.tiles || []} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fa-regular fa-map text-[var(--accent-color)]" />
          Map
        </h2>
        <canvas
          className="border border-[var(--text-color)] rounded-lg"
          width={map.map[0].length * 32}
          height={map.map.length * 32}
        />
      </div>
    </div>
  )
}

export default MapEditor;