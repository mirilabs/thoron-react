import ItemIcon from '@/app/gameplay/ControlPanel/Items/ItemIcon';
import { Button } from '@mui/material';
import React from 'react';
import { DeployedUnit, ItemRecord } from 'thoron';

interface StaffSelectMenuProps {
  unit: DeployedUnit
  selectedStaff: ItemRecord | null;
  setSelectedStaff: (staff: ItemRecord | null) => void;
}

function StaffSelector({
  unit,
  selectedStaff,
  setSelectedStaff
}: StaffSelectMenuProps) {
  const handleStaffSelect = (staff: ItemRecord) => {
    setSelectedStaff(staff);
  };

  const items = unit.items.filter(item => item.type === "staff")
    .map((item, index) => {
      const isSelected = selectedStaff === item;
      return (
        <Button
          key={index}
          variant={isSelected ? "contained" : "outlined"}
          className="staff-select__item"
          onClick={() => { handleStaffSelect(item) }}
        >
          {item.name}
        </Button>
      )
    });

  return (
    <>
      <div className="flex flex-row gap-4 justify-between mb-4">
        <span className="text-xl font-bold">{unit?.record.name}</span>
        <div className="flex flex-row gap-2 items-center">
          <ItemIcon item={selectedStaff} />
          <span className="text-lg">{selectedStaff?.name || "None"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {items}
      </div>
    </>
  );
}

export default StaffSelector;