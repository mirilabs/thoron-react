import React, { useRef, useState } from "react";
import useUIAction, { useUIEmitter } from "../utils/useUIAction";
import { CSSTransition } from "react-transition-group";
import "./ActionMenu.scss";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ActionButton({ unitAction, isSelectable=true }: {
  unitAction: string,
  isSelectable?: boolean
}) {
  const emitAction = useUIEmitter("select_action");

  const handleClick = () => {
    if (isSelectable) emitAction(unitAction);
  }

  return (
    <li onClick={handleClick} className={isSelectable ? "" : "faded"}>
      {capitalize(unitAction)}
    </li>
  )
}

function ActionMenu({ actions, possibleActions }: {
  actions: string[],
  possibleActions: { [K: symbol]: any }
}) {
  const buttons = actions.map((action) => {
    if (possibleActions[action] !== undefined) {
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

function ActionMenuToggle() {
  const [show, setShow] = useState(false);
  const [possibleActions, setPossibleActions] = useState({});
  const nodeRef = useRef();

  let selectAction = useUIEmitter("select_action");
  
  useUIAction("open_action_menu", (actions) => {
    setPossibleActions(actions);
    setShow(true)
  });

  useUIAction("close_action_menu", () => setShow(false));

  const handleClose = () => {
    setShow(false);
    selectAction("cancel");
  }
  useUIAction("cancel", handleClose);
  
  let transitionProps = {
    in: show,
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