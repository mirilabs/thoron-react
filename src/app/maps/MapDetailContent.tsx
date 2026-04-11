import React from "react";
import { IconButton } from "@mui/material";
import DeleteButton from "../core/DeleteButton";
import { Map } from "@/data/db";

const TILE_SIZE = 64;

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
  const background = React.useMemo(() => {
    if (!map.background) {
      return null;
    }
    const image = new Image();
    image.src = URL.createObjectURL(map.background);
    return image;
  }, [map.background]);

  const width = map.map[0].length * TILE_SIZE;
  const height = map.map.length * TILE_SIZE;

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
      <div className={
        "rounded-xl flex flex-col items-center justify-center " +
        "bg-[var(--bg-color-2)] min-h-[300px] " +
        "border border-[var(--text-color-2)]/20 "
      }>
        {background && (
          <img
            src={background.src}
            alt="background"
            width={width}
            height={height}
          />
        )}
      </div>
    </>
  )
}

export default MapDetailContent;
export { MapDetailEmpty };