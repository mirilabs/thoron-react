import React from "react";
import "./Body.scss";

function StatRow(name, value) {
  return (
    <li className="stat">
      <span className="name">{name}</span> {value}
    </li>
  )
}

function Renderer({ unit, ...props }) {
  if (!unit) return null;

  const level = unit.record.level ?? '?',
    exp = unit.record.exp ?? 0,
    hp = unit.hp ?? '?',
    maxHp = unit.record.stats.mhp ?? '?',
    movement = unit.movement ?? 0,
    stats = unit.getCombatStats(),
    atk = stats.might + (stats.isMagic ? stats.mag : stats.str);

  return (
    <div className="unit-panel__body" {...props}>
      <span className="body-left">
        <div className="hp"><strong>HP</strong> {hp} / {maxHp}</div>
        <div className="unit-class">{unit.record.class}</div>
        <div className="level">
          <span><strong>Lv.</strong> {level}</span>
          <span className="exp-container">
            <meter className="exp" max={100} value={exp}></meter>
          </span>
          <span className="move"><strong>Mov</strong> {movement}</span>
        </div>
      </span>
      <div className="body-middle">
        <ul className="stats">
          {StatRow(stats.isMagic ? "M.Atk" : "P.Atk", atk)}
          {StatRow("Spd", stats.aspd)}
          {StatRow("Hit", stats.hit)}
          {StatRow("Avd", stats.avd)}
          {StatRow("Def", stats.def)}
          {StatRow("Res", stats.res)}
        </ul>
      </div>
    </div>
  );
}

function UnitPanelBody({ unit }) {
  return <Renderer unit={unit} />
}

export default UnitPanelBody;