// "use client";

// import { useState } from "react";

// interface YouTubePlayerProps {
//   thumbnail: string;
//   videoId?: string;
//   localVideoSrc?: string;
// }

// export default function YouTubePlayer({
//   thumbnail,
//   videoId,
//   localVideoSrc,
// }: YouTubePlayerProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [fallback, setFallback] = useState(false);

//   const fallbackThumbnail = videoId
//     ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
//     : "";

//   return (
//     <div className="relative w-full mx-auto aspect-video rounded-xl overflow-hidden lg:max-w-[1000px]">
//       {!isPlaying ? (
//         <div
//           className="relative w-full h-full cursor-pointer"
//           onClick={() => setIsPlaying(true)}
//         >
//           <img
//             src={fallback ? fallbackThumbnail : thumbnail}
//             alt="Video thumbnail"
//             className="w-full h-full object-cover"
//             onError={() => setFallback(true)}
//             draggable={false}
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center pointer-events-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-20 w-20 text-white"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           </div>
//         </div>
//       ) : localVideoSrc ? (
//         <video
//           className="w-full h-full object-cover"
//           controls
//           autoPlay
//           muted
//           playsInline
//           src={localVideoSrc}
//         />
//       ) : videoId ? (
//         <iframe
//           className="w-full h-full"
//           src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
//           title="YouTube video player"
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//           loading="lazy"
//         />
//       ) : (
//         <div className="w-full h-full flex items-center justify-center bg-black text-white">
//           Video not available
//         </div>
//       )}
//     </div>
//   );
// }
