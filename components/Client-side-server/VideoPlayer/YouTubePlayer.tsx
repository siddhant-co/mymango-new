"use client";

interface YouTubePlayerProps {
  videoId?: string;
}

export default function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  return (
    <div className="relative w-full mx-auto overflow-hidden px-4 sm:px-6 lg:px-0 mt-6">
      <div className="relative aspect-video lg:aspect-[16/9] lg:h-[550px] lg:max-w-[1600px] mx-auto rounded-xl overflow-hidden">
        <iframe
          className="w-full h-full relative"
          src="https://www.youtube.com/embed/7G67ifDqGF0?si=EQN0rt2nuGt_lb2h&autoplay=1&mute=1&playsinline=1&controls=1&rel=0&modestbranding=1"
          title="YouTube video player"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          loading="lazy"
          frameBorder="0"
        />
      </div>
    </div>
  );
}
