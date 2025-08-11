import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Instagram, Linkedin } from "lucide-react";
import { Ecomiq } from "~/components/svgs/Ecomiq";
import { SocialIcon } from "~/components/svgs/Social";
import { Button } from "~/components/ui/button";

export default function Page() {
  const explore = ["How It Works", "Features", "Roadmap", "Partners"];
  const support = ["Help", "Blog", "FAQs", "Contact"];

  return (
    <main className="w-full bg-[#15110f] text-white">
      {/* HERO: image lives only in this section so it sits above the footer band */}
      <section className="relative isolate overflow-hidden">
        {/* Background image confined to hero */}
        <div className="absolute inset-0">
          <Image
            src="/images/cta-image.png"
            alt="cta-image"
            priority
            layout="fullWidth"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
          />
          {/* readability and subtle vignette */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_18%_28%,rgba(0,0,0,0.55),transparent_40%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10 lg:px-16 lg:py-20">
          <h1 className="max-w-[15ch] text-[clamp(28px,8vw,64px)] leading-[1.05] font-extrabold tracking-tight text-white drop-shadow">
            {"Elegant Stores, Powerful Sales"}
          </h1>

          <p className="mt-4 max-w-[60ch] text-[clamp(13px,2.6vw,16px)] leading-relaxed text-white/85">
            {
              "Ecomiq helps you launch and grow faster—streamlining storefronts, inventory, and checkout so you can focus on momentum."
            }
          </p>

          <div className="mt-6">
            <Link to="/">
              <Button className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-full cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:translate-y-0.5 hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs">
                <Icon
                  icon="lucide-arrow-right"
                  className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER BAND: matches navbar structure and alignment */}
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
    </main>
  );
}
