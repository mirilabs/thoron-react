import "./CombatLog.scss";
import React, { useState } from "react";
import {
  ActionResult,
  DeployedUnit
} from "thoron";
import CombatLogDetail from "./CombatLogDetail";
import CombatLogHeader from "./CombatLogHeader";

function CombatLog({ unit, target, result }: {
  unit: DeployedUnit,
  target: DeployedUnit,
  result: ActionResult
}) {
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => setShowDetail(!showDetail);

  return (
    <>
      <CombatLogHeader
        unit={unit}
        target={target}
        result={result}
        toggleDetail={toggleDetail} />
      {
        showDetail &&
        <CombatLogDetail
          unit={unit}
          target={target}
          result={result} />
      }
    </>
  )
}

export default CombatLog;