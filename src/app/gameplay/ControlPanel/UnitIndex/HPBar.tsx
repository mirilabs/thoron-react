import React from "react";
import "./HPBar.scss";

const DEFAULT_WIDTH_SCALE = `${1 / 60 * 100}%`; // 60 hp = 100% width

function HPBar({
  maxHP,
  hp,
  damage = 0,
  widthScale = DEFAULT_WIDTH_SCALE
}: {
  maxHP: number;
  hp: number;
  damage?: number;
  widthScale?: string;
}) {
  const remainingHP = Math.max(hp - (damage ?? 0), 0);

  const percentWidth = (value: number) => {
    return { width: `${value * 100}%` }
  }

  return (
    <div className="hp-bar-container">
      <div className="hp-bar" style={{ width: `calc(${maxHP} * ${widthScale})` }}>
        <span className="hp-bar__remaining"
          style={percentWidth(remainingHP / maxHP)}>
        </span>
        <span className="hp-bar__damage"
          style={percentWidth(damage / maxHP)}>
        </span>
      </div>
    </div>
  )
}

export default HPBar;