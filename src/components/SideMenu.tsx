import Settings from "./Settings";
import "./SideMenu.scss";
import React, { useState } from "react";

function SideMenu({ onClose }: {
  onClose: () => void
}) {

  return (
    <div className="side-menu">
      <Settings />
    </div>
  )
}

function SideMenuToggle() {
  const [show, setShow] = useState(false);

  if (show) return (
    <SideMenu onClose={() => setShow(false)} />
  )
  else return (
    <div className="side-menu" onClick={() => setShow(true)}>
      {"<<"}
    </div>
  );
}

export default SideMenu;
export {
  SideMenuToggle
}