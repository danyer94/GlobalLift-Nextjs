import type { CSSProperties } from 'react';
import {
  ArrowsOutCardinal,
  Buildings,
  ChartLineUp,
  Gauge,
  Leaf,
  Scales,
  ShieldCheck,
} from '@phosphor-icons/react';
import type { WhyCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { AnimatedList, MotionItem } from './ui/AnimatedList';
import { MotionSection } from './MotionSection';

type WhyProps = {
  copy: WhyCopy;
};

const icons = [ShieldCheck, Buildings, Gauge, Scales, ArrowsOutCardinal, Leaf, ChartLineUp];

const cardTransforms = [
  { tilt: '-7deg', hoverTilt: '-2.5deg', lift: '1.4rem' },
  { tilt: '4deg', hoverTilt: '1.5deg', lift: '0.35rem' },
  { tilt: '-3.5deg', hoverTilt: '-1.25deg', lift: '-0.7rem' },
  { tilt: '0.5deg', hoverTilt: '0deg', lift: '-1.1rem' },
  { tilt: '4.5deg', hoverTilt: '1.75deg', lift: '-0.45rem' },
  { tilt: '-4deg', hoverTilt: '-1.5deg', lift: '0.45rem' },
  { tilt: '6deg', hoverTilt: '2deg', lift: '1.25rem' },
] as const;

type WhyCardStyle = CSSProperties & {
  '--why-tilt': string;
  '--why-hover-tilt': string;
  '--why-lift': string;
  '--why-index': number;
};

const WHY_ITEM_KEYS = [
  'legal-compliance',
  'transparency',
  'operational-efficiency',
  'ethical-business',
  'adaptability',
  'multi-sector-approach',
  'responsible-growth',
] as const;

const splitItem = (item: string) => {
  const [title, ...rest] = item.split(/\s(?:\u2014|-)\s/u);

  return {
    title: title ?? item,
    description: rest.join(' - '),
  };
};

export function Why({ copy }: WhyProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/why-compliance-inspection.webp')})`,
    '--cinema-position': 'center 40%',
    '--cinema-overlay-soft': 'rgb(var(--primary) / 0.74)',
    '--cinema-vignette': 'rgb(var(--primary) / 0.48)',
  } as CSSProperties;

  return (
    <MotionSection
      id="why"
      className="section section-dark cinema-surface why-cinematic-section"
      decorVariant="aurora"
      parallaxStrength={20}
      style={cinematicStyle}
    >
      <div className="container">
        <div className="why-deck-header">
          <p className="why-deck-eyebrow">{copy.label}</p>
          <h2 className="why-deck-title font-display">{copy.heading}</h2>
          <span className="why-deck-light" aria-hidden="true" />
          <p className="why-deck-lead">{copy.lead}</p>
        </div>
        <AnimatedList className="why-card-deck" aria-label={copy.heading}>
          {copy.items.map((item, index) => {
            const { title, description } = splitItem(item);
            const Icon = icons[index % icons.length];
            const transform = cardTransforms[index % cardTransforms.length];
            const cardStyle: WhyCardStyle = {
              '--why-tilt': transform.tilt,
              '--why-hover-tilt': transform.hoverTilt,
              '--why-lift': transform.lift,
              '--why-index': index,
            };

            return (
              <MotionItem
                key={WHY_ITEM_KEYS[index] ?? title}
                className="why-deck-item"
                style={cardStyle}
              >
                <article className="why-deck-card group">
                  <span className="why-card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="why-card-icon">
                    <Icon className="size-10" aria-hidden="true" />
                  </span>
                  <span className="why-card-rule" aria-hidden="true" />
                  <h3 className="why-card-title">{title}</h3>
                  <p className="why-card-description">{description}</p>
                </article>
              </MotionItem>
            );
          })}
        </AnimatedList>
      </div>
    </MotionSection>
  );
}
