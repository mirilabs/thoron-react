import useUIAction from "components/utils/useUIAction";
import "./GameMenu.scss";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import GameMenuToggle from "./GameMenuToggle";
import GameMenu from "./GameMenu";
import useOutsideClickHandler from "components/utils/useOutsideClickHandler";

function GameMenuContainer() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  const nodeRef = useRef();

  useUIAction("cancel", () => setShow(false));
  
  const rootRef = React.useRef(null);
  useOutsideClickHandler(rootRef, () => setShow(false));

  const transitionProps = {
    in: show,
    timeout: 200,
    classNames: 'game-menu',
    nodeRef
  }

  return (
    <div className="game-menu-container" ref={rootRef}>
      <CSSTransition {...transitionProps}>
        <div className="game-menu" ref={nodeRef}>
          <GameMenu handleClose={() => setShow(false)} />
        </div>
      </CSSTransition>
      <GameMenuToggle onClick={toggle} />
    </div>
  )
}

export default GameMenuContainer;