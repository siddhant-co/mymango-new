"use client";

import { useState } from "react";

interface YouTubePlayerProps {
  thumbnail: string;
  videoId?: string;
}

export default function YouTubePlayer({
  thumbnail,
  videoId,
}: YouTubePlayerProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const fallbackThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";

  return (
    <div className="relative w-full mx-auto aspect-video overflow-hidden px-4 sm:px-6 lg:px-0 lg:max-w-[1200px] mt-6">
      {/* Thumbnail - shown only if iframe not loaded yet */}
      {!iframeLoaded && (
        <img
          src={fallbackThumbnail || thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover absolute inset-0"
          draggable={false}
        />
      )}

      {videoId ? (
        <iframe
          className="w-full h-full relative"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&modestbranding=1`}
          title="YouTube video player"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          loading="lazy"
          frameBorder="0"
          onLoad={() => setIframeLoaded(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-black text-white">
          Video not available
        </div>
      )}
    </div>
  );
}
