import type { CSSProperties } from 'react';
import { BadgeCheck, Building2, Gauge, Leaf, ShieldCheck, Sparkles, Waypoints } from 'lucide-react';
import type { WhyCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

type WhyProps = {
  copy: WhyCopy;
};

const icons = [ShieldCheck, BadgeCheck, Gauge, Building2, Sparkles, Waypoints, Leaf];

const splitItem = (item: string) => {
  const divider = ' — ';
  const index = item.indexOf(divider);

  if (index === -1) {
    return { title: item, description: '' };
  }

  return {
    title: item.slice(0, index),
    description: item.slice(index + divider.length),
  };
};

export function Why({ copy }: WhyProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/why-compliance-inspection.webp')})`,
    '--cinema-position': 'center 40%',
    '--cinema-overlay-soft': 'rgb(var(--primary) / 0.66)',
    '--cinema-vignette': 'rgb(var(--primary) / 0.36)',
  } as CSSProperties;

  return (
    <MotionSection
      id="why"
      className="section section-dark cinema-surface"
      decorVariant="aurora"
      parallaxStrength={20}
      style={cinematicStyle}
    >
      <div className="container">
        <div>
          <p className="badge badge-contrast">{copy.label}</p>
          <h2 className="section-title font-display mt-6 !text-white">{copy.heading}</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, index) => {
            const { title, description } = splitItem(item);
            const Icon = icons[index % icons.length];

            return (
              <div key={item} className="tile group border-white/10">
                <span className="icon-dot">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
