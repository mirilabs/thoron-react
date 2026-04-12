import db from '@/data/db';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SaveState } from 'thoron';

function ChapterShow() {
  const { id } = useParams();
  const [saveState, setSaveState] = useState<SaveState | null>(null);

  useEffect(() => {
    db.chapters.get(parseInt(id)).then((chapter) => {
      console.log("Loaded save:", chapter.save);
      setSaveState(chapter.save);
    })
  }, [id]);

  return (
    <div>
      <h1>Chapter Show</h1>
    </div>
  )
}

export default ChapterShow