import React from "react";
import HPBar from "@/app/gameplay/ControlPanel/UnitIndex/HPBar";
import ItemIcon from "@/app/gameplay/ControlPanel/Items/ItemIcon";
import { ItemRecord } from "thoron";

interface ICombatPreview {
  unitName: string,       // name of unit
  portraitUrl?: string, // unit portrait url
  equippedItem: ItemRecord, // equipped item
  maxHP: number,      // max hp value
  startHP: number,    // hp at beginning of combat
  endHP: number,      // hp at end of combat
  damage: number,     // damage value
  doubles: boolean,   // true if speed high enough to double
  hit: number,        // hit value
  crit: number,       // crit value
  isInRange: boolean  // true if unit able to attack
}

function CombatPreviewStatsSide({ data }: {
  data: ICombatPreview
}) {
  const {
    unitName,
    portraitUrl,
    equippedItem,
    maxHP, startHP, endHP,
    damage, hit, crit, doubles,
    isInRange
  } = data;

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div>
        <div>
          {
            portraitUrl &&
            <img className="portrait" src={portraitUrl} alt={unitName} />
          }
          {unitName}
        </div>
        <div className="flex flex-row items-center">
          <ItemIcon item={equippedItem} />
          <span>
            {equippedItem.name}
          </span>
        </div>
        <div>
          <span>HP</span>
          <span>
            {startHP} → {endHP}
          </span>
        </div>
        <HPBar maxHP={maxHP}
          hp={startHP}
          damage={startHP - endHP} />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Dmg</th>
            <th>
              {isInRange ? (damage + (doubles ? "×2" : "")) : "--"}
            </th>
          </tr>
          <tr>
            <th>Hit</th>
            <th>
              {isInRange ? hit : "--"}
            </th>
          </tr>
          <tr>
            <th>Crit</th>
            <th>
              {isInRange ? crit : "--"}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CombatPreviewStatsSide;
export {
  ICombatPreview
}