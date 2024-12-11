import React, { useRef } from "react";
import { useUIEmitter } from "../../utils/useUIAction";
import { CSSTransition } from "react-transition-group";
import "./ActionSelectMenu.scss";
import { useSelectedUnit } from "components/utils/useUnit";
import { useControllerSelector } from "components/utils/reduxHooks";
import { useDispatch } from "react-redux";
import { actionSelected } from "shared/store";
import { DeployedUnit } from "thoron";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ActionButton({ unitAction, isSelectable=true }: {
  unitAction: string,
  isSelectable?: boolean
}) {
  const dispatch = useDispatch();
  const emitSignal = useUIEmitter("select_action");

  const handleClick = () => {
    if (isSelectable) {
      dispatch(actionSelected(unitAction));
      emitSignal(unitAction);
    }
  }

  return (
    <li onClick={handleClick} className={isSelectable ? "" : "faded"}>
      {capitalize(unitAction)}
    </li>
  )
}

function ActionMenu({ actions, possibleActions }: {
  actions: string[],
  possibleActions: { [action: string]: any }
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

const leftActions = [
  "attack",
  "items",
  "wait"
]

const rightActions = [
  "staff",
  "trade",
  "rally"
]

function ActionMenuToggle(props: {
  display: boolean
}) {
  const nodeRef = useRef();

  let unit: DeployedUnit = useSelectedUnit();
  let destination = useControllerSelector(
    state => state.pendingMove.destination
  );
  let possibleActions = unit && destination ?
    unit.getPossibleActions(destination) :
    [];

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