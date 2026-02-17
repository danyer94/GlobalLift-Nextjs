import type { CSSProperties } from 'react';
import type { ProcessCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

type ProcessProps = {
  copy: ProcessCopy;
};

const splitItem = (item: string) => {
  const separators = [' - ', ' — '];
  const separator = separators.find((token) => item.includes(token));

  if (!separator) {
    return { title: item, description: '' };
  }

  const index = item.indexOf(separator);
  return {
    title: item.slice(0, index),
    description: item.slice(index + separator.length),
  };
};

export function Process({ copy }: ProcessProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/process-operations-desk.webp')})`,
    '--cinema-position': 'center 46%',
  } as CSSProperties;

  const stageStyle = {
    '--process-stage-image': `url(${withBasePath('/images/generated/hero-cinematic-port.webp')})`,
  } as CSSProperties;
  return (
    <MotionSection
      id="process"
      className="section section-plain cinema-surface"
      decorVariant="grid"
      parallaxStrength={18}
      style={cinematicStyle}
    >
      <div className="container">
        <div className="max-w-3xl">
          <h2 className="section-title mt-6 font-display">{copy.heading}</h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.88fr,1.12fr] lg:gap-10">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="process-stage">
              <div className="process-stage-media" style={stageStyle}>
                <p className="badge badge-contrast">{copy.label}</p>
              </div>
            </div>
          </aside>

          <ol className="space-y-5 lg:space-y-7">
            {copy.steps.map((step, index) => {
              const { title, description } = splitItem(step);
              const stepNumber = `${index + 1}`.padStart(2, '0');

              return (
                <li key={step} className="process-step-card">
                  <span className="process-step-index">{stepNumber}</span>
                  <div>
                    <p className="text-base font-semibold text-foreground md:text-lg">{title}</p>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">{description || title}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </MotionSection>
  );
}
