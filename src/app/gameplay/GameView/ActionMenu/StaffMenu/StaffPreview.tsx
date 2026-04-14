import HPBar from '@/app/gameplay/ControlPanel/UnitIndex/HPBar';
import React, { useContext, useEffect } from 'react';
import { DeployedUnit, ItemRecord, staffEffects } from 'thoron';

interface StaffPreviewProps {
  unit: DeployedUnit;
  target: DeployedUnit;
  staff: ItemRecord;
}

function StaffPreview({ unit, target, staff }: StaffPreviewProps) {
  if (!unit || !target || !staff || !(staff.type === "staff"))
    return <div>No staff selected</div>;

  return (
    <div className="combat-forecast">
      <StaffPreviewContent unit={unit} target={target} staff={staff} />
    </div>
  )
}

function StaffPreviewContent({ unit, target, staff }: StaffPreviewProps) {
  if (!unit || !target || !staff || !(staff.type === "staff"))
    return <div>No staff selected</div>;

  switch (staff.stats.effect) {
    case "heal":
      const amount = staffEffects.heal.getHealValue(staff, unit, target);
      return (
        <>
          <div className="name">{target.record.name}</div>
          <div className="hp">
            <span className="label">HP: </span>
            <span className="stat-value">
              {target.hp} → {target.hp + amount}
            </span>
          </div>
          <HPBar maxHP={target.maxHp} hp={target.hp + amount} damage={amount} />
        </>
      );
    default:
      return (
        <>
          <p>Unknown staff effect</p>
        </>
      );
  }
}

export default StaffPreview;