import { Instagram, Linkedin } from "lucide-react";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { SocialIcon } from "~/components/svgs/social";

export default function Footer() {
  const explore = ["How It Works", "Features", "Roadmap", "Partners"];
  const support = ["Help", "Blog", "FAQs", "Contact"];

  return (
    <footer
      className="relative z-10 w-full border-t border-white/10 bg-[#0b0b0b]"
      aria-labelledby="site-footer"
    >
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand / Blurb */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Ecomiq className="h-auto w-[clamp(32px,7vw,56px)] text-white" />
              <span className="text-lg font-semibold tracking-tight">Ecomiq</span>
            </div>
            <p className="max-w-[44ch] text-sm leading-relaxed text-white/80">
              {
                "Ecomiq supports modern brands building momentum through steady effort and honest work."
              }
            </p>

            <div className="mt-5 flex items-center gap-3">
              <SocialIcon href="#" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="#" label="X">
                <span className="text-[12px] leading-none font-black tracking-[-0.02em]">
                  {"X"}
                </span>
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="md:justify-self-center">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-white/60 uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {explore.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[15px] text-white/90 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support" className="md:justify-self-end">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-white/60 uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {support.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[15px] text-white/90 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal row */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Ecomiq. All rights reserved.</div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <a
                  href="#"
                  className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
