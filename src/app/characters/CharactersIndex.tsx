import React from "react";
import { Link, useParams } from "react-router";
import CharacterList from "./CharacterList";
import { Button } from "@mui/material";
import CharacterShow from "./CharacterShow";

function CharactersIndex() {
  const { campaignId, characterId } = useParams();

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
      {characterId && <CharacterShow characterId={Number(characterId)} />}
    </div>
  )
}

export default CharactersIndex