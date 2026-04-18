import React, { useContext, useEffect, useRef, useState } from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import LogActionResult from "./LogActionResult";
import ChapterLogControls from "./controls/ChapterLogControls";

function ChapterLog() {
  const { controller, chapter } = useContext(ThoronContext);
  const [history, setHistory] = useState([]);
  const logEndRef = useRef<HTMLDivElement>(null);


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

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [history]);

  const items = history.map((actionResult, i) => {
    return (
      <LogActionResult
        key={i}
        chapter={chapter}
        actionResult={actionResult} />
    );
  });

  return (
    <div className="flex flex-col gap-2 h-full">
      {items.length === 0 && <div>No history</div>}
      {items}
      <div ref={logEndRef} />
      <div className={
        "sticky absolute bottom-0 z-10 bg-[var(--bg-color)] " +
        "border-t border-[var(--text-color)] " +
        "p-4"
      }>
        <ChapterLogControls />
      </div>
    </div>
  )
}

export default ChapterLog;