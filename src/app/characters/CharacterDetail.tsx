import React from "react";
import { Character } from "@/data/db";

function CharacterDetail({ character }: {
  character?: Character
}) {
  if (!character) {
    return <div>Character not found</div>
  }

  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  )
}

export default CharacterDetail;