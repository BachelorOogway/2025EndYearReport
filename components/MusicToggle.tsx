"use client";
import { useEffect, useState } from "react";

export default function MusicToggle() {
  const [playMusic, setPlayMusic] = useState(true);

  useEffect(() => {
    const bgm = document.getElementById("bgm") as HTMLAudioElement | null;
    if (!bgm) return;
    if (playMusic) {
      bgm.play().catch(() => {});
    } else {
      bgm.pause();
    }
  }, [playMusic]);

  return (
    <div className="music-icon">
      {playMusic ? (
        <img
          src="https://i.boatonland.com/report2024/assets/imgs/icons/music.webp"
          alt="music on"
          onClick={() => setPlayMusic(false)}
        />
      ) : (
        <img
          src="https://i.boatonland.com/report2024/assets/imgs/icons/music-off.webp"
          alt="music off"
          onClick={() => setPlayMusic(true)}
        />
      )}
    </div>
  );
}

