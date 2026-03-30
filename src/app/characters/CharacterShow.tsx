import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router";
import db from "@/data/db";
import CharacterDetail from "./CharacterDetail";
import CharacterList from "./CharacterList";

function CharacterShow() {
  const { id: campaignId, characterId } = useParams();

  const character = useLiveQuery(() => (
    db.characters.get(Number(characterId))
  ), [characterId]);

  return (
    <div className="flex flex-row gap-4">
      <CharacterList campaignId={Number(campaignId)} />
      <CharacterDetail character={character} />
    </div>
  )
}

export default CharacterShow