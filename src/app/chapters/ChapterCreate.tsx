import React, { useState, useEffect, useCallback } from "react";
import db, { Map } from "@/data/db";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router";
import MapSelect from "./MapSelect";

type MapMetadata = {
  id: number;
  name: string;
};

function ChapterCreate({ campaignId }: { campaignId: number }) {
  const [maps, setMaps] = useState<MapMetadata[] | null>(null);
  const [mapIndex, setMapIndex] = useState<number>(0);

  useEffect(() => {
    db.maps.where({ campaignId }).toArray().then((maps) => {
      setMaps(maps.map(m => ({ id: m.id, name: m.name })));
    });
  }, [campaignId]);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }

    const mapId = maps?.[mapIndex].id;
    if (!mapId) {
      setError("Map is required");
      return;
    }

    const map = await db.maps.get(mapId);
    if (!map) {
      setError("Map not found");
      return;
    }

    const save = {
      units: [],
      map: map,
      turn: 0,
      phase: 0,
    }

    const chapterId = await db.chapters.add({
      campaignId,
      name,
      save
    });
    setName("");
    setOpen(false);
    navigate(`/campaigns/${campaignId}/chapters/${chapterId}`);
  }, [name, mapIndex, campaignId, navigate]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setMapIndex(0);
    setError(null);
  }, []);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}
        startIcon={<i className="fas fa-plus" />}>
        New Chapter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Chapter</DialogTitle>
        <DialogContent style={{ paddingTop: "4px" }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <MapSelect
            maps={maps}
            mapIndex={mapIndex}
            setMapIndex={setMapIndex}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChapterCreate;