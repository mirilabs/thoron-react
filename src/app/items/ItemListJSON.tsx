import React from "react";
import { Item } from "@/data/db";
import { Button } from "@mui/material";

function ItemListJSON({ items }: { items: Item[] }) {
  const itemsJSON = items.map(item => {
    const { id, campaignId, ...rest } = item;
    return rest;
  });

  const jsonString = JSON.stringify(itemsJSON, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
  }

  const handleExport = () => {
    const blob = new Blob([
      jsonString
    ], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "items.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4">
        <Button variant="contained" onClick={handleCopy}
          startIcon={<i className="fas fa-copy" />}>
          Copy to Clipboard
        </Button>
        <Button variant="contained" onClick={handleExport}
          startIcon={<i className="fas fa-download" />}>
          Download
        </Button>
      </div>
      <pre className="text-xs overflow-scroll max-h-[50vh]">
        {jsonString}
      </pre>
    </div>
  );
}

export default ItemListJSON;