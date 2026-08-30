"use client";

import { useEffect, useRef, useState } from "react";

const LOADER_TIMEOUT_MS = 6000;
const SCRUB_EASING = 0.1;
const SNAP_THRESHOLD = 0.01;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    let duration = 0;
    let currentTime = 0;
    let animationFrame = 0;
    let loaderTimer = 0;
    let loaderDismissed = false;

    const syncDuration = () => {
      duration = Number.isFinite(video.duration) ? Math.max(video.duration, 0) : 0;
    };

    const syncBufferedProgress = () => {
      if (duration <= 0 || video.buffered.length === 0) {
        return;
      }

      let bufferedEnd = 0;

      for (let index = 0; index < video.buffered.length; index += 1) {
        bufferedEnd = Math.max(bufferedEnd, video.buffered.end(index));
      }

      const nextPercent = Math.round(clamp(bufferedEnd / duration, 0, 1) * 100);
      setLoaderPercent((previous) => previous === nextPercent ? previous : nextPercent);
    };

    const dismissLoader = () => {
      if (loaderDismissed) {
        return;
      }

      loaderDismissed = true;
      setLoaderPercent(100);
      setIsLoaderVisible(false);
    };

    const scrubVideo = () => {
      const scrollRange = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      const progress = scrollRange > 0
        ? clamp(window.scrollY / scrollRange, 0, 1)
        : 0;
      const targetTime = progress * duration;

      currentTime += (targetTime - currentTime) * SCRUB_EASING;

      if (Math.abs(targetTime - currentTime) < SNAP_THRESHOLD) {
        currentTime = targetTime;
      }

      if (duration > 0 && video.readyState >= 2) {
        const nextTime = clamp(currentTime, 0, duration);

        if (Number.isFinite(nextTime)) {
          try {
            video.currentTime = nextTime;
          } catch {
            // Safari can briefly reject a seek while media state is changing.
          }
        }
      }

      animationFrame = window.requestAnimationFrame(scrubVideo);
    };

    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("progress", syncBufferedProgress);
    video.addEventListener("canplaythrough", dismissLoader);
    video.addEventListener("error", dismissLoader);

    if (video.readyState >= 1) {
      syncDuration();
    }

    if (video.readyState >= 4) {
      window.requestAnimationFrame(dismissLoader);
    }

    loaderTimer = window.setTimeout(dismissLoader, LOADER_TIMEOUT_MS);
    animationFrame = window.requestAnimationFrame(scrubVideo);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(loaderTimer);
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("progress", syncBufferedProgress);
      video.removeEventListener("canplaythrough", dismissLoader);
      video.removeEventListener("error", dismissLoader);
    };
  }, []);

  return (
    <>
      <div
        className={"scene-loader" + (isLoaderVisible ? "" : " scene-loader--hidden")}
        role="status"
        aria-live="polite"
        aria-hidden={!isLoaderVisible}
      >
        <span>{loaderPercent}%</span>
      </div>

      <div className="space-film" aria-hidden="true">
        <video
          ref={videoRef}
          className="space-film__video"
          muted
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
          tabIndex={-1}
        >
          <source src="/media/hero-astronaut.mp4" type="video/mp4" />
        </video>
        <div className="space-film__scrim" />
      </div>
    </>
  );
}
