import "./ControlPanel.scss";
import "react-tabs/style/react-tabs.css";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Settings from "components/ControlPanel/Settings";
import useUIAction, { useUIEmitter } from "components/utils/useUIAction";
import UnitIndexContainer from "./UnitIndex";
import ChapterLog from "./ChapterLog";
import ChapterMenu from "./ChapterMenu";

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
    }
  }

  useUIAction("open_control_panel", () => setShow(true));
  
  useUIAction("cancel", () => setShow(false));

  useUIAction("open_character_detail", () => {
    toggleTab(2);
  });

  return (
    <>
      <Tabs selectedIndex={tabIndex} onSelect={index => { setTabIndex(index) }}>
        <TabPanel>
          <ChapterMenu />
        </TabPanel>
        <TabPanel>
          <ChapterLog />
        </TabPanel>
        <TabPanel>
          <UnitIndexContainer />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>

        <TabList>
          <Tab>Menu</Tab>
          <Tab>Log</Tab>
          <Tab>Character</Tab>
          <Tab>Settings</Tab>
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