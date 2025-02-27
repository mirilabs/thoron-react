import React from 'react';
import { ActionResult, DeployedUnit } from 'thoron';

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
  switch(props.actionResult.action.command) {
    case "wait":
      predicate = " waited";
      break;
    case "attack":
      predicate = (<>
        {" attacked "}
        <strong>{targetName}</strong>
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
      return (
        <span>
          {/* TODO indicate which phase is ending */}
          <strong>End phase</strong>
        </span>
      )
  }

  return (
    <span>
      <strong>{unitName}</strong>
      {predicate}
    </span>
  )
}

export default LogString;