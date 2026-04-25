import React from "react";

export default function About() {
  return (
    <div className={
      "max-w-[400px] flex flex-col gap-4 p-4 " +
      "border-l border-l-[var(--text-color)]"
    }>
      <h1 className="text-2xl font-bold mb-2">thoron</h1>
      <p>
        Thoron is a web-based simulation tool for a certain popular tactical
        RPG.
        You can create your own characters, items, and maps to play with.
      </p>
      <p>
        Currently the app is entirely local. All data is saved in your browser's
        storage (specifically IndexedDB), and will be lost if cleared.
      </p>
      <p>
        There are still missing/incomplete features and there may be bugs.
        Please understand.
      </p>
      <p>
        This is a solo, for-fun project and I am not affiliated with anyone.
      </p>
      <p>
        I hope you enjoy!
      </p>
    </div>
  );
}