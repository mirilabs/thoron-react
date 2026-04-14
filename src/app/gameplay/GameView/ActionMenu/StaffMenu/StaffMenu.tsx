import React, { useEffect } from 'react';
import { useControllerSelector } from '@/app/gameplay/utils/reduxHooks';
import useUnit, { useSelectedUnit } from '@/app/gameplay/utils/useUnit';
import { DeployedUnit } from 'thoron';
import StaffSelector from './StaffSelector';
import StaffPreview from './StaffPreview';
import StaffInput from './StaffInput';

function StaffMenu() {
  const unit: DeployedUnit = useSelectedUnit();
  const {
    targetId
  } = useControllerSelector(state => state.pendingMove);
  const target: DeployedUnit = useUnit(targetId);

  const [selectedStaff, setSelectedStaff] = React.useState(null);

  // set default staff on initial render or when unit changes
  useEffect(() => {
    if (!unit) return;
    const initialStaff = unit.items.filter(item => item.type === "staff")[0];
    if (initialStaff) {
      setSelectedStaff(initialStaff);
    }
  }, [unit]);

  if (!unit) return null;
  if (!target) return null;
  return (
    <div className={
      "grid grid-cols-[0.3fr_0.7fr] grid-rows-[auto_100px] p-4 " +
      "gap-x-8 gap-y-4"
    }>
      <div className="flex flex-1 flex-col pointer-events-auto min-w-[160px]">
        <StaffSelector unit={unit}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff} />
      </div>
      <div className="flex flex-1 flex-col pointer-events-auto">
        <StaffPreview unit={unit}
          target={target}
          staff={selectedStaff} />
      </div>
      <div className="col-span-2 pointer-events-auto">
        <StaffInput />
      </div>
    </div>
  )
}

export default StaffMenu;