import React, { useState } from "react";
import { Character } from "@/data/db";
import db from "@/data/db";
import LevelView from "../gameplay/ControlPanel/UnitDetail/LevelView";
import StatView from "../gameplay/ControlPanel/UnitDetail/StatView";
import ClassView from "../gameplay/ControlPanel/UnitDetail/ClassView";
import InventoryView from "../gameplay/ControlPanel/Items/Inventory";
import { Button } from "@mui/material";
import UnitEditForm from "../gameplay/ControlPanel/UnitEdit/UnitEditForm";

function CharacterDetail({
  character,
  editable = false
}: {
  character?: Character,
  editable?: boolean
}) {
  const [editing, setEditing] = useState(false);

  let content: React.ReactNode;

  if (!character) {
    content = <div>Character not found</div>
  }
  else if (editing) {
    const handleSave = async (character: Character) => {
      await db.characters.update(character.id, { ...character });
      setEditing(false);
    }

    content = (
      <UnitEditForm
        record={character}
        handleCancel={() => setEditing(false)}
        handleSave={handleSave}
      />
    )
  }
  else {
    content = (
      <>
        <div className="flex flex-row gap-4 items-end">
          <h1 className="text-xl font-bold">
            {character.name}
          </h1>
          <ClassView record={character} />
          {
            editable && (
              <Button variant="text"
                onClick={() => setEditing(true)}
                startIcon={<i className="fas fa-edit" />}>
                Edit
              </Button>
            )
          }
        </div>
        <LevelView record={character} />
        <InventoryView items={character.items} />
        <StatView stats={character.stats} growths={character.growths} />
      </>
    )
  }

  return (
    <div className={
      "flex flex-col gap-4 " +
      "border border-[var(--text-color)] rounded-lg p-4 m-4 " +
      "bg-[var(--bg-color)]"
    }>
      {content}
    </div>
  )
}

export default CharacterDetail;