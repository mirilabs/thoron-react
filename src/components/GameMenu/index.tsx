import useUIAction from "components/utils/useUIAction";
import "./GameMenu.scss";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import GameMenuToggle from "./GameMenuToggle";
import GameMenu from "./GameMenu";

function GameMenuContainer() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  const nodeRef = useRef();

  useUIAction("cancel", () => {
    setShow(false);
  });

  const transitionProps = {
    in: show,
    timeout: 200,
    classNames: 'game-menu',
    nodeRef
  }

  return (
    <div className="game-menu-container">
      <CSSTransition {...transitionProps}>
        <div className="game-menu" ref={nodeRef}>
          <GameMenu />
        </div>
      </CSSTransition>
      <GameMenuToggle onClick={toggle} />
    </div>
  )
}

export default GameMenuContainer;