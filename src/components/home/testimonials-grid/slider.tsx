import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import * as React from "react";

import { QuoteFragment } from "~/types";
import { Button } from "../../../common/button";
import VainillaCard from "./vanilla-card";

export function Slider({
  quotes,
  children,
}: {
  quotes: QuoteFragment[];
  children: React.ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      breakpoints: {
        640: {
          align: "center",
        },
      },
    },
    [WheelGesturesPlugin()],
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onPrevButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="flex w-full flex-col gap-14">
      <div className="flex justify-between">
        {children}
        <div className="hidden gap-4 sm:flex">
          <Button
            aria-label="Previous testimonial"
            className="!h-auto cursor-pointer rounded-full px-4 py-2"
            intent="secondary"
            onClick={onPrevButtonClick}
          >
            <ArrowLeftIcon className="size-6" />
          </Button>
          <Button
            aria-label="Next testimonial"
            className="!h-auto cursor-pointer rounded-full !px-4 !py-2"
            intent="secondary"
            onClick={onNextButtonClick}
          >
            <ArrowRightIcon className="size-6" />
          </Button>
        </div>
      </div>
      <div ref={emblaRef} className="relative">
        <div className="relative flex h-full w-full gap-10 md:gap-0">
          {quotes.map((item) => (
            <TesimonialCard key={item._id} {...item} />
          ))}
        </div>
        <div className="mt-4 flex w-full justify-center gap-2 md:hidden">
          {scrollSnaps.map((snap, index) => (
            <button
              key={snap}
              aria-label={`Testimonial ${String(index + 1)}`}
              className={clsx(
                "group flex items-center justify-center rounded-full p-1",
                index === selectedIndex ? "bg-[--accent-500-50]" : "",
              )}
              onClick={() => onDotButtonClick(index)}
            >
              <span
                className={clsx(
                  "size-2 rounded-full",
                  index === selectedIndex
                    ? "bg-[--accent-500]"
                    : "bg-[--surface-tertiary] dark:bg-[--dark-surface-secondary]",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const TesimonialCard = React.memo(
  VainillaCard,
  (prevProps, nextProps) =>
    prevProps.quote === nextProps.quote && prevProps.author === nextProps.author,
);
