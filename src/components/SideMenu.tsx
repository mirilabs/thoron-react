import Settings from "./Settings";
import "./SideMenu.scss";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useUIAction from "./utils/useUIAction";

function SideMenu({ onClose }: {
  onClose: () => void
}) {

  return (
    <div className="side-menu">
      <Tabs>
        <TabList>
          <Tab>Settings</Tab>
          {
            onClose !== undefined &&
            <span className="close-button" onClick={onClose}>
              <i className="fas fa-chevron-left" />
            </span>
          }
        </TabList>

        <TabPanel>
          <Settings />
        </TabPanel>
      </Tabs>
    </div>
  )
}

function SideMenuToggle() {
  const [show, setShow] = useState(false);
  useUIAction("cancel", () => setShow(false));

  if (show) return (
    <SideMenu onClose={() => setShow(false)} />
  )
  else return (
    <div className="side-menu-toggle" onClick={() => setShow(true)}>
      <i className="fas fa-chevron-right" />
    </div>
  );
}

export default SideMenu;
export {
  SideMenuToggle
}