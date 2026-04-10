import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import db from "@/data/db";
import { ITerrainRecord } from "thoron";

const defaultMap: ITerrainRecord = {
  tiles: [{ name: "Plains", cost: 1 }],
  map: Array(6).fill(null).map(() => Array(8).fill(0))
}

function MapCreate({ campaignId }: { campaignId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSave = async () => {
    if (!name) return;
    await db.maps.add({
      campaignId: campaignId,
      name: name,
      ...defaultMap
    });
    setName("");
    setIsOpen(false);
  }

  if (!isOpen) return (
    <Button variant="contained" onClick={() => setIsOpen(true)}
      startIcon={<i className="fas fa-plus" />}>
      New Map
    </Button>
  )

  return (
    <div className={
      "flex flex-col gap-4 p-4 " +
      "border border-[var(--accent-color)] rounded-lg " +
      "bg-[var(--bg-color)] shadow-lg"
    }>
      <h2 className="text-lg font-bold text-[var(--accent-color)]">New Map</h2>
      <TextField
        label="Map Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        size="small"
      />
      <div className="flex flex-row gap-2 justify-end">
        <Button onClick={() => setIsOpen(false)}
          sx={{ color: 'var(--text-color)' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default MapCreate;
