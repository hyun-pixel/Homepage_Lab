"use client";

import { useEffect, useRef, type ReactNode } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type OverlayShellProps = {
  children: ReactNode;
  closeLabel: string;
  languageLabel: string;
  languageToggleLabel: string;
  onClose: () => void;
  onLanguageToggle: () => void;
  titleId: string;
  variant: "archive" | "partnership" | "day-one";
};

export function OverlayShell({
  children,
  closeLabel,
  languageLabel,
  languageToggleLabel,
  onClose,
  onLanguageToggle,
  titleId,
  variant,
}: OverlayShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const body = document.body;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollPosition = window.scrollY;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.width = "100%";

    const focusTimer = window.requestAnimationFrame(() => {
      dialog?.querySelector<HTMLElement>("[data-overlay-close]")?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("hidden"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!dialog.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
        return;
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollPosition);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className={`experience-overlay experience-overlay--${variant}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <header className="experience-overlay__header">
        <span className="experience-overlay__brand" translate="no">FLOWAX SPACE</span>
        <div className="experience-overlay__actions">
          <button
            className="experience-overlay__language"
            type="button"
            onClick={onLanguageToggle}
            aria-label={languageToggleLabel}
          >
            {languageLabel}
          </button>
          <button
            className="experience-overlay__close"
            type="button"
            onClick={onClose}
            data-overlay-close
          >
            <span>{closeLabel}</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
