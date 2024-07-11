import "./index.scss";
import React, { useState, useRef } from "react";
import useSelectedUnit from "../utils/useSelectedUnit";
import useUIAction from "components/utils/useUIAction";
import StatView from "./StatView";
import { CSSTransition } from "react-transition-group";
import InventoryView from "./InventoryView";

function UnitDetail() {
  const [show, setShow] = useState(false);
  const selectedUnit = useSelectedUnit();

  useUIAction("toggle_character_detail_display", () => {
    setShow(!show);
  });

  useUIAction('escape', () => {
    setShow(false);
  });

  const nodeRef = useRef();

  const transitionProps = {
    in: show,
    timeout: 200,
    classNames: 'unit-detail',
    nodeRef
  }

  if (!selectedUnit) return null;
  return (
    <CSSTransition {...transitionProps}>
      <div className="unit-detail" ref={nodeRef}>
        <div className="title">
          <h1 className="name">{selectedUnit.record.name}</h1>
          
        </div>
        <StatView stats={selectedUnit.baseStats}
            growths={selectedUnit.record.growths} />
        <InventoryView items={selectedUnit.items} />
      </div>
    </CSSTransition>
  )
}

export default UnitDetail;