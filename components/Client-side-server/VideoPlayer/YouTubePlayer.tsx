"use client";

import { useState, useEffect } from "react";

interface YouTubePlayerProps {
  thumbnail: string;
  videoId?: string;
}

export default function YouTubePlayer({
  thumbnail,
  videoId,
}: YouTubePlayerProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(videoId);

  useEffect(() => {
    // Reset iframe load state when videoId changes
    setIframeLoaded(false);
    setCurrentVideoId(videoId);
  }, [videoId]);

  const fallbackThumbnail = currentVideoId
    ? `https://img.youtube.com/vi/${currentVideoId}/maxresdefault.jpg`
    : "";

  return (
    <div className="relative w-full mx-auto aspect-video overflow-hidden px-4 sm:px-6 lg:px-0 lg:max-w-[1200px] mt-6">
      {/* Thumbnail shown until iframe loads */}
      {!iframeLoaded && (
        <img
          src={fallbackThumbnail || thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover absolute inset-0"
          draggable={false}
        />
      )}

      {currentVideoId ? (
        <iframe
          key={currentVideoId} // Force iframe to reload when videoId changes
          className="w-full h-full relative"
          src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&modestbranding=1`}
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
