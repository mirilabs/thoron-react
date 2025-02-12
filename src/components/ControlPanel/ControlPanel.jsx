import "./ControlPanel.scss";
import "react-tabs/style/react-tabs.css";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Settings from "components/ControlPanel/Settings";
import useUIAction from "components/utils/useUIAction";
import UnitIndexContainer from "./UnitIndex";
import ChapterLog from "./ChapterLog";

function ControlPanel({ show, setShow }) {
  const [tabIndex, setTabIndex] = useState(0);

  const toggleTab = index => {
    if (!show) {
      // if control panel is closed, switch to chosen tab and open it
      setTabIndex(index);
      setShow(true);
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
  useUIAction("open_chapter_log", () => toggleTab(0));
  useUIAction("open_character_detail", () => toggleTab(1));
  useUIAction("open_settings", () => toggleTab(2));

  return (
    <>
      <Tabs selectedIndex={tabIndex} onSelect={index => { setTabIndex(index) }}>
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

export default ControlPanel;