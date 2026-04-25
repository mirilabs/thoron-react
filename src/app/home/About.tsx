import React from "react";
import chudlingImg from "@/assets/chudling.png";

export default function About() {
  return (
    <div className="max-w-[400px] flex flex-col">
      <div className={
        "flex flex-col gap-4 p-4 border-l border-l-[var(--text-color)]"
      }>
        <h1 className="text-2xl font-bold mb-2">thoron</h1>
        <p>
          Thoron is a web-based simulation tool for a certain popular tactical
          RPG.
          You can create your own characters, maps, and scenarios to play with.
        </p>
        <p>
          Currently the app is entirely local. All data is saved in your browser's
          storage (specifically IndexedDB), and will be lost if cleared.
        </p>
        <p>
          This is a solo, for-fun project.
          There are still missing/incomplete features and there may be bugs.
          Please understand.
        </p>
        <p>
          I hope you enjoy!
        </p>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={chudlingImg}
          className="w-[192px] h-[192px] object-contain"
        />
      </div>
    </div>
  );
}