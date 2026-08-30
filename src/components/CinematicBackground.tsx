"use client";

import { useEffect, useRef, useState } from "react";

const LOADER_TIMEOUT_MS = 6000;
const SNAP_THRESHOLD = 0.01;
const SMOOTHING_RESPONSE_MS = 150;
const SEEK_INTERVAL_MS = 1000 / 24;
const SEEK_TIME_THRESHOLD = 1 / 48;
const MOBILE_MEDIA_QUERY = "(max-width: 768px), (pointer: coarse)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

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
    let targetTime = 0;
    let scrollRange = 0;
    let documentHeight = 0;
    let stableViewportHeight = document.documentElement.clientHeight || window.innerHeight;
    let viewportWidth = window.innerWidth;
    let animationFrame = 0;
    let loaderTimer = 0;
    let orientationTimer = 0;
    let loaderDismissed = false;
    let disposed = false;
    let lastFrameTimestamp = 0;
    let lastSeekTimestamp = Number.NEGATIVE_INFINITY;
    let lastRequestedTime = video.currentTime;

    const scrollingElement = document.scrollingElement ?? document.documentElement;
    const mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const scheduleScrub = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(scrubVideo);
      }
    };

    const updateScrollTarget = () => {
      const progress = scrollRange > 0
        ? clamp(scrollingElement.scrollTop / scrollRange, 0, 1)
        : 0;

      targetTime = reducedMotionQuery.matches ? 0 : progress * duration;
      scheduleScrub();
    };

    const measureScrollRange = (updateViewportHeight: boolean) => {
      if (updateViewportHeight) {
        stableViewportHeight = document.documentElement.clientHeight || window.innerHeight;
      }

      documentHeight = scrollingElement.scrollHeight;
      scrollRange = Math.max(documentHeight - stableViewportHeight, 0);
      updateScrollTarget();
    };

    const syncDocumentHeight = () => {
      const nextDocumentHeight = scrollingElement.scrollHeight;

      if (Math.abs(nextDocumentHeight - documentHeight) <= 1) {
        return;
      }

      documentHeight = nextDocumentHeight;
      scrollRange = Math.max(documentHeight - stableViewportHeight, 0);
      updateScrollTarget();
    };

    const syncDuration = () => {
      duration = Number.isFinite(video.duration) ? Math.max(video.duration, 0) : 0;
      currentTime = clamp(video.currentTime, 0, duration);
      lastRequestedTime = currentTime;
      updateScrollTarget();
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

    const scrubVideo = (timestamp: number) => {
      animationFrame = 0;

      if (duration <= 0) {
        return;
      }

      const elapsed = lastFrameTimestamp > 0
        ? clamp(timestamp - lastFrameTimestamp, 0, 64)
        : 1000 / 60;
      const smoothing = 1 - Math.exp(-elapsed / SMOOTHING_RESPONSE_MS);

      lastFrameTimestamp = timestamp;
      currentTime += (targetTime - currentTime) * smoothing;

      if (Math.abs(targetTime - currentTime) < SNAP_THRESHOLD) {
        currentTime = targetTime;
      }

      const nextTime = clamp(currentTime, 0, duration);
      const requestedDelta = Math.abs(nextTime - lastRequestedTime);
      const canRequestSeek = video.readyState >= 2
        && !video.seeking
        && timestamp - lastSeekTimestamp >= SEEK_INTERVAL_MS;
      const shouldRequestSeek = requestedDelta >= SEEK_TIME_THRESHOLD
        || (requestedDelta > 0 && (nextTime === 0 || nextTime === duration));

      if (canRequestSeek && shouldRequestSeek && Number.isFinite(nextTime)) {
        try {
          video.currentTime = nextTime;
          lastRequestedTime = nextTime;
          lastSeekTimestamp = timestamp;
        } catch {
          // Safari can briefly reject a seek while media state is changing.
        }
      }

      const needsSmoothing = Math.abs(targetTime - currentTime) >= SNAP_THRESHOLD;
      const needsSeek = Math.abs(targetTime - lastRequestedTime) >= SEEK_TIME_THRESHOLD;

      if (needsSmoothing || (video.readyState >= 2 && needsSeek)) {
        scheduleScrub();
      }
    };

    const handleResize = () => {
      const nextViewportWidth = window.innerWidth;

      if (Math.abs(nextViewportWidth - viewportWidth) > 1) {
        viewportWidth = nextViewportWidth;
        measureScrollRange(true);
        return;
      }

      syncDocumentHeight();
    };

    const handleOrientationChange = () => {
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(() => {
        viewportWidth = window.innerWidth;
        measureScrollRange(true);
      }, 250);
    };

    const handleMediaPreferenceChange = () => {
      lastFrameTimestamp = 0;
      updateScrollTarget();
    };

    const documentResizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(syncDocumentHeight);

    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("loadeddata", updateScrollTarget);
    video.addEventListener("progress", syncBufferedProgress);
    video.addEventListener("canplaythrough", dismissLoader);
    video.addEventListener("seeked", scheduleScrub);
    video.addEventListener("error", dismissLoader);
    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleOrientationChange);
    mobileQuery.addEventListener("change", handleMediaPreferenceChange);
    reducedMotionQuery.addEventListener("change", handleMediaPreferenceChange);
    documentResizeObserver?.observe(document.documentElement);

    measureScrollRange(true);

    document.fonts.ready.then(() => {
      if (!disposed) {
        syncDocumentHeight();
      }
    });

    if (video.readyState >= 1) {
      syncDuration();
    }

    if (video.readyState >= 4) {
      window.requestAnimationFrame(dismissLoader);
    }

    loaderTimer = window.setTimeout(dismissLoader, LOADER_TIMEOUT_MS);
    scheduleScrub();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(loaderTimer);
      window.clearTimeout(orientationTimer);
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("loadeddata", updateScrollTarget);
      video.removeEventListener("progress", syncBufferedProgress);
      video.removeEventListener("canplaythrough", dismissLoader);
      video.removeEventListener("seeked", scheduleScrub);
      video.removeEventListener("error", dismissLoader);
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      mobileQuery.removeEventListener("change", handleMediaPreferenceChange);
      reducedMotionQuery.removeEventListener("change", handleMediaPreferenceChange);
      documentResizeObserver?.disconnect();
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
          <source src="/media/hero-astronaut-scrub.mp4" type="video/mp4" />
        </video>
        <div className="space-film__scrim" />
      </div>
    </>
  );
}
