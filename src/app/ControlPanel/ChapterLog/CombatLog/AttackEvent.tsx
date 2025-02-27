import React from 'react';
import { AttackEvent as IAttackEvent } from 'thoron';
import { Team } from "thoron/dist/teams";
import DefeatIcon from './DefeatIcon';

function AttackEvent({ event, direction, team }: {
  event: IAttackEvent,
  direction: number,
  team: Team
}) {
  const iconClass = (direction > 0 ? "fas fa-arrow-right" : "fas fa-arrow-left")
    + ` team-${team}`;

  let damage = event.didHit ? event.damage : "MISS";
  if (event.didCrit) damage = `CRIT ${damage}`;
  
  const elements = [
    <i className={iconClass} key="arrow" />,
    <span key="value">{damage}</span>
  ]

  if (event.didDefeatFoe) elements.push(<DefeatIcon key="defeat" />)
  
  if (direction < 0) elements.reverse();

  return (
    <li className="combat-detail__attack-event">
      {elements}
    </li>
  );
}

export default AttackEvent;