import { useEffect } from "react";

const RELOAD_MARKER = "__pure-digital-chunk-reload";
const CHUNK_ERROR_PATTERNS = [
  "Failed to fetch dynamically imported module",
  "Importing a module script failed",
  "ChunkLoadError",
  "Unable to preload CSS",
  "Loading chunk",
];

function shouldRecover(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "";

  return CHUNK_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}

function recoverOnce() {
  if (typeof window === "undefined") return;
  const previous = window.sessionStorage.getItem(RELOAD_MARKER);
  if (previous === window.location.pathname) return;

  window.sessionStorage.setItem(RELOAD_MARKER, window.location.pathname);
  window.location.reload();
}

export function ChunkRecovery() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const clearMarker = window.setTimeout(() => {
      window.sessionStorage.removeItem(RELOAD_MARKER);
    }, 10_000);

    const onVitePreloadError = (event: Event) => {
      event.preventDefault();
      recoverOnce();
    };

    const onError = (event: ErrorEvent) => {
      if (shouldRecover(event.error ?? event.message)) {
        recoverOnce();
      }
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (shouldRecover(event.reason)) {
        event.preventDefault();
        recoverOnce();
      }
    };

    window.addEventListener("vite:preloadError", onVitePreloadError as EventListener);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.clearTimeout(clearMarker);
      window.removeEventListener("vite:preloadError", onVitePreloadError as EventListener);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}