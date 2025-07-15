import ItemIcon from '@/app/ControlPanel/Items/ItemIcon';
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
    <div className="staff-select combat-forecast">
      <div className="name">{unit?.record.name}</div>
      <div className="equipped">
        <ItemIcon item={selectedStaff} />
        <span>{selectedStaff?.name}</span>
      </div>
      {items}
    </div>
  );
}

export default StaffSelector;