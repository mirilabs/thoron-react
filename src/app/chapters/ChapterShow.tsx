import db, { Chapter } from '@/data/db';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GameplayRoot from '../gameplay/GameplayRoot';

function ChapterShow() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    db.chapters.get(parseInt(chapterId!)).then((chapter) => {
      if (!active) return;
      if (!chapter) {
        setError("Chapter not found");
        return;
      }
      if (!chapter.save) {
        setError("Chapter has no save data");
        return;
      }
      console.log("Loaded save:", chapter.save);
      setChapter(chapter);
    });
    return () => { active = false; };
  }, [chapterId]);

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!chapter || !chapterId) {
    return <div>Loading...</div>
  }

  return (
    <GameplayRoot
      campaignId={chapter.campaignId}
      chapterId={parseInt(chapterId!)}
      saveState={chapter.save}
    />
  )
}

export default ChapterShow