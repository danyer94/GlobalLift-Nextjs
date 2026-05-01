import type { CSSProperties } from 'react';
import { ShieldCheck, Buildings, Gauge, Leaf, Sparkle, Path, TreeEvergreen } from '@phosphor-icons/react';
import type { WhyCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { AnimatedList, MotionItem } from './ui/AnimatedList';
import { MotionSection } from './MotionSection';

type WhyProps = {
  copy: WhyCopy;
};

const icons = [ShieldCheck, Buildings, Gauge, Leaf, Sparkle, Path, TreeEvergreen];

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
          <h2 className="section-title font-display mt-6 !text-white">{copy.heading}</h2>
        </div>
        <AnimatedList className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, index) => {
            const { title, description } = splitItem(item);
            const Icon = icons[index % icons.length];

            return (
              <MotionItem key={WHY_ITEM_KEYS[index] ?? title}>
                <div className="tile why-glass-card group">
                  <span className="icon-dot">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </div>
              </MotionItem>
            );
          })}
        </AnimatedList>
      </div>
    </MotionSection>
  );
}
