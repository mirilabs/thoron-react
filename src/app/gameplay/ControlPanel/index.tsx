import React, { useState } from "react";
import ControlPanel from "./ControlPanel";

function ControlPanelContainer({ variant = "overlay" }: {
  variant?: "overlay" | "static"
}) {
  const [show, setShow] = useState(false);

  const isStatic = variant === "static";

  const containerClasses = isStatic ? (
    "bg-[var(--bg-color)] " +
    "relative w-full h-full z-50"
  ) : (
    "bg-[var(--bg-color)]/80 backdrop-blur-sm " +
    "absolute bottom-0 left-0 w-full h-full " +
    "transition-transform duration-300 ease-in-out transform " +
    `${show ? "translate-y-0" : "translate-y-full"} z-50`
  );

  return (
    <div className={containerClasses}>
      <ControlPanel show={isStatic || show} setShow={setShow} isStatic={isStatic} />
    </div>
  );
}

export default ControlPanelContainer;