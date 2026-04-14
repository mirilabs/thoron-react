import React, { useState, useEffect } from "react";
import db, { Character } from "@/data/db";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@mui/material";

function CharacterSelect({
  campaignId,
  onSelect
}: {
  campaignId: number;
  onSelect: (char: Character) => void;
}) {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [selectedCharId, setSelectedCharId] = useState<number | string>("");

  // load characters from campaign
  useEffect(() => {
    if (!campaignId) return;
    db.characters.where("campaignId").equals(campaignId).toArray()
      .then(characters => {
        return characters.filter(c => {
          // remove portrait and mapSprite
          const { portrait, mapSprite, ...rest } = c;
          return rest;
        });
      })
      .then(characters => setCharacters(characters));
  }, [campaignId]);

  const handleSelectCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    const char = characters?.find(c => c.id === id);
    if (char) {
      setSelectedCharId(id);
      onSelect(char);
    }
  }

  if (!characters) return <Typography>Loading...</Typography>;

  return (
    <FormControl fullWidth>
      <InputLabel id="select-character-label">Load Character</InputLabel>
      <Select
        labelId="select-character-label"
        value={selectedCharId?.toString()}
        label="Select Character"
        onChange={handleSelectCharacter}
      >
        {characters?.map(c => (
          <MenuItem key={c.id} value={c.id.toString()}>
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
  )
}

export default CharacterSelect;