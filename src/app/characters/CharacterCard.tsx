import { Character } from "@/data/db";
import React from "react";

function CharacterCard({ character, onClick }: {
  character: Character
  onClick?: () => void
}) {
  const portraitUrl = character.portrait ?
    URL.createObjectURL(character.portrait) : "";
  const mapSpriteUrl = character.mapSprite ?
    URL.createObjectURL(character.mapSprite) : "";

  return (
    <div className={
      "border border-gray-500 rounded-lg p-2 min-w-[320px] " +
      "flex flex-row items-center gap-4 " +
      "bg-[var(--bg-color)] transition-colors duration-200 " +
      "hover:bg-[var(--bg-color-2)] " +
      "cursor-pointer"
    }
      onClick={onClick ? onClick : undefined}>
      <img src={portraitUrl} alt={character.name} width={64} height={64} />
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{character.name}</h1>
        <p>{character.className}</p>
        <p className="text-sm text-[var(--text-color-2)]">
          Lv. {character.level}
        </p>
      </div>
      <img src={mapSpriteUrl} alt={character.name}
        className="ml-auto"
        width={32} height={32} />
    </div>
  )
}

export default CharacterCard