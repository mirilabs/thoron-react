import ThoronContext from '@/app/ThoronContext';
import React, { useContext, useEffect } from 'react';
import { DeployedUnit, ItemRecord } from 'thoron';

interface StaffPreviewProps {
  unit: DeployedUnit;
  target: DeployedUnit;
  staff: ItemRecord;
}

function StaffPreview({ unit, target, staff }: StaffPreviewProps) {
  const { controller } = useContext(ThoronContext);

  useEffect(() => {
    if (!unit || !target || !staff) return;

    // get staff effect preview
    // TODO
  }, [unit, target, staff, controller]);

  return (
    <div className="staff-preview">
    </div>
  )
}

export default StaffPreview;