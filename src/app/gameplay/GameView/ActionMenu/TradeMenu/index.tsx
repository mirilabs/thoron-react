import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import TradeMenu from "./TradeMenuComponent";
import "./TradeMenu.scss";

function TradeMenuContainer(props: {
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
      <div className="action-confirm-menu" ref={nodeRef}>
        <TradeMenu />
      </div>
    </CSSTransition>
  )
}

export default TradeMenuContainer;
