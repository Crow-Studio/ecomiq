import { Check } from "lucide-react";
import { useState } from "react";
import { TrackedButtonLink } from "~/common/tracked-button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

export default function Hero() {
  const [actions] = useState([
    {
      href: "/",
      label: "Request Demo",
      type: "secondary",
      _id: "demo",
    },
    {
      href: "/",
      label: "Get Started for Free",
      type: "primary",
      _id: "free",
    },
  ]);

  const [avatars] = useState([
    "https://assets.basehub.com/fa068a12/eXjW9QO3AKz15Ru0lRyaL/97a514e9e8c98d647f06c12400f1f0bd-(1).png?height=100&quality=100&width=100",
    "https://assets.basehub.com/fa068a12/XdbZC6Y1mPpNarRwWXWGs/103cd669723f80c168b5d84ec8bbe0a5.png?height=100&quality=100&width=100",
  ]);
  return (
    <section className="relative min-h-[calc(630px-var(--header-height))] overflow-hidden pb-10">
      <div className="absolute top-0 left-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-[--border] dark:border-[--dark-border]">
        {/* Decorations */}
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-[--border] dark:border-[--dark-border]" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>
      {/* --- */}
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-orange-200 blur-[200px] dark:bg-orange-400" />
      <figure className="pointer-events-none absolute top-[64px] left-[4vw] z-20 hidden aspect-square w-[32vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />
      <figure className="pointer-events-none absolute right-[7vw] bottom-[-50px] z-20 hidden aspect-square w-[30vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />
      {/* --- */}
      <div className="relative z-10 flex flex-col divide-y divide-[--border] pt-[35px] dark:divide-[--dark-border]">
        <div className="flex flex-col items-center justify-end">
          <div className="flex items-center gap-2 !border !border-b-0 border-[--border] px-4 py-2 dark:border-[--dark-border]">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
              {avatars.map((avatar, index) => (
                <Avatar key={index} className="size-5">
                  <AvatarImage src={avatar} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm tracking-tight text-[--text-tertiary] dark:text-[--dark-text-tertiary]">
              Launching Soon
            </p>
          </div>
        </div>
        <div>
          <div className="mx-auto flex min-h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-2 px-2 py-4 sm:px-16 lg:px-24">
            <h1 className="!max-w-screen-lg text-center text-[clamp(32px,7vw,64px)] leading-none font-medium tracking-[-1.44px] text-pretty text-[--text-primary] md:tracking-[-2.16px] dark:text-[--dark-text-primary]">
              Boost Efficiency, Elevate Your Ecommerce Experience
            </h1>
            <h2 className="text-md max-w-2xl text-center text-pretty text-[--text-tertiary] md:text-lg dark:text-[--dark-text-tertiary]">
              Ecomiq is an all-in-one ecommerce platform built for store owners of all
              skill levels—manage orders, inventory, marketing, and customers with ease.
            </h2>
            <div className="mt-3 flex items-center justify-center gap-4 text-base">
              <div className="flex items-center gap-1">
                <Check className="text-primary size-4" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="text-primary size-4" />
                <span>14-day trial</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="text-primary size-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center px-8 sm:px-24">
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[392px]">
            {actions?.map(({ href, label, type, _id }) => (
              <TrackedButtonLink
                key={_id}
                className={cn(
                  "!h-14 flex-col items-center justify-center rounded-none !text-base",
                  type === "primary"
                    ? "bg-brand flex w-full text-white"
                    : "max-w-sm:!border-x-0 flex w-full !border-x !border-y-0 border-[--border] !bg-transparent backdrop-blur-xl transition-colors duration-150 hover:!bg-black/5 dark:border-[--dark-border] dark:hover:!bg-white/5",
                )}
                href={href}
                name="cta_click"
              >
                {label}
              </TrackedButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
