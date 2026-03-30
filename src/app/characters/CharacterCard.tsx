import { Character } from "@/data/db";
import React from "react";

function CharacterCard({ character }: {
  character: Character
}) {
  return (
    <div className="border border-gray-500 rounded-lg p-4 min-w-[320px]">
      <h1>{character.name}</h1>
    </div>
  )
}

export default CharacterCard