import ThoronContext from '@/app/ThoronContext';
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
    <div className="staff-preview">
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
        <div>
          <p>Heal</p>
          <p>{target.record.name}</p>
          <p>{target.hp} → {target.hp + amount}</p>
        </div>
      );
    default:
      return (
        <div>
          <p>Unknown staff effect</p>
        </div>
      );
  }
}

export default StaffPreview;