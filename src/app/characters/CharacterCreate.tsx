import React, { useState } from "react";
import UnitEditForm from "../gameplay/ControlPanel/UnitEdit/UnitEditForm";
import { IUnitRecord } from "thoron";
import { Button } from "@mui/material";
import db, { Character } from "@/data/db";

const emptyCharacter: Partial<Character> = {
  id: 0,
  name: "",
  className: "",
  level: 1,
  exp: 0,
  movement: 5,
  moveType: "infantry",
  stats: {
    mhp: 1, str: 0, mag: 0, skl: 0,
    spd: 0, luk: 0, def: 0, res: 0
  },
  growths: {
    mhp: 0, str: 0, mag: 0, skl: 0,
    spd: 0, luk: 0, def: 0, res: 0
  },
  skills: [],
  items: []
}

function CharacterCreateForm({
  handleSave,
  handleCancel
}: {
  handleSave: (record: IUnitRecord) => void
  handleCancel: () => void
}) {
  return (
    <div className="border border-[var(--accent-color)] rounded-lg p-2">
      <UnitEditForm record={emptyCharacter as Character}
        handleSave={handleSave}
        handleCancel={handleCancel} />
    </div>
  )
}

function CharacterCreate({ campaignId }: { campaignId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (record: Character) => {
    await db.characters.add({
      ...record,
      campaignId: campaignId
    });
    setIsOpen(false);
  }

  if (!isOpen) return (
    <Button variant="contained" onClick={() => setIsOpen(true)}
      startIcon={<i className="fas fa-plus" />}>
      New Character
    </Button>
  )

  return (
    <CharacterCreateForm
      handleSave={handleSave}
      handleCancel={() => setIsOpen(false)} />
  )
}

export default CharacterCreate