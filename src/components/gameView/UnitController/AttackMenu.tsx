import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./AttackMenu.scss";
import useUnit, { useSelectedUnit } from "components/utils/useUnit";
import { useControllerSelector } from "components/utils/reduxHooks";

const HP_BAR_WIDTH_SCALE = 1 / 60; // 60 hp = 100% width

function HPBar({ maxHP, hp, damage }) {
  let remainingHP = Math.max(hp - damage, 0);

  let percentWidth = (value) => {
    return { width: `${value * 100}%` }
  }
  
  return (
    <div className="hp-bar" style={percentWidth(maxHP * HP_BAR_WIDTH_SCALE)}>
      <span className="hp-bar__remaining"
        style={percentWidth(remainingHP / maxHP)}>
      </span>
      <span className="hp-bar__damage"
        style={percentWidth(damage / maxHP)}>
      </span>
    </div>
  )
}

function CombatForecastSide({ unit, forecast, oppForecast }) {
  return (
    <>
      <div className="header">
        <div className="name">{unit.record.name}</div>
        <div className="equipped">
          {unit.items[unit.state.equippedIndex].name}
        </div>
      </div>
      <div className="body">
        <div className="hp">
          <span className="label">HP</span>
          <span className="value">
            {unit.hp} → {unit.hp - oppForecast.damage}
          </span>
        </div>
        <HPBar maxHP={unit.getStats().mhp}
          hp={unit.hp}
          damage={oppForecast.damage} />
        <div className="damage">
          <span className="label">Dmg:</span>
          <span className="value">
            {forecast.damage}
            {forecast.doubles ? "×2" : ""}
          </span>
        </div>
        <div className="hit">
          <span className="label">Hit:</span>
          <span className="value">{forecast.hit}</span>
        </div>
        <div className="crit">
          <span className="label">Crit:</span>
          <span className="value">{forecast.crit}</span>
        </div>
      </div>
    </>
  )
}

function CombatForecast({ attacker, target, combat }) {
  return (
    <div className="attack-preview">
      <span className="attack-preview__left">
        <CombatForecastSide unit={attacker} forecast={combat.initiator}
          oppForecast={combat.defender} />
      </span>
      <span className="attack-preview__center">

      </span>
      <span className="attack-preview__right">
        <CombatForecastSide unit={target} forecast={combat.defender}
          oppForecast={combat.initiator} />
      </span>
    </div>
  )
}

function CombatInput() {
  return (
    <div className="attack-input">
      <button className="cycle-weapon">
        <i className="fas fa-left" />
      </button>
      <button className="cycle-weapon">
        <i className="fas fa-right" />
      </button>
      <button className="confirm">Attack</button>
      <button className="cycle-target">
        <i className="fas fa-left" />
      </button>
      <button className="cycle-target">
        <i className="fas fa-right" />
      </button>
    </div>
  )
}

function AttackMenu(props: {
  display: boolean
}) {
  const nodeRef = useRef();

  let attacker = useSelectedUnit();
  let targetId = useControllerSelector(state => state.targetId);
  let target = useUnit(targetId);

  let combat;
  if (attacker && target) {
    combat = attacker?.getCombatForecast(target);
  }

  let transitionProps = {
    in: props.display,
    timeout: 100,
    nodeRef
  }

  return (
    <CSSTransition {...transitionProps}>
      <div className="attack-menu" ref={nodeRef}>
        {
          combat &&
          <CombatForecast attacker={attacker} target={target} combat={combat} />
        }
        <CombatInput />
      </div>
    </CSSTransition>
  )
}

export default AttackMenu;