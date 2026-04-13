import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GameController } from "thoron";
import db, { Character, Chapter } from "@/data/db";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Typography
} from "@mui/material";
import UnitEditForm from "../UnitEdit/UnitEditForm";
import { createDefaultCharacter } from "./characterDefaults";

interface UnitAddFormProps {
  controller: GameController;
  onDone: () => void;
}

function UnitAddForm({ controller, onDone }: UnitAddFormProps) {
  const { id } = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [mode, setMode] = useState<"select" | "create">("select");
  const [selectedCharId, setSelectedCharId] = useState<number | "">("");
  const [saveToCampaign, setSaveToCampaign] = useState(true);

  useEffect(() => {
    if (id) {
      db.chapters.get(parseInt(id)).then(setChapter);
    }
  }, [id]);

  const campaignId = chapter?.campaignId;

  const characters = useLiveQuery(
    () => (
      campaignId ?
        db.characters.where("campaignId").equals(campaignId).toArray() :
        []
    ),
    [campaignId]
  );

  const handleAddExisting = () => {
    const char = characters?.find(c => c.id === selectedCharId);
    if (char) {
      controller.addUnit(char);
      onDone();
    }
  };

  const handleCreateNew = async (record: Character) => {
    let finalChar = record;
    if (saveToCampaign && campaignId) {
      const { id: _, ...recordWithoutId } = record;
      const newId = await db.characters.add({ ...recordWithoutId, campaignId });
      finalChar = { ...record, id: newId as number, campaignId };
    }
    controller.addUnit(finalChar);
    onDone();
  };

  if (!chapter) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant={mode === "select" ? "contained" : "outlined"}
          onClick={() => setMode("select")}
          fullWidth
        >
          Select Existing
        </Button>
        <Button
          variant={mode === "create" ? "contained" : "outlined"}
          onClick={() => setMode("create")}
          fullWidth
        >
          Create New
        </Button>
      </Box>

      {mode === "select" ? (
        <>
          <FormControl fullWidth>
            <InputLabel id="select-character-label">Select Character</InputLabel>
            <Select
              labelId="select-character-label"
              value={selectedCharId}
              label="Select Character"
              onChange={(e) => setSelectedCharId(e.target.value as number)}
            >
              {characters?.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} ({c.className})
                </MenuItem>
              ))}
              {(!characters || characters.length === 0) && (
                <MenuItem disabled>
                  No characters found for this campaign
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleAddExisting}
            disabled={selectedCharId === ""}
            sx={{ alignSelf: 'flex-end' }}
          >
            Add to Chapter
          </Button>
        </>
      ) : (
        <Box className="flex flex-col gap-2">
          <FormControlLabel
            control={
              <Checkbox
                checked={saveToCampaign}
                onChange={(e) => setSaveToCampaign(e.target.checked)}
              />
            }
            label="Save to Campaign characters database"
          />
          <Box>
            <UnitEditForm
              record={createDefaultCharacter(campaignId!)}
              handleSave={handleCreateNew}
              handleCancel={() => setMode("select")}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default UnitAddForm;