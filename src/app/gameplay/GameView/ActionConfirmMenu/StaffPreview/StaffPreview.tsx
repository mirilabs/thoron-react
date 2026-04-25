import React from "react";
import { useControllerSelector } from "@/app/gameplay/utils/reduxHooks";
import { useSelectedTarget, useSelectedUnit } from "@/app/gameplay/utils/useUnit";
import { staffEffects, type DeployedUnit } from "thoron";
import UnitChip from "@/app/gameplay/ControlPanel/ChapterLog/UnitChip";

const RIGHT_ARROW = "\u2192";

function StaffPreview() {
  const unit: DeployedUnit = useSelectedUnit();
  const itemIndex = useControllerSelector(s => s.pendingMove.itemIndex);
  const item = unit.items[itemIndex];
  const target = useSelectedTarget();

  if (!item || !target || item.type !== "staff") return null;

  const effect = staffEffects[item.stats.effect];

  const healing = item.stats.effect === "heal" ? (
    Math.floor(
      item.stats.basePower + item.stats.magicCoeff * unit.getStats().mag
    )
  ) : 0;
  const newHP = Math.min(target.state.hp + healing, target.getStats().mhp);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold">
        {item.name}
      </h1>
      {
        effect &&
        <p className="text-sm text-(--text-color-2)">
          {effect.description}
        </p>
      }
      <div className="flex flex-row items-center gap-2">
        <UnitChip unit={target} clickToSelect={false} />
        <p className="text-sm font-bold text-(--text-color-2)">
          HP
        </p>
        <p className="text-sm">
          {target.state.hp}
          {` ${RIGHT_ARROW} `}
          {newHP}
        </p>
      </div>
    </div>
  );
}

export default StaffPreview;