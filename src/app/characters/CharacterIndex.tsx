import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";
import CharacterCard from "./CharacterCard";
import CharacterCreate from "./CharacterCreate";

function CharacterIndex({ campaignId }: { campaignId: number }) {
  const characters = useLiveQuery(() => db.characters.where({ campaignId }).toArray(), [campaignId]);

  return (
    <div className="flex flex-col gap-4 border border-[var(--text-color)] rounded-lg p-4 m-4 bg-[var(--bg-color)]">
      <h1 className="text-xl font-bold">Characters</h1>
      <div className="flex flex-wrap gap-4">
        {characters?.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
        <CharacterCreate campaignId={campaignId} />
      </div>
    </div>
  )
}

export default CharacterIndex