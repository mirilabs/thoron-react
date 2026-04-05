import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link, useParams } from "react-router";
import db from "@/data/db";
import CharacterList from "./CharacterList";
import CharacterDetail from "./CharacterDetail";
import { Button } from "@mui/material";

function CharacterShow() {
  const { id: campaignId, characterId } = useParams();

  const character = useLiveQuery(() => (
    db.characters.get(Number(characterId))
  ), [characterId]);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4 p-4">
        <Link to={`/campaigns/${campaignId}`}>
          <Button variant="text"
            startIcon={<i className="fas fa-arrow-left" />}>
            Back
          </Button>
        </Link>
        <CharacterList campaignId={Number(campaignId)} />
      </div>
      <CharacterDetail character={character} editable={true} />
    </div>
  )
}

export default CharacterShow