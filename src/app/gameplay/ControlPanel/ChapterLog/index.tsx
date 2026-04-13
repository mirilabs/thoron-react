import React, { useContext, useEffect, useState } from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import LogActionResult from "./LogActionResult";
import ChapterLogControls from "./ChapterLogControls";

function ChapterLog() {
  const { controller, chapter } = useContext(ThoronContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (controller) {
      setHistory(controller.save().history);

      const unsubscribe = controller.subscribe((res) => {
        setHistory(history => {
          return [...history, res];
        });
      });

      return unsubscribe;
    }
  }, [controller]);

  const items = history.map((actionResult, i) => {
    return (
      <LogActionResult
        key={i}
        chapter={chapter}
        actionResult={actionResult} />
    );
  });

  return (
    <div className="flex flex-col gap-2">
      <ChapterLogControls />
      {items.length === 0 && <div>No history</div>}
      {items}
    </div>
  )
}

export default ChapterLog;