import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";
import MapDetailContent, { MapDetailEmpty } from "./MapDetailContent";
import MapEditor from "./editor/MapEditor";

function MapDetail({ mapId }: { mapId?: number }) {
  const map = useLiveQuery(() => (
    db.maps.get(Number(mapId))
  ), [mapId]);

  const [editing, setEditing] = React.useState(false);

  if (!map) return <MapDetailEmpty />;

  return (
    <div className={
      "flex flex-col gap-6 " +
      "border border-[var(--text-color)] rounded-lg p-6 m-4 " +
      "bg-[var(--bg-color)] shadow-xl"
    }>
      {editing ? (
        <MapEditor
          map={map}
          onSave={() => setEditing(false)}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <MapDetailContent
          map={map}
          onEdit={() => setEditing(true)}
          onDelete={() => db.maps.delete(map.id)}
        />
      )}
    </div>
  );
}

export default MapDetail;