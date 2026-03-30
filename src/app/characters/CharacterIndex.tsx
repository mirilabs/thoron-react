import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";
import CharacterCard from "./CharacterCard";

function CharacterIndex({ campaignId }: { campaignId: number }) {
  const characters = useLiveQuery(() => db.characters.where({ campaignId }).toArray(), [campaignId]);

  return (
    <div className="flex flex-row gap-4">
      {characters?.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}

export default CharacterIndex