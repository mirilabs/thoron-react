import React, { useState } from "react";
import ControlPanel from "./ControlPanel";

function ControlPanelContainer() {
  const [show, setShow] = useState(false);

  return (
    <div
      className={
        `control-panel absolute bottom-0 left-0 w-full h-full ` +
        `bg-[var(--bg-color)] ` +
        `transition-transform duration-300 ease-in-out transform ` +
        `${show ? "translate-y-0" : "translate-y-full"} z-50`
      }
    >
      <ControlPanel show={show} setShow={setShow} />
    </div>
  );
}

export default ControlPanelContainer;