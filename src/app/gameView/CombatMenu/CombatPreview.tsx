import "./CombatPreview.scss";
import HPBar from "@/app/ControlPanel/UnitIndex/HPBar";
import ItemIcon from "@/app/ControlPanel/Items/ItemIcon";
import React from "react";
import { ItemRecord } from "thoron/dist/Item";

interface ICombatPreview {
  unitName: string,       // name of unit
  unitSpriteUrl?: string, // unit sprite url
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

function CombatPreview({ data }: {
  data: ICombatPreview
}) {
  const {
    unitName,
    unitSpriteUrl,
    equippedItem,
    maxHP, startHP, endHP,
    damage, hit, crit, doubles,
    isInRange
  } = data;

  return (
    <div className="combat-forecast">
      <div>
        <div className="name">
          {
            unitSpriteUrl &&
            <img className="sprite" src={unitSpriteUrl} alt={unitName} />
          }
          {unitName}
        </div>
        <div className="equipped">
          <ItemIcon item={equippedItem} />
          <span>
            {equippedItem.name}
          </span>
        </div>
        <div className="hp">
          <span className="label">HP</span>
          <span className="value">
            {startHP} → {endHP}
          </span>
        </div>
        <HPBar maxHP={maxHP}
          hp={startHP}
          damage={startHP - endHP} />
      </div>
      <table className="stats">
        <tbody>
          <tr>
            <th className="stat-label">Dmg</th>
            <th className="stat-value">
              {isInRange ? (damage + (doubles ? "×2" : "")) : "--"}
            </th>
          </tr>
          <tr>
            <th className="stat-label">Hit</th>
            <th className="stat-value">
              {isInRange ? hit : "--"}
            </th>
          </tr>
          <tr>
            <th className="stat-label">Crit</th>
            <th className="stat-value">
              {isInRange ? crit : "--"}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CombatPreview;
export {
  ICombatPreview
}