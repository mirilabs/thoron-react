import React from 'react';
import { ActionResult, DeployedUnit } from 'thoron';
import DefeatIcon from './CombatLog/DefeatIcon';

interface LogStringProps {
  actionResult: ActionResult;
  unit?: DeployedUnit;
  itemName?: string;
  target?: DeployedUnit;
}

function LogString(props: LogStringProps) {
  let unitName = props.unit?.record?.name ?? "(UNNAMED)";
  let targetName = props.target?.record?.name ?? "(UNNAMED)";

  let predicate: React.ReactNode;
  switch (props.actionResult.action.command) {
    case "wait":
      predicate = " waited";
      break;
    case "attack":
      const { combatResult } = props.actionResult;
      const unitDefeated = combatResult.initiator.endHP === 0;
      const targetDefeated = combatResult.defender.endHP === 0;

      predicate = (<>
        {unitDefeated && <DefeatIcon />}
        {" attacked "}
        <strong>{targetName}</strong>
        {targetDefeated && <DefeatIcon />}
      </>);
      break;
    case "item":
      predicate = (<>
        {" used "}
        <strong>{props.itemName}</strong>
      </>);
      break;
    case "staff":
      predicate = (<>
        <strong>{unitName}</strong>
        {" used "}
        <strong>{props.itemName}</strong>
        {" on "}
        <strong>{targetName}</strong>
      </>);
      break;
    case "end_phase":
      const phaseChange = props.actionResult.events
        .find(e => e.type === "phase_change");
      const { turn, phase } = phaseChange.next;
      const phaseTitle = ({
        0: "Player Phase",
        1: "Enemy Phase",
        2: "Ally Phase"
      })[phase];

      return (
        <span>
          <strong>Turn {turn} - {phaseTitle}</strong>
        </span>
      )
    case "add_unit":
      return (
        <span>
          {"Unit added: "}
          <strong>{unitName}</strong>
        </span>
      );
    case "remove_unit":
      return (
        <span>
          {"Unit removed: "}
          <strong>{unitName}</strong>
        </span>
      );
  }

  return (
    <span>
      <strong>{unitName}</strong>
      {predicate}
    </span>
  )
}

export default LogString;