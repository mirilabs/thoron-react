import { Character } from "@/data/db";
import React from "react";

function CharacterCard({ character }: {
  character: Character
}) {
  const portraitUrl = character.portrait ?
    URL.createObjectURL(character.portrait) : "";
  const mapSpriteUrl = character.mapSprite ?
    URL.createObjectURL(character.mapSprite) : "";

  return (
    <div className={
      "border border-gray-500 rounded-lg p-4 min-w-[320px] " +
      "flex flex-row items-center gap-4"
    }>
      <img src={portraitUrl} alt={character.name} width={64} height={64} />
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{character.name}</h1>
        <p>Level {character.level} {character.className}</p>
      </div>
      <img src={mapSpriteUrl} alt={character.name}
        className="ml-auto"
        width={32} height={32} />
    </div>
  )
}

export default CharacterCard