export type DownloadPlatform = "windows" | "macos" | "steam";

type NavigatorUAData = {
  platform?: string;
};

/**
 * Client-only OS sniff for download CTAs.
 * Prefers User-Agent Client Hints, falls back to UA/platform.
 * Never trust this for security — only for UX defaults.
 */
export function detectDownloadPlatform(): DownloadPlatform {
  if (typeof navigator === "undefined") return "windows";

  const uaData = (
    navigator as Navigator & { userAgentData?: NavigatorUAData }
  ).userAgentData;
  const hint = uaData?.platform?.toLowerCase() ?? "";

  if (hint.includes("mac")) return "macos";
  if (hint.includes("win")) return "windows";
  if (hint.includes("linux") || hint.includes("chrome os")) return "steam";

  const ua = navigator.userAgent;
  const platform = navigator.platform ?? "";

  if (/Mac|iPhone|iPad|iPod/i.test(ua) || /Mac/i.test(platform)) {
    return "macos";
  }
  if (/Win/i.test(ua) || /Win/i.test(platform)) {
    return "windows";
  }
  if (/Linux|X11|Android/i.test(ua) || /Linux/i.test(platform)) {
    return "steam";
  }

  return "windows";
}
