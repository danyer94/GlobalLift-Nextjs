import type { CSSProperties } from 'react';
import { Flag, Telescope } from 'lucide-react';
import type { AboutCopy, CommitmentCopy, ValuesCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

type AboutProps = {
  copy: AboutCopy;
  values: ValuesCopy;
  commitment: CommitmentCopy;
};

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
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="section-title font-display">{copy.heading}</h2>
            <div className="space-y-4 section-lead max-w-2xl">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="panel-solid p-7 flex flex-col gap-4">
              <span className="pill">{copy.heading}</span>
              <p className="text-lg text-foreground">{copy.oneLine}</p>
              <div className="section-divider h-px" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">{copy.paragraphs[1]}</p>
            </div>
            <div id="nosotros-compromiso" className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft">
              <span
                className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-secondary/15 blur-3xl"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative space-y-6">
                <h3 className="section-title font-display">{commitment.heading}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{commitment.text}</p>
              </div>
            </div>
          </div>
        </div>

        <div id="nosotros-valores" className="mt-16">
          <div>
            <h3 className="section-title font-display mt-6">{values.heading}</h3>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="statement-panel statement-panel--vision h-full">
              <div className="statement-panel-head">
                <span className="statement-panel-icon">
                  <Telescope className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="statement-panel-label">{values.visionLabel}</p>
              </div>
              <p className="statement-panel-text">{values.visionText}</p>
            </div>
            <div className="statement-panel statement-panel--mission h-full">
              <div className="statement-panel-head">
                <span className="statement-panel-icon">
                  <Flag className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="statement-panel-label">{values.missionLabel}</p>
              </div>
              <p className="statement-panel-text">{values.missionText}</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">{values.valuesLabel}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.values.map((value, index) => (
                <article key={value.title} className="value-thread">
                  <span className="value-thread-index">{String(index + 1).padStart(2, '0')}</span>
                  <p className="value-thread-title">{value.title}</p>
                  <p className="value-thread-description">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </MotionSection>
  );
}
