import React from "react";
import { Link, useParams } from "react-router";
import { Button } from "@mui/material";
import MapList from "./MapList";
import MapDetail from "./MapDetail";
import { MapDetailEmpty } from "./MapDetailContent";

function MapsIndex() {
  const { id: campaignId, mapId } = useParams();

  return (
    <div className="flex flex-row gap-2 h-full">
      <div className="flex flex-col gap-4 p-4 min-w-[380px] h-full overflow-hidden">
        <Link to={`/campaigns/${campaignId}`}>
          <Button variant="text"
            startIcon={<i className="fas fa-chevron-left" />}
            sx={{
              color: 'var(--text-color)',
              fontWeight: 'bold',
              '&:hover': { background: 'var(--bg-color)' }
            }}>
            Back
          </Button>
        </Link>
        <MapList campaignId={Number(campaignId)} />
      </div>
      <div className="flex flex-col">
        {mapId ? (
          <MapDetail mapId={Number(mapId)} />
        ) : (
          <MapDetailEmpty />
        )}
      </div>
    </div>
  )
}

export default MapsIndex;
