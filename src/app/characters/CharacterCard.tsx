import { Character } from "@/data/db";
import { Link } from "react-router";
import React from "react";
import unknownIcon from "@/icons/unknown.svg"

function CharacterCard({ character, onClick }: {
  character: Character
  onClick?: () => void
}) {
  const portraitUrl = character.portrait ?
    URL.createObjectURL(character.portrait) : unknownIcon;
  const mapSpriteUrl = character.mapSprite ?
    URL.createObjectURL(character.mapSprite) : unknownIcon;

  return (
    <Link to={`/campaigns/${character.campaignId}/characters/${character.id}`}>
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
    </Link>
  )
}

export default CharacterCard