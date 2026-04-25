import React from "react";
import { Link } from "react-router";
import db, { type Chapter, type Map } from "@/data/db";
import ConfirmButton from "../core/ConfirmButton";
import DeleteButton from "../core/DeleteButton";
import useBlobUrl from "../utils/useBlobUrl";

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const { save } = chapter;
  const background = (save.map as Map).background;
  const backgroundUrl = useBlobUrl(background);

  const handleCopy = async () => {
    const { id, ...rest } = chapter;
    await db.chapters.add({
      ...rest,
      name: `${rest.name} (Copy)`
    });
  };

  const handleDelete = async () => {
    await db.chapters.delete(chapter.id);
  };

  return (
    <div
      className={
        "bg-[var(--bg-color)] border-[var(--text-color-2)] border " +
        "hover:bg-[var(--bg-color-2)] hover:border-[var(--text-color)] " +
        "transition-colors duration-200 " +
        "rounded-lg p-4 " +
        "flex flex-row gap-4 items-center group"
      }>
      <Link
        to={`/campaigns/${chapter.campaignId}/chapters/${chapter.id}`}
        className="flex flex-row gap-4 flex-grow items-center overflow-hidden"
      >
        <div className="w-32 h-32 flex-shrink-0">
          {
            backgroundUrl && (
              <img src={backgroundUrl} alt=""
                className="w-full h-full object-contain rounded-lg"
              />
            )
          }
        </div>
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-xl font-bold truncate">{chapter.name}</h1>
          <p className="text-sm text-[var(--text-color-2)]">
            Turn {save.turn}
          </p>
        </div>
      </Link>

      <div className={
        "flex flex-col gap-1 opacity-0 group-hover:opacity-100 " +
        "transition-opacity"
      }>
        <ConfirmButton
          onConfirm={handleCopy}
          icon="fas fa-copy"
          variant="alert"
          message={`Make a copy of ${chapter.name}?`}
        />
        <DeleteButton
          onDelete={handleDelete}
          variant="alert"
          message={`Delete ${chapter.name}?`}
        />
      </div>
    </div>
  )
}