import React from "react";
import { CombatForecast, Unit } from "thoron";

function Forecast({ unit, target, data }: {
  unit: Unit,
  target: Unit,
  data: CombatForecast
}) {
  const { initiator, defender } = data;

  return (
    <table className="forecast">
      <tr>
        <th>{unit.record.name}</th>
        <th></th>
        <th>{target.record.name}</th>
      </tr>
      {
        // todo add weapon info
      }
      <tr>
        <th>{initiator.damage}</th>
        <th>Dmg</th>
        <th>{defender.damage}</th>
      </tr>
      <tr>
        <th>{initiator.hit}</th>
        <th>Hit</th>
        <th>{defender.hit}</th>
      </tr>
      <tr>
        <th>{initiator.crit}</th>
        <th>Crit</th>
        <th>{defender.crit}</th>
      </tr>
    </table>
  )
}

export default Forecast;