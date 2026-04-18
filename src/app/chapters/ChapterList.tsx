import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db, { Map, type Chapter } from "@/data/db";
import ChapterCreate from "./ChapterCreate";
import { Link } from "react-router";

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const { save } = chapter;
  const background = (save.map as Map).background;
  const backgroundUrl = background ? URL.createObjectURL(background) : "";

  return (
    <Link to={`/campaigns/${chapter.campaignId}/chapters/${chapter.id}`}>
      <div
        className={
          "bg-[var(--bg-color-2)] border-[var(--text-color-2)] border " +
          "hover:bg-[var(--bg-color)] hover:border-[var(--text-color)] " +
          "transition-colors duration-200 " +
          "rounded-lg p-4 " +
          "flex flex-row gap-4"
        }>
        <div className="w-32 h-32">
          {
            backgroundUrl && (
              <img src={backgroundUrl} alt=""
                className="w-full h-full object-contain rounded-lg"
              />
            )
          }
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{chapter.name}</h1>
          <p className="text-sm text-[var(--text-color-2)]">
            Turn {save.turn}
          </p>
        </div>
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