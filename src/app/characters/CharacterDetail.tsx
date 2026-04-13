import React, { useState } from "react";
import { Character } from "@/data/db";
import db from "@/data/db";
import StatView from "../gameplay/ControlPanel/UnitDetail/StatView";
import InventoryView from "../gameplay/ControlPanel/Items/Inventory";
import { Button } from "@mui/material";
import UnitEditForm from "../gameplay/ControlPanel/UnitEdit/UnitEditForm";
import UnitDetail from "../gameplay/ControlPanel/UnitDetail/UnitDetail";

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
        <UnitDetail
          record={character}
          handleStartEdit={() => setEditing(true)}
        />
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