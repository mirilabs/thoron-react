import React, { useState, useEffect, useContext } from "react";
import db, { Character } from "@/data/db";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  RadioGroup,
  Radio
} from "@mui/material";
import UnitEditForm from "../UnitEdit/UnitEditForm";
import { createDefaultCharacter } from "./characterDefaults";
import { Team } from "thoron";
import { useThoronContext } from "../../ThoronContext";
import CharacterSelect from "./CharacterSelect";

interface UnitAddFormProps {
  onDone: (unit: Character, team: Team) => void;
  onCancel: () => void;
}

function UnitAddForm({ onDone, onCancel }: UnitAddFormProps) {
  const { campaignId } = useThoronContext();

  const [saveToCampaign, setSaveToCampaign] = useState(false);

  const [record, setRecord] = useState<Character>(createDefaultCharacter());
  const [team, setTeam] = useState<Team>(Team.PLAYER);

  const handleSelectCharacter = (char: Character) => {
    setRecord(char);
  }

  const handleConfirm = () => {
    if (saveToCampaign) {
      const { id: _, ...rest } = record;
      db.characters.add({ ...rest, campaignId });
    }
    onDone(record, team);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <RadioGroup
        value={team}
        onChange={(e) => setTeam(Number(e.target.value) as Team)}
        sx={{ flexDirection: 'row', gap: 2 }}
      >
        <FormControlLabel
          value={Team.PLAYER}
          control={<Radio />}
          label="Player"
        />
        <FormControlLabel
          value={Team.ENEMY}
          control={<Radio />}
          label="Enemy"
        />
      </RadioGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={saveToCampaign}
            onChange={(e) => setSaveToCampaign(e.target.checked)}
          />
        }
        label="Save to database"
      />
      <CharacterSelect
        campaignId={campaignId}
        onSelect={handleSelectCharacter}
      />
      <Box className="flex flex-col gap-2">
        <UnitEditForm
          record={record}
          handleSave={handleConfirm}
          handleCancel={onCancel}
        />
      </Box>
    </Box>
  );
}

export default UnitAddForm;