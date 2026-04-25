import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { Button, IconButton } from "@mui/material";
import MapList from "./MapList";
import MapDetail from "./MapDetail";
import { MapDetailEmpty } from "./MapDetailContent";
import useResponsive from "../utils/useResponsive";

function MapsIndex() {
  const { campaignId, mapId } = useParams();
  const [size, WindowSize] = useResponsive();
  const isMobile = size <= WindowSize.SMALL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-row gap-2 h-full relative overflow-hidden">
      {isMobile && (
        <div className="absolute top-2 left-2 z-50">
          <IconButton
            onClick={toggleSidebar}
            sx={{
              background: 'var(--bg-color-2)',
              borderRadius: '0',
              width: '60px',
              height: '60px'
            }}
          >
            <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`} />
          </IconButton>
        </div>
      )}

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`
        ${isMobile ? [
          "fixed inset-y-0 left-0 z-50 bg-[var(--bg-color)] shadow-xl",
          "transform transition-transform duration-300 ease-in-out"
        ].join(" ") : "flex flex-col min-w-[380px]"}
        ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
        flex flex-col gap-4 p-4 h-full overflow-hidden
      `}>
        {isMobile && (
          <div className="flex justify-end">
            <IconButton onClick={() => setIsSidebarOpen(false)}
              sx={{ color: "var(--text-color)" }}>
              <i className="fas fa-times" />
            </IconButton>
          </div>
        )}

        {!isMobile && (
          <Link to={`/campaigns/${campaignId}`}>
            <Button variant="text"
              startIcon={<i className="fas fa-chevron-left" />}
              sx={{
                color: "var(--text-color)",
                fontWeight: "bold",
                "&:hover": { background: "var(--bg-color)" }
              }}>
              Back
            </Button>
          </Link>
        )}

        <div className="flex-grow overflow-hidden">
          <MapList campaignId={Number(campaignId)} />
        </div>

        {isMobile && (
          <Link to={`/campaigns/${campaignId}`} className="mt-auto">
            <Button variant="outlined"
              startIcon={<i className="fas fa-chevron-left" />}
              fullWidth
              sx={{
                color: "var(--text-color)",
                borderColor: "var(--text-color)",
                fontWeight: "bold",
                "&:hover": {
                  background: "var(--bg-color)",
                  borderColor: "var(--text-color)"
                }
              }}>
              Back to Campaign
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col flex-grow overflow-auto min-w-[320px]">
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
