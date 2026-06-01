import type { CSSProperties } from 'react';
import {
  Gauge,
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

const icons = [ShieldCheck, Gauge, Scales];

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
        <AnimatedList className="why-exec-grid" aria-label={copy.heading}>
          {copy.pillars.map((pillar, index) => {
            const Icon = icons[index % icons.length];

            return (
              <MotionItem
                key={pillar.key}
                className="why-exec-item"
              >
                <article className="why-exec-card">
                  <span className="why-exec-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="why-exec-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="why-exec-title">{pillar.title}</h3>
                  <p className="why-exec-description">{pillar.description}</p>
                  <p className="why-exec-proof">{pillar.proof}</p>
                </article>
              </MotionItem>
            );
          })}
        </AnimatedList>
      </div>
    </MotionSection>
  );
}
