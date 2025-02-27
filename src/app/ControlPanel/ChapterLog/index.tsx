import React, { useContext, useEffect, useState } from "react";
import ThoronContext from "@/app/ThoronContext";
import LogItem from "./LogItem";
import ChapterLogControls from "./ChapterLogControls";

function ChapterLog() {
  const { controller, chapter } = useContext(ThoronContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (controller) {
      setHistory(controller.save().history);

      const unsubscribe = controller.subscribe((res) => {
        setHistory(history => {
          return [ ...history, res ];
        });
      });
      
      return unsubscribe;
    }
  }, [controller]);

  const items = history.map((actionResult, i) => {
    return (
      <LogItem
        key={i}
        chapter={chapter}
        actionResult={actionResult}  />
    );
  });

  return (
    <div className="chapter-log">
      <ChapterLogControls />
      {items.length === 0 && <div>No history</div>}
      {items}
    </div>
  )
}

export default ChapterLog;