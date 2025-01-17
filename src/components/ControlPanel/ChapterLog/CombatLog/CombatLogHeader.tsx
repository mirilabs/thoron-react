import React from 'react';
import { ActionResult, DeployedUnit } from 'thoron';

interface CombatLogHeaderProps {
  unit: DeployedUnit;
  target: DeployedUnit;
  result: ActionResult;
  toggleDetail: () => void;
}

function CombatLogHeader(props: CombatLogHeaderProps) {
  return (
    <div className="combat-header" onClick={props.toggleDetail}>
      <strong>{props.unit.record.name}</strong>
      {" attacked "}
      <strong>{props.target.record.name}</strong>
    </div>
  )
}

export default CombatLogHeader;