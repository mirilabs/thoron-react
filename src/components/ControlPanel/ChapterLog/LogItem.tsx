import "./LogItem.scss";
import React from "react";
import Chapter, { ActionResult, Command, DeployedUnit, IAction } from "thoron";
import LogString from "./LogString";
import CombatLogDetail from "./CombatLog/CombatLogDetail";

interface LogItemProps {
  actionResult: ActionResult,
  chapter: Chapter
}

function LogItem({ actionResult, chapter }: LogItemProps) {
  const action = actionResult.action as IAction;
  const unit = chapter.getUnitById(action.unitId);
  const target = action.targetId ? chapter.getUnitById(action.targetId) : null;

  const [showDetail, setShowDetail] = React.useState(false);
  const toggleDetail = () => setShowDetail(!showDetail);
  const DetailsComponent = logDetailMap[action.command];

  return (
    <div className="chapter-log__entry">
      <div className="chapter-log__entry-title">
        <img src={unit.record["sprite"]}
          alt={`[${unit.record.name} sprite]`}
          className="sprite"/>
        <LogString unitName={unit.record.name}
          targetName={target?.record.name}
          command={action.command} />
        {
          // for certain action types, render detail toggle button
          DetailsComponent &&
          <button className="toggle-detail" onClick={toggleDetail}>
            {
              showDetail ?
                <i className="fas fa-chevron-up" /> :
                <i className="fas fa-chevron-down" />
            }
          </button>
        }
      </div>
      {
        // for certain action types, render details if toggle has been hit
        DetailsComponent && showDetail &&
        <DetailsComponent
          unit={unit}
          target={target}
          actionResult={actionResult} />
      }
    </div>
  );
}

interface LogDetailProps {
  unit: DeployedUnit,
  target?: DeployedUnit,
  actionResult: ActionResult
}

const logDetailMap: Partial<{[K in Command]: React.FC<LogDetailProps>}> = {
  "attack": CombatLogDetail
}

export default LogItem;
export { LogDetailProps }