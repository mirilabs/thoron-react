import "./CombatEvents.scss";
import React from 'react';
import { ChapterEvent, DeployedUnit } from 'thoron';
import AttackEvent from "./AttackEvent";
import { ICombatPreview } from "@/app/GameView/ActionMenu/CombatMenu/CombatPreviewSide";

function CombatEvents({
  events,
  leftUnit, 
  rightUnit,
  leftData,
  rightData
}: {
  events: ChapterEvent[]
  leftUnit: DeployedUnit,
  rightUnit: DeployedUnit,
  leftData: ICombatPreview,
  rightData: ICombatPreview
}) {  
  let attacks = events.filter(event => event.type === "combat_attack")
    .map((event, i) => {
      const leftIsAttacking = event.unitId === leftUnit.id;

      return (
        <AttackEvent key={i}
          event={event}
          direction={leftIsAttacking ? 1 : -1}
          team={leftIsAttacking ? leftUnit.getTeam() : rightUnit.getTeam()} />
      )
    })
  
  return (
    <ul className="combat-detail__events">
      <div className="hp">
        <span className="hp-value">{leftData.startHP}</span>
        <i className="fas fa-heart" />
        <span className="hp-value">{rightData.startHP}</span>
      </div>
      {attacks}
      <div className="hp">
        <span className="hp-value">{leftData.endHP}</span>
        <i className="fas fa-heart" />
        <span className="hp-value">{rightData.endHP}</span>
      </div>
    </ul>
  )
}

export default CombatEvents;