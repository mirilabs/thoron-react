import "./ItemDetail.scss";
import React from "react";
import { ItemRecord, StaffStats, WeaponStats } from "thoron";
import ItemIcon from "./ItemIcon";

interface ItemDetailProps {
  record: ItemRecord;
}

function ItemDetail({ record }: ItemDetailProps) {
  const {
    description,
    type,
    stats
  } = record;

  return (
    <div className="item-detail">
      <hr />
      <div className="type">
        {
          type === "weapon" ?
            `weapon: ${(record.stats as WeaponStats).weaponType}` :
            type
        }
      </div>
      <div className="description">{description}</div>
      {
        type === "weapon" &&
        <div className="stats">
          <WeaponStatBlock stats={stats as WeaponStats} />
        </div>
      }
      {
        type === "staff" &&
        <div className="stats">
          <StaffStatBlock stats={stats as StaffStats} />
        </div>
      }
    </div>
  )
}

function StatName({ children }: { children: React.ReactNode }) {
  return <span className="stat-name">{children}</span>
}

function printRange(minRange: number, maxRange: number) {
  if (minRange === maxRange) {
    return `${minRange}`;
  } else {
    return `${minRange} - ${maxRange}`;
  }
}

function WeaponStatBlock({ stats }: { stats: WeaponStats }) {
  return (
    <div className="weapon-stats">
      <div><StatName>Might:</StatName> {stats.might}</div>
      <div><StatName>Hit:</StatName> {stats.hit}</div>
      <div><StatName>Crit:</StatName> {stats.crit}</div>
      <div>
        <StatName>Range:</StatName> {printRange(stats.minRange, stats.maxRange)}
      </div>
    </div>
  )
}

function StaffStatBlock({ stats }: { stats: StaffStats }) {
  return (
    <div className="staff-stats">
      <div>
        <StatName>Range:</StatName> {printRange(stats.minRange, stats.maxRange)}
      </div>
    </div>
  )
}

export default ItemDetail;