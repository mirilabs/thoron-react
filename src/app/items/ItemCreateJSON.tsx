import React from "react";
import { Item } from "@/data/db";
import { Button, Dialog, TextField } from "@mui/material";

function ImportForm({ onSave }: {
  onSave: (items: Item[]) => void
}) {
  const [itemsJSON, setItemsJSON] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsJSON(e.target.value);
    setError(null);
  }

  const handleSave = () => {
    try {
      const items = JSON.parse(itemsJSON);

      if (!Array.isArray(items)) {
        setError("JSON must be an array");
        return;
      }

      const validItems = items.filter(item => {
        return Boolean(item.name);
      });

      validItems.forEach(item => {
        if (item.id) delete item.id;
        if (item.campaignId) delete item.campaignId;
      });

      onSave(validItems);
    }
    catch (e) {
      if (e instanceof SyntaxError) {
        setError("Invalid JSON");
      }
      else {
        throw e;
      }
    }
  }

  return (
    <div className={
      "flex flex-col gap-4 p-4 " +
      "bg-[var(--bg-color)] rounded-lg "
    }>
      <TextField
        label="Items JSON"
        value={itemsJSON}
        onChange={handleChange}
        multiline
        rows={10}
        error={error !== null} helperText={error}
      />
      <Button variant="outlined" onClick={handleSave}>Save</Button>
    </div>
  );
}

function ItemCreateJSON({ onSave }: {
  onSave: (items: Item[]) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSave = (items: Item[]) => {
    onSave(items);
    setIsOpen(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Import JSON
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <ImportForm onSave={handleSave} />
      </Dialog>
    </>
  )
}

export default ItemCreateJSON;