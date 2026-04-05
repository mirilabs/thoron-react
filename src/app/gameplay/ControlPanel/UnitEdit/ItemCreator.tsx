import React from "react";
import { ItemRecord } from "thoron";
import { useState } from "react";
import { Button, FormLabel, TextField } from "@mui/material";
import { ItemsFormProps } from "./ItemsForm";
import ItemEditor from "./ItemEditor";

function ItemCreator({ data, setData }: ItemsFormProps) {
  const [editing, setEditing] = useState(false);

  const handleSave = (item: ItemRecord) => {
    setData({ ...data, items: [...data.items, item] });
    setEditing(false);
  }

  if (editing) return (
    <ItemEditor
      onSave={handleSave}
      onCancel={() => setEditing(false)}
    />
  );
  else return (
    <Button
      variant="outlined"
      onClick={() => setEditing(true)}
      startIcon={<i className="fas fa-plus" />}
    >
      Add Item
    </Button>
  );
}

export default ItemCreator;