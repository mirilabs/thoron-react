import React, { useRef } from "react";
import { useUIEmitter } from "../../utils/useUIAction";
import { CSSTransition } from "react-transition-group";
import "./ActionSelectMenu.scss";
import { useSelectedUnit } from "components/utils/useUnit";
import { useControllerSelector } from "components/utils/reduxHooks";
import { Command, DeployedUnit } from "thoron";
import ActionButton from "./ActionButton";
import WaitButton from "./WaitButton";

function ActionMenu({ actions, possibleActions }: {
  actions: Command[],
  possibleActions: Partial<{ [action in Command]: any }>
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
  let destination = useControllerSelector(
    state => state.pendingMove.destination
  );
  let possibleActions = (unit && destination) ?
    unit.getPossibleActions(destination) :
    {};

  const handleClose = useUIEmitter("cancel");
  
  let transitionProps = {
    in: props.display,
    timeout: 100,
    nodeRef
  }

  return (
    <CSSTransition {...transitionProps}>
      <div className="unit-action-menu" ref={nodeRef}>
        <ul className="unit-action-menu__left">
          <ActionMenu actions={leftActions}
            possibleActions={possibleActions} />
          <WaitButton />
        </ul>
        <ul className="unit-action-menu__right">
          <ActionMenu actions={rightActions}
            possibleActions={possibleActions} />
          <li onClick={handleClose}>Cancel</li>
        </ul>
      </div>
    </CSSTransition>
  )
}

export default ActionMenuToggle;