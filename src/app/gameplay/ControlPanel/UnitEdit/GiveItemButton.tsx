import React from "react";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import db, { Item } from "@/data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router";
import ItemCard from "../Items/ItemCard";

function ItemSelector({ onSelect, onCancel }: {
  onSelect: (item: Item) => void,
  onCancel: () => void
}) {
  const { campaignId } = useParams();

  const [filter, setFilter] = useState("");

  const items = useLiveQuery(
    () => db.items.where({ campaignId: Number(campaignId) }).toArray(),
    [campaignId]
  );

  if (!items) return null;

  let filteredItems = items;
  if (filter !== "") {
    filteredItems = items.filter(item => (
      item.name.toLowerCase().includes(filter.toLowerCase())
    ));
  }

  const itemEntries = filteredItems.map(item => (
    <ItemCard
      key={item.id}
      item={item}
      onClick={() => onSelect(item)}
    />
  ));

  return (
    <div className={
      "p-4 rounded-lg " +
      "border border-[var(--border-color)] " +
      "flex flex-col gap-2 "
    }>
      <div className="flex flex-row items-start">
        <TextField
          label="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <IconButton
          size="medium"
          onClick={onCancel}
        >
          <i className="fas fa-times" />
        </IconButton>
      </div>
      <Grid
        className="overflow-y-scroll max-h-[200px]"
        container
        spacing={2}
      >
        {itemEntries}
      </Grid>
    </div>
  );
}

function GiveItemButton({ onGiveItem }: {
  onGiveItem: (item: Item) => void
}) {
  const [editing, setEditing] = useState(false);

  const handleItemSelect = (item: Item) => {
    onGiveItem(item);
    setEditing(false);
  }

  if (editing) return (
    <ItemSelector
      onSelect={handleItemSelect}
      onCancel={() => setEditing(false)}
    />
  )
  return (
    <Button
      variant="outlined"
      startIcon={<i className="fas fa-plus" />}
      onClick={() => setEditing(true)}
    >
      Give Item
    </Button>
  );
}

export default GiveItemButton;