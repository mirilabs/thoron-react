import React from "react";
import ItemIcon from "components/UnitSummary/ItemIcon";
import HPBar from "components/ControlPanel/UnitIndex/HPBar";

function CombatPreviewSide({ unit, forecast, oppForecast }) {
  const equipped = unit.items[unit.state.equippedIndex];
  const { damage, hit, crit, doubles, isInRange } = forecast;
  const oppDamage = oppForecast.projectedTotalDamage;

  return (
    <>
      <div className="header">
        <div className="name">{unit.record.name}</div>
        <div className="equipped">
          <ItemIcon item={equipped} />
          {equipped.name}
        </div>
      </div>
      <div className="body">
        <div className="hp">
          <span className="label">HP</span>
          <span className="value">
            {unit.hp} → {Math.max(unit.hp - oppDamage, 0)}
          </span>
        </div>
        <HPBar maxHP={unit.getStats().mhp}
          hp={unit.hp}
          damage={oppDamage} />
        <div className="damage">
          <span className="label">Dmg</span>
          <span className="value">
            {isInRange ? (damage + (doubles ? "×2" : "")) : "--"}
          </span>
        </div>
        <div className="hit">
          <span className="label">Hit</span>
          <span className="value">
            {isInRange ? hit : "--"}
          </span>
        </div>
        <div className="crit">
          <span className="label">Crit</span>
          <span className="value">
            {isInRange ? crit : "--"}
          </span>
        </div>
      </div>
    </>
  )
}

function CombatPreview({ attacker, target, forecast }) {
  return (
    <div className="attack-preview">
      <span className="attack-preview__left">
        <CombatPreviewSide unit={attacker}
          forecast={forecast.initiator}
          oppForecast={forecast.defender} />
      </span>
      <span className="attack-preview__center">

      </span>
      <span className="attack-preview__right">
        <CombatPreviewSide unit={target}
          forecast={forecast.defender}
          oppForecast={forecast.initiator} />
      </span>
    </div>
  )
}

export default CombatPreview;