import "./UnitPanel.scss";
import React from 'react';
import UnitPanelHeader from "./Header";
import UnitPanelBody from "./Body";
import useSelectedUnit from "components/utils/useSelectedUnit";

function UnitPanel() {
  const unit = useSelectedUnit();

  return (
    <div className="unit-panel">
      <UnitPanelBody unit={unit} />
      <UnitPanelHeader unit={unit} />
    </div>
  )
}

export default UnitPanel;