import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";
import MapCard from "./MapCard";
import MapCreate from "./MapCreate";

function MapList({ campaignId }: { campaignId: number }) {
  if (!campaignId) return null;

  const maps = useLiveQuery(() => (
    db.maps.where({ campaignId }).toArray()
  ), [campaignId]);

  return (
    <div className={
      "flex flex-col gap-4 min-w-[360px] " +
      "border border-[var(--text-color)] rounded-lg p-4 " +
      "bg-[var(--bg-color)] shadow-md"
    }>
      <div className={
        "flex flex-row items-center justify-between " +
        "border-b border-[var(--text-color-2)] pb-2 mb-2"
      }>
        <h1 className="text-xl font-bold text-[var(--text-color)]">Maps</h1>
      </div>

      <div className={
        "flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
      }>
        {maps?.length === 0 ? (
          <p className="text-[var(--text-color-2)] italic text-center py-4">
            No maps found.
          </p>
        ) : (
          maps?.map((map) => (
            <MapCard key={map.id} map={map} />
          ))
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--text-color-2)]">
        <MapCreate campaignId={campaignId} />
      </div>
    </div>
  )
}

export default MapList;
