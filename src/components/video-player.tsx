"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const R2_BASE = "https://pub-fd739a0187554bf49a5a791d47659975.r2.dev";

const RESOLUTIONS = [
  { label: "1080p", src: `${R2_BASE}/vsl_landing-1080p.mp4` },
  { label: "720p", src: `${R2_BASE}/vsl_landing-720p.mp4` },
  { label: "480p", src: `${R2_BASE}/vsl_landing-480p.mp4` },
];

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  // Switch to 480p on mobile after mount to avoid hydration mismatch
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCurrent(2);
      const video = videoRef.current;
      if (video) video.src = RESOLUTIONS[2].src;
    }
  }, []);

  const switchResolution = useCallback(
    (index: number) => {
      if (index === current) {
        setOpen(false);
        return;
      }

      const video = videoRef.current;
      if (!video) return;

      const time = video.currentTime;
      const wasPlaying = !video.paused;

      setCurrent(index);
      setOpen(false);

      video.src = RESOLUTIONS[index].src;
      video.currentTime = time;
      if (wasPlaying) video.play();
    },
    [current]
  );

  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        controlsList="noplaybackrate nodownload"
        src={RESOLUTIONS[current].src}
      />

      {/* Resolution picker */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
        <button
          onClick={() => setOpen((o) => !o)}
          className="bg-black/70 hover:bg-black/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg backdrop-blur-sm transition-colors cursor-pointer"
        >
          {RESOLUTIONS[current].label}
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-1 bg-black/85 backdrop-blur-sm rounded-lg overflow-hidden min-w-[80px]">
            {RESOLUTIONS.map((r, i) => (
              <button
                key={r.label}
                onClick={() => switchResolution(i)}
                className={`block w-full text-left text-xs px-3 py-2 transition-colors cursor-pointer ${
                  i === current
                    ? "text-blue3 bg-white/10"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
