import "./UnitPanel.scss";
import React, { useState, useContext } from 'react';
import ThoronContext from '../ThoronContext';
import useEventListener from '../useEventListener';
import UnitPanelHeader from "./Header";
import UnitPanelBody from "./Body";

function UnitPanel() {
  const { uiEvents } = useContext(ThoronContext);
  const [unit, setUnit] = useState(null);

  useEventListener(uiEvents, 'select_unit', unit => {
    if (unit !== null) setUnit(unit);
  });

  return (
    <div className="unit-panel">
      <UnitPanelHeader unit={unit} />
      <UnitPanelBody unit={unit} />
    </div>
  )
}

export default UnitPanel;