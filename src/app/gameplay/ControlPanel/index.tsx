import React, { useState } from "react";
import ControlPanel from "./ControlPanel";

function ControlPanelContainer({ variant = "overlay" }: { variant?: "overlay" | "static" }) {
  const [show, setShow] = useState(false);

  const isStatic = variant === "static";

  const containerClasses = "bg-[var(--bg-color)] " + (
    isStatic
      ? "control-panel relative w-full h-full z-50"
      : (
        `control-panel absolute bottom-0 left-0 w-full h-full ` +
        `transition-transform duration-300 ease-in-out transform ` +
        `${show ? "translate-y-0" : "translate-y-full"} z-50`
      )
  );

  return (
    <div className={containerClasses}>
      <ControlPanel show={isStatic || show} setShow={setShow} isStatic={isStatic} />
    </div>
  );
}

export default ControlPanelContainer;