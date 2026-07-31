import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WindowsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm8.5-1.3L21 2.5v9H11.5V4.2ZM3 13.5h7.5v7.1L3 19.5v-6Zm8.5 0H21v9l-9.5-1.5v-7.5Z" />
    </svg>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.7 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.8 2.1 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1 2.7-2 .9-1.2 1.2-2.4 1.2-2.5-.1 0-2.3-.9-2.3-3.7ZM15.3 6.6c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.6-1.3Z" />
    </svg>
  );
}

export function SteamIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2a10 10 0 0 0-9.7 12.5l5.3-2.2a3.1 3.1 0 0 1 5.8-.9l3.8 2.7a3.2 3.2 0 1 1-1.2 1.7l-3.6-2.6a3.1 3.1 0 0 1-5.1.5L3.2 15.7A10 10 0 1 0 12 2Zm0 3.2a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6Zm-5.6 9.1a2 2 0 1 0 1.5 3.4l1.7-.7a2 2 0 0 0-3.2-2.7Z" />
    </svg>
  );
}
