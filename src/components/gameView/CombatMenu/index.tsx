import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./CombatMenu.scss";
import CombatMenu from "./CombatMenu";
import CombatStartHandler from "./CombatStartHandler";

function AttackMenuContainer(props: {
  display: boolean
}) {
  const nodeRef = useRef();

  let transitionProps = {
    in: props.display,
    timeout: 100,
    nodeRef
  }

  return (
    <CSSTransition {...transitionProps}>
      <div className="attack-menu" ref={nodeRef}>
        <CombatMenu />
        <CombatStartHandler enabled={props.display} />
      </div>
    </CSSTransition>
  )
}

export default AttackMenuContainer;