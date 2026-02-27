declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackShare(method: string) {
  trackEvent("share", {
    method,
    content_type: "page",
    item_id: "claudetoeu",
  });
}

export function trackSectionView(sectionName: string) {
  trackEvent("section_view", { section_name: sectionName });
}
