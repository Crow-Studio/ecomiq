import type React from "react";

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 ring-1 ring-white/15 transition-all duration-200 ease-out hover:scale-105 hover:bg-white/15 hover:text-white hover:ring-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 dark:bg-gray-700/30 dark:text-gray-200 dark:ring-gray-600/50 dark:hover:bg-gray-600/40 dark:hover:text-gray-100 dark:hover:ring-gray-500/60 dark:focus-visible:ring-gray-400/70 dark:focus-visible:ring-offset-gray-900"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10 dark:ring-gray-600/20"
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}
