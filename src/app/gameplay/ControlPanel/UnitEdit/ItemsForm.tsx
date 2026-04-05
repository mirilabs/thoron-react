import React, { useState } from "react";
import db, { Character } from "@/data/db";
import { ItemRecord } from "thoron";
import ItemCreator from "./ItemCreator";
import ItemCard from "../Items/ItemCard";
import { Button, IconButton } from "@mui/material";
import ItemEditor from "./ItemEditor";

interface ItemsFormProps {
  data: Character;
  setData: (data: Character) => void;
}

function ItemEntry({
  item,
  onUpdate,
  onDelete
}: {
  item: ItemRecord;
  onUpdate: (item: ItemRecord) => void;
  onDelete: (item: ItemRecord) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) return (
    <div className="flex flex-row gap-2">
      <ItemCard item={item} />
      <div className="flex flex-row gap-2 items-start ml-auto">
        <IconButton
          size="small"
          onClick={() => setEditing(true)}
        >
          <i className="fas fa-edit" />
        </IconButton>
        <DeleteButton onDelete={() => onDelete(item)} />
      </div>
    </div>
  )
  else return (
    <ItemEditor
      item={item}
      onSave={(newItem) => { onUpdate(newItem); setEditing(false); }}
      onCancel={() => setEditing(false)}
    />
  )
}

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    onDelete();
    setConfirming(false);
  }

  if (confirming) return (
    <div className="flex flex-row items-center">
      <p className="text-[var(--text-color-2)]">Delete?</p>
      <IconButton
        size="small"
        onClick={handleConfirm}
      >
        <i className="fas fa-check" />
      </IconButton>
    </div>
  )
  else return (
    <IconButton
      size="small"
      onClick={() => setConfirming(true)}
    >
      <i className="fas fa-trash" />
    </IconButton>
  )
}

function ItemsForm({ data, setData }: ItemsFormProps) {
  const save = async (items: ItemRecord[]) => {
    await db.characters.update(data.id, { items });
    setData({ ...data, items });
  }

  const handleItemCreate = async (newItem: ItemRecord) => {
    const items = [...data.items, newItem];
    await save(items);
  }

  const handleItemUpdate = async (index: number, newItem: ItemRecord) => {
    const items = data.items.map((item, i) => i === index ? newItem : item);
    await save(items);
  }

  const handleItemDelete = async (item: ItemRecord) => {
    const items = data.items.filter((i) => i !== item);
    await save(items);
  }

  const itemEntries = data.items.map((item, i) => (
    <ItemEntry
      key={i}
      item={item}
      onUpdate={(item) => handleItemUpdate(i, item)}
      onDelete={() => handleItemDelete(item)}
    />
  ));

  return (
    <div>
      {
        data.items.length === 0 &&
        <p className="mb-4 text-[var(--text-color-2)]">No items</p>
      }
      <div className="flex flex-col gap-2 mb-4">
        {itemEntries}
      </div>
      <ItemCreator onSave={handleItemCreate} />
    </div>
  )
}

export default ItemsForm;
export {
  ItemEntry
}
export type { ItemsFormProps };