import React, { useRef } from "react";
import { useUIEmitter } from "../../utils/useUIAction";
import { CSSTransition } from "react-transition-group";
import "./ActionSelectMenu.scss";
import { useSelectedTarget, useSelectedUnit } from "@/app/gameplay/utils/useUnit";
import { useControllerSelector } from "@/app/gameplay/utils/reduxHooks";
import { Command, DeployedUnit } from "thoron";
import WaitButton from "./WaitButton";
import ActionSelectButton from "./ActionSelectButton";

type PossibleActions = Partial<{ [action in Command]: any }>;

function ActionMenu({ actions, possibleActions }: {
  actions: Command[],
  possibleActions: PossibleActions
}) {
  const buttons = actions.map((action) => {
    if (possibleActions[action]) {
      return <ActionSelectButton unitAction={action} key={action} />
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

function ActionSelectMenu({ show }: {
  show: boolean
}) {
  const nodeRef = useRef();

  let unit: DeployedUnit = useSelectedUnit();
  let target: DeployedUnit = useSelectedTarget()

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
    in: show,
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

export default ActionSelectMenu;