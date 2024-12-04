import "./index.scss";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ControlPanel from "./ControlPanel";

function ControlPanelContainer() {
  const [show, setShow] = useState(false);

  const nodeRef = useRef();

  const transitionProps = {
    in: show,
    timeout: 200,
    classNames: 'control-panel',
    nodeRef,
    onEntered() {

    }
  }

  return (
    <>
      <CSSTransition {...transitionProps}>
        <div className="control-panel" ref={nodeRef}>
          <ControlPanel show={show} setShow={setShow} />
        </div>
      </CSSTransition>
    </>
  )
}

export default ControlPanelContainer;