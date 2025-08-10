import { Image } from "@unpic/react";
import { QuoteFragment } from "~/types";

export default function VainillaCard({ quote, author }: QuoteFragment) {
  return (
    <div className="max-w-full min-w-0 shrink-0 grow-0 basis-[min(740px,100%)] self-stretch md:pr-10">
      <article className="embla__slide !last:visible flex h-full w-full min-w-0 transform touch-pan-y touch-pinch-zoom flex-col rounded-xl border border-[--border] select-none [backface-visibility:hidden] dark:border-[--dark-border]">
        <div className="flex flex-1 items-start border-b border-[--border] px-5 py-[18px] md:px-8 md:py-7 dark:border-[--dark-border]">
          <blockquote className="text-xl leading-[135%] font-extralight text-pretty text-[--text-primary] sm:text-2xl md:text-4xl dark:text-[--dark-text-primary]">
            “{quote}”
          </blockquote>
        </div>
        <div className="flex items-center gap-4 pl-5">
          <div className="flex flex-1 items-center gap-5 border-r border-[--border] py-4 dark:border-[--dark-border]">
            <Image
              alt={author._title}
              className="border-input hidden size-16 rounded-full border-2 md:block"
              height={50}
              src={author.image.url}
              width={50}
              priority={true}
              background="auto"
              cdn="cloudinary"
            />
            <div className="flex flex-1 flex-col">
              <h5 className="text-base font-medium md:text-lg">{author._title}</h5>
              <p className="text-sm text-pretty text-[--text-tertiary] md:text-base dark:text-[--dark-text-tertiary]">
                {author.role}, {author.company._title}
              </p>
            </div>
          </div>
          <div className="pr-5">
            {author.company.image ? (
              <Image
                alt={author.company.image.alt ?? author.company._title}
                className="w-12 rounded-full md:w-16"
                height={44}
                src={author.company.image.url}
                width={44}
                priority={true}
                background="auto"
                cdn="cloudinary"
              />
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
