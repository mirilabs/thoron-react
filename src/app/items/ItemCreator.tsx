import React from "react";
import { ItemRecord } from "thoron";
import { useState } from "react";
import { Button } from "@mui/material";
import ItemEditor from "./ItemEditor";

function ItemCreator({ onSave }: { onSave: (item: ItemRecord) => void }) {
  const [editing, setEditing] = useState(false);

  const handleSave = (item: ItemRecord) => {
    onSave(item);
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