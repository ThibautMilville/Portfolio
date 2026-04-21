"use client";

import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  distance?: number;
  hasUpwardAnimation?: boolean;
}

interface Coords {
  top: number;
  left: number;
}

const TRANSFORM_BY_POSITION: Record<TooltipPosition, string> = {
  top: "translate(-50%, -100%)",
  bottom: "translate(-50%, 0)",
  left: "translate(-100%, -50%)",
  right: "translate(0, -50%)",
};

export function Tooltip({
  children,
  content,
  position = "top",
  distance = 8,
  hasUpwardAnimation = false,
}: TooltipProps): JSX.Element {
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const computeCoords = useCallback(() => {
    const triggerEl = triggerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!triggerEl || !tooltipEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (position === "top") {
      top = triggerRect.top - distance;
      left = triggerRect.left + triggerRect.width / 2;
    } else if (position === "bottom") {
      top = triggerRect.bottom + distance;
      left = triggerRect.left + triggerRect.width / 2;
    } else if (position === "left") {
      top = triggerRect.top + triggerRect.height / 2;
      left = triggerRect.left - distance;
    } else {
      top = triggerRect.top + triggerRect.height / 2;
      left = triggerRect.right + distance;
    }

    const minPadding = 8;
    if (position === "top" || position === "bottom") {
      left = Math.max(
        minPadding + tooltipRect.width / 2,
        Math.min(window.innerWidth - minPadding - tooltipRect.width / 2, left)
      );
    } else {
      top = Math.max(
        minPadding + tooltipRect.height / 2,
        Math.min(window.innerHeight - minPadding - tooltipRect.height / 2, top)
      );
    }

    setCoords({ top, left });
    setIsReady(true);
  }, [distance, position]);

  useLayoutEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      return;
    }
    computeCoords();
  }, [isOpen, computeCoords]);

  useEffect(() => {
    if (!isOpen) return;
    const handleWindowUpdate = () => computeCoords();
    window.addEventListener("scroll", handleWindowUpdate, true);
    window.addEventListener("resize", handleWindowUpdate);
    return () => {
      window.removeEventListener("scroll", handleWindowUpdate, true);
      window.removeEventListener("resize", handleWindowUpdate);
    };
  }, [isOpen, computeCoords]);

  useEffect(() => {
    if (!isOpen) return;
    let frame = 0;
    const tick = () => {
      computeCoords();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [isOpen, computeCoords]);

  const tooltipClassName = useMemo(() => {
    const animationClass =
      hasUpwardAnimation && position === "top"
        ? "data-[open=true]:translate-y-0 data-[open=false]:translate-y-1"
        : "data-[open=true]:translate-y-0 data-[open=false]:translate-y-0";

    return [
      "fixed z-[100] max-w-xs rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-lg",
      "transition-opacity duration-150",
      animationClass,
      isReady && isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
    ].join(" ");
  }, [hasUpwardAnimation, isOpen, isReady, position]);

  return (
    <span
      ref={triggerRef}
      className="inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {children}
      {mounted && content
        ? createPortal(
            <div
              ref={tooltipRef}
              data-open={isOpen && isReady}
              className={tooltipClassName}
              style={{
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                transform: TRANSFORM_BY_POSITION[position],
              }}
              role="tooltip"
            >
              {content}
            </div>,
            document.body
          )
        : null}
    </span>
  );
}
