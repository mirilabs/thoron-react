import React, { useState } from "react";
import { IconButton, Tab, Tabs } from "@mui/material";
import Settings from "./Settings";
import useUIAction from "@/app/gameplay/utils/useUIAction";
import UnitIndexContainer from "./UnitIndex/UnitIndex";
import ChapterLog from "./ChapterLog";

enum ControlPanelTab {
  ChapterLog,
  UnitIndex,
  Settings
}

function ControlPanel({ show, setShow }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    if (!show) {
      // if control panel is closed, switch to chosen tab and open it
      setTabIndex(value);
      setShow(true);
    }
    else if (value === tabIndex) {
      // if control panel is already open and same tab is clicked, close it
      setShow(false);
    }
    else {
      // switch to tab
      setTabIndex(value);
    }
  }

  useUIAction("cancel", () => setShow(false));
  useUIAction(
    "open_chapter_log",
    () => handleTabChange(null, ControlPanelTab.ChapterLog)
  );
  useUIAction(
    "open_character_detail",
    () => handleTabChange(null, ControlPanelTab.UnitIndex)
  );
  useUIAction(
    "open_settings",
    () => handleTabChange(null, ControlPanelTab.Settings)
  );

  return (
    <div className={
      "flex flex-col w-full h-full relative"
    }>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Control panel"
        variant="fullWidth"
        className="w-full control-panel-tabs"
      >
        <Tab
          icon={<i className="fas fa-book" />}
          label="Log"
          value={ControlPanelTab.ChapterLog}
        />
        <Tab
          icon={<i className="fas fa-user" />}
          label="Character"
          value={ControlPanelTab.UnitIndex}
        />
        <Tab
          icon={<i className="fas fa-cog" />}
          label="Settings"
          value={ControlPanelTab.Settings}
        />
      </Tabs>
      <div className="flex-1 overflow-y-auto">
        {tabIndex === ControlPanelTab.ChapterLog && <ChapterLog />}
        {tabIndex === ControlPanelTab.UnitIndex && <UnitIndexContainer />}
        {tabIndex === ControlPanelTab.Settings && <Settings />}
      </div>
      <div className={
        "absolute right-0 bottom-0 left-auto " +
        "min-w-12 max-w-16 aspect-square w-[15%]"
      }>
        <IconButton
          onClick={() => setShow(false)}
          className="w-full h-full"
        >
          <i className="fas fa-x" />
        </IconButton>
      </div>
    </div>
  )
}

export default ControlPanel;