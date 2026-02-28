import { trackShare } from "./analytics";

const SITE_URL = "https://www.claudetoeu.com";
const HASHTAG = "#ClaudeToEU";

const messages = {
  twitter: `Anthropic refused to remove AI safety protections for the US military.\n\nAmerica punishes principles. Europe should reward them.\n\n${HASHTAG}\n${SITE_URL}`,
  linkedin: `Anthropic just told the most powerful military on Earth "No."\n\nEurope was built on the idea that power must have limits. Now add the world's leading AI safety lab, and you have the foundation for responsible AI leadership.\n\nAmerica punishes principles. Europe should reward them.\n\n${HASHTAG}`,
  bluesky: `Anthropic refused to remove AI safety protections for the US military.\n\nAmerica punishes principles. Europe should reward them.\n\n${HASHTAG}`,
};

export function shareOnTwitter() {
  trackShare("x");
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(messages.twitter)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function shareOnLinkedIn() {
  trackShare("linkedin");
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function shareOnBluesky() {
  trackShare("bluesky");
  const url = `https://bsky.app/intent/compose?text=${encodeURIComponent(messages.bluesky)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function copyLink(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    trackShare("copy_link");
    return true;
  } catch {
    return false;
  }
}
