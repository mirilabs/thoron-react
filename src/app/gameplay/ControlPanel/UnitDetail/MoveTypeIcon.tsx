import React from "react";
import moveTypeIcons from "@/icons/movetypes";

interface MoveTypeIconProps {
  moveType: keyof typeof moveTypeIcons;
}

function MoveTypeIcon({ moveType }: MoveTypeIconProps) {
  const icon = moveTypeIcons[moveType];
  if (!icon) {
    return null;
  }
  return (
    <div className="flex items-center">
      <img src={icon} alt={moveType} className="item-icon w-4 h-4" />
    </div>
  )
}

export default MoveTypeIcon;