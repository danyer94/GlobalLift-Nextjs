import type { CSSProperties } from 'react';
import { ArrowRight, Binoculars, Flag } from '@phosphor-icons/react';
import type { AboutCopy, CommitmentCopy, ValuesCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { AnimatedList, MotionItem } from './ui/AnimatedList';
import { MotionSection } from './MotionSection';

type AboutProps = {
  copy: AboutCopy;
  values: ValuesCopy;
  commitment: CommitmentCopy;
};

const VALUE_KEYS = [
  'compliance-transparency',
  'execution-coordination',
  'adaptive-growth',
] as const;

export function About({ copy, values, commitment }: AboutProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/about-bridge-ocean.webp')})`,
    '--cinema-position': 'center 42%',
  } as CSSProperties;

  return (
    <MotionSection
      id="nosotros"
      className="section section-plain cinema-surface"
      decorVariant="tide"
      parallaxStrength={16}
      style={cinematicStyle}
    >
      <div className="container">
        <div className="about-executive-grid">
          <div className="about-copy-column">
            <p className="about-eyebrow">{copy.label}</p>
            <h2 className="about-title font-display">{copy.heading}</h2>
            <div className="about-intro">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="about-actions" aria-label={copy.label}>
              <a className="btn btn-primary" href="#process">
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a className="about-text-link" href="#contact">
                {copy.secondaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside id="nosotros-compromiso" className="about-commitment-card liquid-glass-panel">
            <span className="about-card-kicker">{commitment.label}</span>
            <p className="about-one-line">{copy.oneLine}</p>
            <div className="about-card-divider" aria-hidden="true" />
            <div className="about-commitment-copy">
              <h3>{commitment.heading}</h3>
              <p>{commitment.text}</p>
            </div>
          </aside>
        </div>

        <AnimatedList className="about-proof-grid">
          {copy.proofPoints.map((point, index) => (
            <MotionItem key={point.key}>
              <article className="about-proof-card">
                <span className="about-proof-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </article>
            </MotionItem>
          ))}
        </AnimatedList>

        <div id="nosotros-valores" className="about-values-zone">
          <div className="about-values-header">
            <div>
              <p className="about-eyebrow">{values.label}</p>
              <h3 className="about-values-title font-display">{values.heading}</h3>
            </div>
            <p>{values.valuesLabel}</p>
          </div>

          <div className="about-statement-grid">
            <div className="statement-panel statement-panel--vision liquid-glass-panel h-full">
              <div className="statement-panel-head">
                <span className="statement-panel-icon">
                  <Binoculars className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="statement-panel-label">{values.visionLabel}</p>
              </div>
              <p className="statement-panel-text">{values.visionText}</p>
            </div>
            <div className="statement-panel statement-panel--mission liquid-glass-panel h-full">
              <div className="statement-panel-head">
                <span className="statement-panel-icon">
                  <Flag className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="statement-panel-label">{values.missionLabel}</p>
              </div>
              <p className="statement-panel-text">{values.missionText}</p>
            </div>
          </div>

          <AnimatedList className="about-principles-grid">
            {values.principles.map((principle, index) => (
              <MotionItem key={VALUE_KEYS[index] ?? principle.key}>
                <article className="value-thread value-thread--grouped">
                  <span className="value-thread-index">{String(index + 1).padStart(2, '0')}</span>
                  <p className="value-thread-title">{principle.title}</p>
                  <p className="value-thread-description">{principle.description}</p>
                  <div className="value-thread-tags" aria-label={principle.title}>
                    {principle.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              </MotionItem>
            ))}
          </AnimatedList>
        </div>
      </div>
    </MotionSection>
  );
}
