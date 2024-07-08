import "./index.scss";
import React, { useState } from "react";
import useSelectedUnit from "../utils/useSelectedUnit";
import useUIAction from "components/utils/useUIAction";
import StatView from "./StatView";

function UnitDetail() {
  const [show, setShow] = useState(false);
  const selectedUnit = useSelectedUnit();

  useUIAction("toggle_character_detail_display", () => {
    setShow(!show);
  });

  useUIAction('escape', () => {
    setShow(false);
  });

  if (!selectedUnit) return null;
  return (
    <div className="unit-detail" style={{ visibility: show ? 'visible' : 'hidden' }}>
      <div className="title">
        <h1 className="name">{selectedUnit.record.name}</h1>
        
      </div>
      <StatView stats={selectedUnit.record.stats}
          growths={selectedUnit.record.growths} />
    </div>
  )
}

export default UnitDetail;