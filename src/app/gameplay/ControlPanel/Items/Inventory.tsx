import React from "react";
import ItemCard from "./ItemCard";
import { type ItemRecord } from "thoron";

function InventoryView({ items }: {
  items: ItemRecord[]
}) {
  const rows = items.map((item, i) => (
    <ItemCard key={i} item={item} index={i} />
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-sm text-[var(--text-color-2)] ml-4">
        Items
      </p>
      {rows}
    </div>
  )
}

export default InventoryView;