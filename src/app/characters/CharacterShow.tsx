import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";
import CharacterDetail from "./CharacterDetail";

function CharacterShow({ characterId }: { characterId: number }) {
  const character = useLiveQuery(
    () => db.characters.get(characterId), [characterId]);

  if (!character) {
    return <div>Character not found</div>
  }

  return (
    <CharacterDetail character={character} editable={true} />
  )
}

export default CharacterShow;