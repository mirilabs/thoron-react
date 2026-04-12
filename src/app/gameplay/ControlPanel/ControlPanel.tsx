import React, { useState } from "react";
import { IconButton, Tab, Tabs } from "@mui/material";
import useUIAction from "@/app/gameplay/utils/useUIAction";
import UnitIndexContainer from "./UnitIndex/UnitIndex";
import ChapterLog from "./ChapterLog";
import ChapterEdit from "./ChapterEdit/ChapterEdit";

enum ControlPanelTab {
  Units,
  Log,
  Edit
}

function ControlPanel({ show, setShow, isStatic = false }: { show: boolean, setShow: (show: boolean) => void, isStatic?: boolean }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    if (!show) {
      // if control panel is closed, switch to chosen tab and open it
      setTabIndex(value);
      setShow(true);
    }
    else if (value === tabIndex) {
      // if control panel is already open and same tab is clicked, close it
      if (!isStatic) setShow(false);
    }
    else {
      // switch to tab
      setTabIndex(value);
    }
  }

  useUIAction("cancel", () => {
    if (!isStatic) setShow(false);
  });
  useUIAction(
    "open_chapter_log",
    () => handleTabChange(null, ControlPanelTab.Log)
  );
  useUIAction(
    "open_character_detail",
    () => handleTabChange(null, ControlPanelTab.Units)
  );
  useUIAction(
    "open_settings",
    () => handleTabChange(null, ControlPanelTab.Edit)
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
          icon={<i className="fas fa-user" />}
          label="Units"
          value={ControlPanelTab.Units}
        />
        <Tab
          icon={<i className="fas fa-book" />}
          label="Log"
          value={ControlPanelTab.Log}
        />
        <Tab
          icon={<i className="fas fa-pen-to-square" />}
          label="Edit"
          value={ControlPanelTab.Edit}
        />
      </Tabs>
      <div className="flex-1 overflow-y-auto p-4">
        {tabIndex === ControlPanelTab.Units && <UnitIndexContainer />}
        {tabIndex === ControlPanelTab.Log && <ChapterLog />}
        {tabIndex === ControlPanelTab.Edit && <ChapterEdit />}
      </div>
      {!isStatic && (
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
      )}
    </div>
  )
}

export default ControlPanel;