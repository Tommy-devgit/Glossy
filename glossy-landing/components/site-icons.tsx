type IconProps = {
  className?: string;
};

function iconProps(className?: string) {
  return {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" {...iconProps(className)}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" {...iconProps(className)}>
      <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a8 8 0 1 0 9.5 9.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" {...iconProps(className)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" {...iconProps(className)}>
      <path d="M12 2.8c-4.9 0-8.2 3.3-8.2 7.8 0 3 1.7 4.7 2.7 4.7.4 0 .7-1.2.7-1.6 0-.4-1-1.2-1-3 0-3.6 2.7-6.1 6.2-6.1 3 0 5.2 1.7 5.2 4.8 0 2.3-.9 6.7-3.9 6.7-1.1 0-1.9-.9-1.9-2 0-1.7 1.2-3.4 1.2-5.3 0-3.2-4.6-2.6-4.6 1.2 0 1 .1 2.2.6 3.1l-1.9 8.1" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" {...iconProps(className)}>
      <path d="M20 11.7a8 8 0 0 1-11.8 7l-3.2.9.9-3.1A8 8 0 1 1 20 11.7Z" />
      <path d="M9.1 8.8c.2-.5.4-.5.7-.5h.6c.2 0 .4 0 .5.4l.8 2c.1.2.1.4 0 .6l-.4.6c-.1.1-.2.3-.1.5.4.8 1 1.5 1.8 2 .9.6 1.4.7 1.7.8.2.1.4 0 .5-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.5v.5c0 .4-.2.7-.5.9-.5.4-1.1.6-1.8.5-1-.1-2.3-.5-3.8-1.9-1.8-1.5-2.8-3.4-3.1-4.4-.3-.9-.1-1.8.4-2.3Z" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" {...iconProps(className)}>
      <path d="M14.2 4v9.2a3.4 3.4 0 1 1-3.4-3.4" />
      <path d="M14.2 4c.6 1.8 2.2 3.2 4.1 3.5v2.5c-1.5 0-2.9-.5-4.1-1.4" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" {...iconProps(className)}>
      <path d="M13.2 20.5v-7h2.4l.4-2.8h-2.8V8.9c0-.8.2-1.4 1.4-1.4h1.5V5c-.3 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.2v2.6H9v2.8h2.4v7" />
    </svg>
  );
}
