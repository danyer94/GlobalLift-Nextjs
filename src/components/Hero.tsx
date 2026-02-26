import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { HeroCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

const HERO_BG_IMAGE = {
  src: withBasePath('/images/generated/about-bridge-ocean.webp'),
  posMobile: 'center 36%',
  posTablet: 'center 34%',
  posDesktop: 'center 33%',
};

type HeroProps = {
  copy: HeroCopy;
};

export function Hero({ copy }: HeroProps) {
  const slideStyle = {
    '--hero-pos-mobile': HERO_BG_IMAGE.posMobile,
    '--hero-pos-tablet': HERO_BG_IMAGE.posTablet,
    '--hero-pos-desktop': HERO_BG_IMAGE.posDesktop,
  } as CSSProperties;

  return (
    <MotionSection
      className="hero-aurora section flex min-h-[100svh] items-center justify-center pt-32 pb-20"
      decorVariant="none"
      parallaxStrength={14}
      reveal={false}
      background={
        <div className="hero-bg-slides" aria-hidden="true">
          <Image
            src={HERO_BG_IMAGE.src}
            alt=""
            className="hero-bg-image"
            style={slideStyle}
            fill
            sizes="100vw"
            priority
          />
        </div>
      }
    >
      <div className="container flex justify-center">
        <div className="hero-copy-shell w-full max-w-4xl space-y-6 px-4 text-center text-primary-foreground sm:px-6">
          <div>
            <h1 className="font-hero mx-auto max-w-3xl text-balance text-5xl font-normal leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="hero-subtitle mt-6 mx-auto max-w-xl text-balance text-center text-sm leading-relaxed md:text-base">
              {copy.subtitle}
            </p>
          </div>
          <div className="hero-actions mt-8">
            <a href="#contact" className="hero-btn hero-btn--primary">
              {copy.primaryCta}
            </a>
            <a href="#services" className="hero-btn hero-btn--secondary">
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
