import db from '@/data/db';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SaveState } from 'thoron';
import GameplayRoot from '../gameplay/GameplayRoot';

function ChapterShow() {
  const { id } = useParams();
  const [saveState, setSaveState] = useState<SaveState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    db.chapters.get(parseInt(id!)).then((chapter) => {
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
      setSaveState(chapter.save);
    });
    return () => { active = false; };
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!saveState) {
    return <div>Loading...</div>
  }

  return (
    <GameplayRoot saveState={saveState} />
  )
}

export default ChapterShow