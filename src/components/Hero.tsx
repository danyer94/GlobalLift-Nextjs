import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { HeroCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

const HERO_BG_IMAGES = [
  {
    src: withBasePath('/images/generated/hero-cinematic-port.webp'),
    posMobile: 'center 40%',
    posTablet: 'center 38%',
    posDesktop: 'center 36%',
  },
  {
    src: withBasePath('/images/generated/services-multimodal.webp'),
    posMobile: 'center 44%',
    posTablet: 'center 42%',
    posDesktop: 'center 40%',
  },
  {
    src: withBasePath('/images/generated/commitment-ship-sunset.webp'),
    posMobile: 'center 46%',
    posTablet: 'center 44%',
    posDesktop: 'center 42%',
  },
];
const BG_ROTATE_INTERVAL_MS = 6_000;

type HeroProps = {
  copy: HeroCopy;
};

const highlightTitle = (title: string): ReactNode => {
  const markers = [
    {
      text: 'sin fronteras',
      className: 'hero-highlight-match',
    },
    {
      text: 'without borders',
      className: 'hero-highlight-match',
    },
    {
      text: 'República Dominicana',
      className: 'hero-highlight-match',
    },
    {
      text: 'Dominican Republic',
      className: 'hero-highlight-match',
    },
  ];
  const marker = markers.find((item) => title.includes(item.text));

  if (!marker) {
    return title;
  }

  const index = title.indexOf(marker.text);

  return (
    <>
      {title.slice(0, index)}
      <span className={marker.className}>{marker.text}</span>
      {title.slice(index + marker.text.length)}
    </>
  );
};

export function Hero({ copy }: HeroProps) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % HERO_BG_IMAGES.length);
    }, BG_ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionSection
      className="hero-aurora section min-h-[88vh] pt-28 pb-16 flex items-center justify-center"
      decorVariant="aurora"
      parallaxStrength={24}
      background={
        <div className="hero-bg-slides" aria-hidden="true">
          {HERO_BG_IMAGES.map((image, i) => {
            const slideStyle = {
              opacity: i === bgIndex ? 1 : 0,
              '--hero-pos-mobile': image.posMobile,
              '--hero-pos-tablet': image.posTablet,
              '--hero-pos-desktop': image.posDesktop,
            } as CSSProperties;

            return (
              <Image
                key={image.src}
                src={image.src}
                alt=""
                className="hero-bg-image"
                style={slideStyle}
                fill
                sizes="100vw"
                priority={i === 0}
              />
            );
          })}
        </div>
      }
    >
      <div className="container flex justify-center">
        <div className="w-full max-w-3xl space-y-7 px-4 text-center text-primary-foreground sm:px-6">
          <div className="space-y-5">
            <h1 className="hero-slogan hero-slogan--archivo text-4xl tracking-tight md:text-6xl">
              {highlightTitle(copy.title)}
            </h1>
            <p className="text-lg text-primary-foreground/88 md:text-xl">{copy.subtitle}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a
              href="#contact"
              className="btn btn-contact"
            >
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#services" className="btn btn-outline">
              {copy.secondaryCta}
            </a>
          </div>
          <p className="text-sm text-primary-foreground/84 md:text-base">{copy.micro}</p>
          <div className="mx-auto w-full max-w-3xl border-t border-primary-foreground/24 pt-4">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/90 md:text-[0.95rem]">
              {copy.trustCues.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_0_4px_rgba(6,182,212,0.22)]"
                  />
                  <span className="font-medium tracking-[0.01em]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
