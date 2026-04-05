import React from "react";
import { Character } from "@/data/db";
import { ItemRecord } from "thoron";
import ItemCreator from "./ItemCreator";
import ItemCard from "../Items/ItemCard";

interface ItemsFormProps {
  data: Character;
  setData: (data: Character) => void;
}

function ItemEntry({ item }: { item: ItemRecord }) {
  return (
    <ItemCard item={item} />
  )
}

function ItemsForm({ data, setData }: ItemsFormProps) {
  const itemEntries = data.items.map((item, i) => (
    <ItemEntry key={i} item={item} />
  ));

  return (
    <div>
      {
        data.items.length === 0 &&
        <p className="mb-4 text-[var(--text-color-2)]">No items</p>
      }
      {itemEntries}
      <ItemCreator data={data} setData={setData} />
    </div>
  )
}

export default ItemsForm;
export type { ItemsFormProps };