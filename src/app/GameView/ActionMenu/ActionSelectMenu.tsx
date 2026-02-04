import React, { useRef } from "react";
import { useUIEmitter } from "../../utils/useUIAction";
import { CSSTransition } from "react-transition-group";
import "./ActionSelectMenu.scss";
import useUnit, { useSelectedUnit } from "@/app/utils/useUnit";
import { useControllerSelector } from "@/app/utils/reduxHooks";
import { Command, DeployedUnit } from "thoron";
import ActionButton from "./ActionButton";
import WaitButton from "./WaitButton";

type PossibleActions = Partial<{ [action in Command]: any }>;

function ActionMenu({ actions, possibleActions }: {
  actions: Command[],
  possibleActions: PossibleActions
}) {
  const buttons = actions.map((action) => {
    if (possibleActions[action]) {
      return <ActionButton unitAction={action} key={action} />
    }
    else return null;
  });

  return (
    <>
      {buttons}
    </>
  );
}

const leftActions: Command[] = [
  "attack",
  "item"
]

const rightActions: Command[] = [
  "staff",
  "trade"
]

function ActionMenuToggle(props: {
  display: boolean
}) {
  const nodeRef = useRef();

  let unit: DeployedUnit = useSelectedUnit();

  let targetId: string = useControllerSelector(
    state => state.pendingMove.targetId
  );
  let target = useUnit(targetId);

  let destination = useControllerSelector(
    state => state.pendingMove.destination
  );

  let possibleActions: PossibleActions = {};
  if (unit && destination) {
    if (target) {
      let actions = unit.getPossibleActionsTo(destination, target);
      actions.forEach(action => {
        possibleActions[action] = true;
      });
    }
    else {
      possibleActions = unit.getPossibleActions(destination);
    }
  }

  const handleClose = useUIEmitter("cancel");
  
  let transitionProps = {
    in: props.display,
    timeout: 100,
    nodeRef
  }

  return (
    <CSSTransition {...transitionProps}>
      <div className="action-select-menu" ref={nodeRef}>
        <ul className="action-select-menu__left">
          <ActionMenu actions={leftActions}
            possibleActions={possibleActions} />
          <WaitButton />
        </ul>
        <ul className="action-select-menu__right">
          <ActionMenu actions={rightActions}
            possibleActions={possibleActions} />
          <li onClick={handleClose}>Cancel</li>
        </ul>
      </div>
    </CSSTransition>
  )
}

export default ActionMenuToggle;