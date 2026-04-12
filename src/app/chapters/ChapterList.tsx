import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db, { type Chapter } from "@/data/db";
import ChapterCreate from "./ChapterCreate";
import { Link } from "react-router";

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <Link to={`/chapters/${chapter.id}`}>
      <div
        className={
          "bg-[var(--bg-color)] border border-[var(--text-color)] " +
          "rounded-lg p-4 " +
          "flex flex-col"
        }>
        <h1 className="text-xl font-bold">{chapter.name}</h1>
      </div>
    </Link>
  )
}

function ChapterList({ campaignId }: { campaignId: number }) {
  const chapters = useLiveQuery(
    () => db.chapters.where({ campaignId }).toArray(),
    [campaignId]
  );

  return (
    <div className={
      "bg-[var(--bg-color)] border border-[var(--text-color)] " +
      "rounded-lg p-4 " +
      "flex flex-col gap-4"
    }>
      <h1 className="text-xl font-bold">Chapters</h1>
      {chapters?.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} />
      ))}
      <ChapterCreate campaignId={campaignId} />
    </div>
  )
}

export default ChapterList;