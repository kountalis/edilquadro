import { useEffect, useState } from 'react';

const HeroBackground = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const loadVideo = () => setShouldLoadVideo(true);
    let idleHandle;
    let timeoutHandle;

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(loadVideo, { timeout: 1600 });
    } else {
      timeoutHandle = window.setTimeout(loadVideo, 1200);
    }

    return () => {
      if (idleHandle && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute inset-0 bg-black/60 z-10" />
      {shouldLoadVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-video-thumb.avif"
          aria-label="Video hero Edilquadro"
        >
          <track
            kind="captions"
            src="/hero-video-captions.vtt"
            srcLang="it"
            label="Italiano"
            default
          />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <picture
          className="absolute inset-0 w-full h-full z-0 block"
          aria-hidden="true"
          role="presentation"
        >
          <source srcSet="/hero-video-thumb.avif" type="image/avif" />
          <source srcSet="/hero-video-thumb.webp" type="image/webp" />
          <img
            src="/hero-video-thumb.jpg"
            width={1268}
            height={644}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            alt=""
          />
        </picture>
      )}
    </div>
  );
};

export default HeroBackground;










