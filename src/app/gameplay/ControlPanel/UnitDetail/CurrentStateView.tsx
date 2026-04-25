import React from 'react';
import { DeployedUnit } from 'thoron';
import HPBar from '../UnitIndex/HPBar';
import ItemCard from '../Items/ItemCard';
import CombatStats from '../../UnitSummary/CombatStats';
import { useControllerSelector } from '../../utils/reduxHooks';

interface CurrentStateViewProps {
  unit: DeployedUnit;
}

const shadowStyle = {
  boxShadow: (
    "inset 0 -8px 8px -8px rgba(from var(--accent-color) r g b / 0.5)"
  )
}

function CurrentStateView({
  unit
}: CurrentStateViewProps) {
  const itemIndex = useControllerSelector(state => state.pendingMove.itemIndex);

  const hp = unit.state.hp;
  const maxHp = unit.record.stats.mhp;
  const equippedItem = unit.items[itemIndex ?? unit.state.equippedIndex];
  const { minRange, maxRange } = equippedItem?.stats ?? {};

  return (
    <div className="flex flex-col gap-2 bg-[var(--bg-color-2)] p-4 rounded-md">
      <div className="flex flex-row gap-2 items-center">
        <div
          className="flex flex-row gap-2 items-baseline pl-2 pr-2"
          style={shadowStyle}
        >
          <h1 className="font-bold text-sm text-[var(--text-color-2)]">HP</h1>
          <p className="text-lg">{hp}</p>
          <p className="text-lg"> / </p>
          <p className="text-lg">{maxHp}</p>
        </div>
        <span className="flex-grow">
          <HPBar maxHP={maxHp} hp={hp} damage={0} />
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2">
          <ItemCard
            item={equippedItem}
            showDetailOnClick={false}
          />
          <div className="flex flex-row gap-2 items-center ml-4">
            <h1 className="font-bold text-sm text-(--text-color-2)">Range</h1>
            <p className="text-sm">
              {minRange === maxRange ? minRange : `${minRange} - ${maxRange}`}
            </p>
          </div>
        </div>
        <CombatStats unit={unit} />
      </div>
    </div>
  )
}

export default CurrentStateView;