import "./ControlPanel.scss";
import "react-tabs/style/react-tabs.css";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UnitDetail from "./UnitDetail";
import Settings from "components/ControlPanel/Settings";
import useUIAction, { useUIEmitter } from "components/utils/useUIAction";

function ControlPanel({ show, setShow }) {
  const [tabIndex, setTabIndex] = useState(0);

  const toggleTab = index => {
    if (!show) {
      // if control panel is closed, open it and switch to chosen tab
      setShow(true);
      setTabIndex(index);
    }
    else {
      // switch to tab
      if (index !== tabIndex) {
        setTabIndex(index);
      }
      // or close control panel if already on this tab
      else {
        setShow(false);
      }
    }
  }

  useUIAction("open_control_panel", () => setShow(true));
  
  useUIAction("cancel", () => setShow(false));

  useUIAction("open_character_detail", () => {
    toggleTab(0);
  });

  return (
    <>
      <Tabs selectedIndex={tabIndex} onSelect={index => { setTabIndex(index) }}>
        <TabPanel>
          <UnitDetail />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>

        <TabList>
          <Tab>Character</Tab>
          <Tab>Options</Tab>
        </TabList>
      </Tabs>
      <button className="control-panel-toggle" onClick={() => setShow(false)}>
        <i className="fas fa-x" />
      </button>
    </>
  )
}

function ControlPanelOpener() {
  let open = useUIEmitter("open_control_panel");
  return (
    <button className="control-panel-toggle" onClick={open}>
      <i className="fas fa-bars" />
    </button>
  )
}

export default ControlPanel;
export {
  ControlPanelOpener
}