import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import StaffMenu from "./StaffMenu";
import "./StaffMenu.scss";

function StaffMenuContainer(props: {
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
      <div className="action-confirm-menu staff-menu" ref={nodeRef}>
        <StaffMenu />
      </div>
    </CSSTransition>
  )
}

export default StaffMenuContainer;