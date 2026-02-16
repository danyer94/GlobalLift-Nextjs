import type { CSSProperties } from 'react';
import { Boxes, FileCheck, Globe2, Handshake, Plane, Ship, ShieldCheck, Truck } from 'lucide-react';
import type { ServicesCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

type ServicesProps = {
  copy: ServicesCopy;
};

const getIconForService = (title: string) => {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (normalized.includes('maritimo') || normalized.includes('ocean')) return Ship;
  if (normalized.includes('aereo') || normalized.includes('air')) return Plane;
  if (normalized.includes('terrestre') || normalized.includes('land')) return Truck;
  if (normalized.includes('aduanas') || normalized.includes('customs')) return FileCheck;
  if (normalized.includes('almacenamiento') || normalized.includes('storage')) return Boxes;
  if (normalized.includes('seguro') || normalized.includes('insurance')) return ShieldCheck;
  if (normalized.includes('asesoria') || normalized.includes('consulting')) return Handshake;
  return Globe2;
};

const splitItem = (item: string) => {
  const [title, ...rest] = item.split(/\s(?:\u2014|-)\s/u);
  return {
    title: title ?? item,
    description: rest.join(' - '),
  };
};

const getServiceTone = (index: number) => {
  const tones = ['sea', 'air', 'land', 'trade'] as const;
  return tones[index % tones.length];
};

export function Services({ copy }: ServicesProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/services-multimodal.webp')})`,
    '--cinema-position': 'center 38%',
  } as CSSProperties;

  return (
    <MotionSection
      id="services"
      className="section section-alt cinema-surface"
      decorVariant="grid"
      parallaxStrength={20}
      style={cinematicStyle}
    >
      <div className="container">
        <div>
          <h2 className="section-title mt-6 font-display">{copy.heading}</h2>
          <p className="section-lead mt-6 max-w-3xl">{copy.lead}</p>
        </div>

        <ol className="service-route mt-12" aria-label={copy.heading}>
          {copy.items.map((item, index) => {
            const { title, description } = splitItem(item);
            const Icon = getIconForService(title);

            return (
              <li key={item} className={`service-route-item service-route-item--${getServiceTone(index)}`}>
                <div className="service-route-marker">
                  <span className="service-route-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="icon-dot">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="service-route-copy">
                  <p className="text-base font-semibold text-foreground md:text-lg">{title}</p>
                  {description && <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </MotionSection>
  );
}
