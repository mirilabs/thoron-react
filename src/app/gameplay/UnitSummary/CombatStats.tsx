import React from "react";
import { DeployedUnit } from "thoron";

const shadowStyle = {
  boxShadow: (
    "inset 0 -8px 8px -8px rgba(from var(--accent-color) r g b / 0.5)"
  )
}

function StatItem({
  label,
  value
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="flex flex-row gap-2 items-center justify-between px-2"
      style={shadowStyle}
    >
      <h1 className="font-bold text-sm text-(--text-color-2)">{label}</h1>
      <p className="text-sm">{value.toFixed(0)}</p>
    </div>
  )
}

function CombatStats({
  unit
}: {
  unit: DeployedUnit;
}) {
  const combatStats = unit.getCombatStats();

  const {
    isMagic,
    might,
    str,
    mag,
    aspd,
    hit,
    avd,
    def,
    res
  } = combatStats;

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-2">
      <StatItem
        label={isMagic ? "M.Atk" : "P.Atk"}
        value={might + (isMagic ? mag : str)}
      />
      <StatItem label="Spd" value={aspd} />
      <StatItem label="Hit" value={hit} />
      <StatItem label="Avo" value={avd} />
      <StatItem label="Def" value={def} />
      <StatItem label="Res" value={res} />
    </div>
  )
}

export default CombatStats;