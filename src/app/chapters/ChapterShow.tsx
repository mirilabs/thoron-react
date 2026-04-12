import db from '@/data/db';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

function ChapterShow() {
  const { id } = useParams();

  useEffect(() => {
    db.chapters.get(parseInt(id)).then((chapter) => {
      console.log(chapter)
    })
  }, [id]);

  return (
    <div>
      <h1>Chapter Show</h1>
    </div>
  )
}

export default ChapterShow