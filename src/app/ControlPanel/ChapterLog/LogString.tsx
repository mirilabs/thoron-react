import React from 'react';
import { Command } from 'thoron';

interface LogStringProps {
  command: Command;
  unitName: string;
  itemName?: string;
  targetName?: string;
}

function LogString(props: LogStringProps) {
  let predicate: React.ReactNode;
  switch(props.command) {
    case "wait":
      predicate = " waited";
      break;
    case "attack":
      predicate = (<>
        {" attacked "}
        <strong>{props.targetName}</strong>
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
        {" used "}
        <strong>{props.itemName}</strong>
        {" on "}
        <strong>{props.targetName}</strong>
      </>);
      break;
  }

  return (
    <span>
      <strong>{props.unitName}</strong>
      {predicate}
    </span>
  )
}

export default LogString;