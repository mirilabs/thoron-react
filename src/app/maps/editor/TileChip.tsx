import DeleteButton from "@/app/core/DeleteButton";
import icons from "@/icons/movetypes";
import { IconButton } from "@mui/material";
import React from "react";
import { ITileRecord } from "thoron";
import TileEdit from "./TileEdit";

function TileChip({
  index,
  tile,
  showDetail,
  onEdit,
  onDelete,
  onClick
}: {
  index: number,
  tile: ITileRecord,
  showDetail: boolean,
  onEdit?: () => void,
  onDelete?: (tileId: number) => void,
  onClick: () => void
}) {
  return (
    <div className={
      "flex flex-col gap-2 " +
      "border border-[var(--text-color-2)]/20 rounded-lg p-2 " +
      "bg-[var(--bg-color)] hover:bg-[var(--bg-color-2)] cursor-pointer " +
      "transition-colors duration-200 " +
      (showDetail ? "bg-[var(--bg-color-2)]" : "")
    } onClick={onClick}>
      <div className={
        "flex flex-row items-center gap-4 " +
        (showDetail ? "border-b border-[var(--accent-color)]" : "")
      }>
        <p className={
          "text-lg text-[var(--text-color-2)] font-bold w-4 text-center"
        }>
          {index}
        </p>
        <p className="text-sm font-medium">{tile.name}</p>
      </div>
      {showDetail &&
        <TileDetail
          tile={tile}
          onEdit={onEdit}
          onDelete={onDelete ? () => onDelete(index) : undefined}
        />
      }
    </div>
  )
}

function TileDetail({
  tile,
  onEdit,
  onDelete
}: {
  tile: ITileRecord,
  onEdit?: () => void,
  onDelete?: () => void
}) {
  let infCost: number, cavCost: number, armCost: number, flyCost: number;

  if (typeof tile.cost === "number") {
    infCost = cavCost = armCost = flyCost = tile.cost;
  } else {
    infCost = tile.cost.infantry ?? 1;
    cavCost = tile.cost.cavalry ?? 1;
    armCost = tile.cost.armor ?? 1;
    flyCost = tile.cost.flying ?? 1;
  }

  const [editing, setEditing] = React.useState(false);
  const handleTileSave = (tile: ITileRecord) => {
    console.log(tile);
    setEditing(false);
  }

  return (
    <div>
      <div className={
        "grid grid-cols-2 gap-2 pt-2 pb-2 "
      }>
        <MoveCostIndicator type="infantry" cost={infCost} />
        <MoveCostIndicator type="cavalry" cost={cavCost} />
        <MoveCostIndicator type="armor" cost={armCost} />
        <MoveCostIndicator type="flying" cost={flyCost} />
      </div>
      <div className="flex flex-row items-center gap-2">
        {tile.stats && (
          <span className="flex flex-row items-center gap-2">
            <i className="fas fa-shield-alt" />
            <p className="text-sm font-medium">{tile.stats.avd}</p>
          </span>
        )}
        {tile.heal && (
          <span className="flex flex-row items-center gap-2">
            <i className="fas fa-heart" />
            <p className="text-sm font-medium">{tile.heal}</p>
          </span>
        )}
      </div>
      <div className={
        "flex flex-row items-center gap-2 " +
        ((onEdit || onDelete) ? "border-t border-[var(--accent-color)]" : "")
      }>
        {onEdit && (
          <IconButton onClick={() => setEditing(true)}>
            <i className="fas fa-edit" />
          </IconButton>
        )}
        {editing && (
          <TileEdit
            tile={tile}
            onSave={handleTileSave}
            onCancel={() => setEditing(false)}
          />
        )}
        {onDelete && (
          <DeleteButton onDelete={onDelete} />
        )}
      </div>
    </div>
  )
}

function MoveCostIndicator({
  type,
  cost
}: {
  type: keyof typeof icons,
  cost: number
}) {
  return (
    <span className="flex flex-row items-center gap-2">
      <img className="item-icon" src={icons[type]} alt={type} />
      <p className="text-sm font-medium">{cost.toString()}</p>
    </span>
  )
}

export default TileChip;