import "./CombatLog.scss";
import React, { useState } from "react";
import { ActionResult, DeployedUnit } from "thoron";
import Forecast from "./Forecast";

function CombatLog({ unit, target, result }: {
  unit: DeployedUnit,
  target: DeployedUnit,
  result: ActionResult
}) {
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => setShowDetail(!showDetail);

  return (
    <>
      <div className="combat-header" onClick={toggleDetail}>
        {unit.record.name} attacked {target.record.name}
      </div>
      {
        showDetail &&
        <CombatLogDetail unit={unit} target={target} result={result} />
      }
    </>
  )
}

function CombatLogDetail({ unit, target, result }: {
  unit: DeployedUnit,
  target: DeployedUnit,
  result: ActionResult
}) {

  return (
    <div className="combat-detail">
      <Forecast unit={unit} target={target} data={result.forecast} />
    </div>
  )
}

export default CombatLog;