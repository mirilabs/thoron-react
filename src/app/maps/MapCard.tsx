import { Map } from "@/data/db";
import { Link } from "react-router";
import React from "react";

function MapCard({ map, onClick }: {
  map: Map
  onClick?: () => void
}) {
  return (
    <Link to={`/campaigns/${map.campaignId}/maps/${map.id}`}>
      <div className={
        "border border-gray-500 rounded-lg p-2 min-w-[320px] " +
        "flex flex-row items-center gap-4 " +
        "bg-[var(--bg-color)] transition-colors duration-200 " +
        "hover:bg-[var(--bg-color-2)] " +
        "cursor-pointer"
      }
        onClick={onClick ? onClick : undefined}>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{map.name}</h1>
          <p className="text-sm text-[var(--text-color-2)]">
            {map.map?.[0]?.length || 0} x {map.map?.length || 0}
          </p>
        </div>
        <i className="fas fa-map ml-auto text-2xl text-[var(--accent-color)]" />
      </div>
    </Link>
  )
}

export default MapCard;
