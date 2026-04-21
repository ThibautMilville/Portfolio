"use client";

import { RefObject, useEffect, useRef } from "react";

interface UseHorizontalWheelLockParams {
  sectionRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  enabled?: boolean;
}

export function useHorizontalWheelLock({
  sectionRef,
  trackRef,
  enabled = true,
}: UseHorizontalWheelLockParams) {
  const activeDirectionRef = useRef<1 | -1>(1);
  const horizontalModeRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const CENTER_TOLERANCE_PX = 72;
    let isPageLocked = false;
    let previousBodyOverflow = "";
    let previousHtmlOverflow = "";
    let previousBodyOverscroll = "";
    let previousHtmlOverscroll = "";

    const getMetrics = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return null;

      const hasHorizontalOverflow = track.scrollWidth > track.clientWidth;
      if (!hasHorizontalOverflow) return null;

      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distancePastCenter = viewportCenter - sectionCenter;
      const isSectionInFocus =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;
      const isNearViewportCenter =
        Math.abs(distancePastCenter) <= CENTER_TOLERANCE_PX;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const isAtStart = track.scrollLeft <= 1;
      const isAtEnd = track.scrollLeft >= maxScroll - 1;

      return {
        track,
        isSectionInFocus,
        isNearViewportCenter,
        maxScroll,
        isAtStart,
        isAtEnd,
      };
    };

    const setPageLock = (shouldLock: boolean) => {
      if (shouldLock && !isPageLocked) {
        previousBodyOverflow = document.body.style.overflow;
        previousHtmlOverflow = document.documentElement.style.overflow;
        previousBodyOverscroll = document.body.style.overscrollBehavior;
        previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.overscrollBehavior = "none";
        document.documentElement.style.overscrollBehavior = "none";
        isPageLocked = true;
      } else if (!shouldLock && isPageLocked) {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
        document.body.style.overscrollBehavior = previousBodyOverscroll;
        document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
        isPageLocked = false;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      const metrics = getMetrics();
      if (!metrics) {
        setPageLock(false);
        return;
      }

      const {
        track,
        isSectionInFocus,
        isNearViewportCenter,
        maxScroll,
        isAtStart,
        isAtEnd,
      } = metrics;

      if (!isSectionInFocus) {
        horizontalModeRef.current = false;
        setPageLock(false);
        return;
      }

      const dominantDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (dominantDelta === 0) return;
      const direction = dominantDelta >= 0 ? 1 : -1;
      const canScrollRight = direction > 0 && !isAtEnd;
      const canScrollLeft = direction < 0 && !isAtStart;
      const canScrollHorizontally = canScrollRight || canScrollLeft;

      if (!horizontalModeRef.current) {
        if (!isNearViewportCenter || !canScrollHorizontally) {
          setPageLock(false);
          return;
        }
        horizontalModeRef.current = true;
      }

      activeDirectionRef.current = direction;

      if (canScrollHorizontally) {
        event.preventDefault();
        event.stopPropagation();
        const horizontalDelta = event.deltaY + event.deltaX;
        track.scrollLeft = Math.min(
          maxScroll,
          Math.max(0, track.scrollLeft + horizontalDelta)
        );
        setPageLock(true);
      } else {
        horizontalModeRef.current = false;
        setPageLock(false);
      }
    };

    const handleScroll = () => {
      const metrics = getMetrics();
      if (!metrics) {
        setPageLock(false);
        return;
      }

      const { isSectionInFocus, isAtStart, isAtEnd } = metrics;
      if (!horizontalModeRef.current) {
        setPageLock(false);
        return;
      }
      const direction = activeDirectionRef.current;
      const canContinueInDirection =
        direction > 0 ? !isAtEnd : !isAtStart;
      setPageLock(
        isSectionInFocus && canContinueInDirection
      );
      if (!(isSectionInFocus && canContinueInDirection)) {
        horizontalModeRef.current = false;
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    document.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("wheel", handleWheel, true);
      document.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      setPageLock(false);
    };
  }, [enabled, sectionRef, trackRef]);
}
