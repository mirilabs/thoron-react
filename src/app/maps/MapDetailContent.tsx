import React from "react";
import { IconButton } from "@mui/material";
import DeleteButton from "../core/DeleteButton";
import db, { Map } from "@/data/db";
import TileList from "./editor/TileList";

function MapDetailEmpty() {
  return (
    <div className={
      "flex flex-col items-center justify-center gap-4 h-full " +
      "min-h-[400px] " +
      "border border-[var(--text-color)] rounded-lg p-8 m-4 " +
      "bg-[var(--bg-color)] text-[var(--text-color-2)] shadow-inner"
    }>
      <i className="fas fa-map text-8xl opacity-10" />
      <p className="text-xl font-medium">Select a map to view details</p>
    </div>
  );
}

function MapDetailContent({
  map,
  onDelete,
  onEdit
}: {
  map: Map,
  onDelete: () => void,
  onEdit: () => void
}) {
  const width = map.map[0].length;
  const height = map.map.length;

  return (
    <>
      <div className={
        "flex flex-row items-center justify-between " +
        "border-b border-[var(--text-color)] pb-4"
      }>
        <div>
          <h1 className="text-3xl font-bold text-[var(--accent-color)]">
            {map.name}
          </h1>
        </div>
        <span className="flex flex-row gap-2">
          <IconButton onClick={onEdit}>
            <i className="fa fa-edit" />
          </IconButton>
          <DeleteButton onDelete={onDelete} />
        </span>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <i className="fas fa-expand text-[var(--accent-color)]" />
            Dimensions
          </h2>
          <div className="flex flex-row gap-2 pl-2 pr-2">
            <div className={
              "flex flex-row gap-2 " +
              "bg-[var(--bg-color-2)] p-4 rounded-lg flex justify-around " +
              "border border-[var(--text-color-2)]/20"
            }>
              <div className="text-center">
                <p className="text-xs text-[var(--text-color-2)]">
                  WIDTH
                </p>
                <p className="text-2xl font-bold text-[var(--accent-color)]">
                  {width}
                </p>
              </div>
              <div className="w-px bg-[var(--text-color-2)]/20" />
              <div className="text-center">
                <p className="text-xs text-[var(--text-color-2)]">
                  HEIGHT
                </p>
                <p className="text-2xl font-bold text-[var(--accent-color)]">
                  {height}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex-1 flex flex-col gap-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fas fa-image text-[var(--accent-color)]" />
          Background
        </h2>
        <div className={
          "rounded-xl flex flex-col items-center justify-center " +
          "bg-[var(--bg-color-2)] p-4 min-h-[300px] " +
          "border border-[var(--text-color-2)]/20 "
        }>
          <p className="text-sm text-[var(--text-color-2)]">
            No background image
          </p>
        </div>
      </div>
    </>
  )
}

export default MapDetailContent;
export { MapDetailEmpty };