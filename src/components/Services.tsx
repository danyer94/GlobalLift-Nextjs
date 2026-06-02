import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { ServicesCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { AnimatedOl, MotionLi } from './ui/AnimatedList';
import { MotionSection } from './MotionSection';

type ServicesProps = {
  copy: ServicesCopy;
};

type ServiceCard = {
  key: string;
  number: string;
  title: string;
  description: string;
  tone: 'porcelain' | 'signal' | 'navy';
  media: string;
  mediaKey: 'supply' | 'logistics' | 'compliance';
};

const splitItem = (item: string) => {
  const [title, ...rest] = item.split(/\s(?:\u2014|-|\u00e2\u20ac\u201d)\s/u);
  return {
    title: title ?? item,
    description: rest.join(' - '),
  };
};

const buildServiceCards = (copy: ServicesCopy): ServiceCard[] => {
  const isEnglish = copy.heading.toLowerCase().includes('services');
  const parsed = copy.items.map(splitItem);
  const byIndex = (index: number) => parsed[index]?.description || parsed[index]?.title || '';

  if (isEnglish) {
    return [
      {
        key: 'supply-sourcing',
        number: '01',
        title: 'Supply and sourcing',
        description: 'We connect your business with reliable suppliers and manage sourcing, evaluation, and commercial coordination for multiple product categories.',
        tone: 'porcelain',
        media: withBasePath('/images/generated/services/services-supply-render.webp'),
        mediaKey: 'supply',
      },
      {
        key: 'logistics-coordination',
        number: '02',
        title: 'Logistics and coordination',
        description: byIndex(2) || 'We organize each stage of the operation with planning, control, and visibility from origin to destination.',
        tone: 'signal',
        media: withBasePath('/images/generated/services/services-logistics-render.webp'),
        mediaKey: 'logistics',
      },
      {
        key: 'trade-compliance',
        number: '03',
        title: 'Foreign trade and compliance',
        description: 'We support imports, exports, trade facilitation, and documentation with structured processes and ethical business standards.',
        tone: 'navy',
        media: withBasePath('/images/generated/services/services-compliance-render.webp'),
        mediaKey: 'compliance',
      },
    ];
  }

  return [
    {
      key: 'supply-sourcing',
      number: '01',
      title: 'Suministro y abastecimiento',
      description: 'Conectamos tu negocio con proveedores confiables y gestionamos búsqueda, evaluación y coordinación comercial para múltiples categorías.',
      tone: 'porcelain',
      media: withBasePath('/images/generated/services/services-supply-render.webp'),
      mediaKey: 'supply',
    },
    {
      key: 'logistics-coordination',
      number: '02',
      title: 'Logística y coordinación',
      description: byIndex(2) || 'Organizamos cada etapa de la operación con planificación, control y visibilidad desde origen hasta destino.',
      tone: 'signal',
      media: withBasePath('/images/generated/services/services-logistics-render.webp'),
      mediaKey: 'logistics',
    },
    {
      key: 'trade-compliance',
      number: '03',
      title: 'Comercio exterior y cumplimiento',
      description: 'Acompañamos importaciones, exportaciones, documentación y facilitación comercial con procesos estructurados y ética empresarial.',
      tone: 'navy',
      media: withBasePath('/images/generated/services/services-compliance-render.webp'),
      mediaKey: 'compliance',
    },
  ];
};

export function Services({ copy }: ServicesProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/services-multimodal.webp')})`,
    '--cinema-position': 'center 38%',
  } as CSSProperties;

  const cards = buildServiceCards(copy);

  return (
    <MotionSection
      id="services"
      className="section section-dark cinema-surface services-matrix-section"
      decorVariant="grid"
      parallaxStrength={20}
      style={cinematicStyle}
    >
      <div className="container">
        <div className="services-matrix-header">
          <div>
            <p className="services-matrix-kicker">{copy.label}</p>
            <h2 className="section-title font-display">{copy.heading}</h2>
          </div>
          <p className="section-lead">{copy.lead}</p>
        </div>

        <AnimatedOl className="services-matrix-grid" aria-label={copy.heading}>
          {cards.map((card) => {
            return (
              <MotionLi key={card.key} className={`services-matrix-card services-matrix-card--${card.tone}`}>
                <article className="services-matrix-inner">
                  <div className="services-matrix-number" aria-hidden="true">{card.number}</div>
                  <div className="services-matrix-copy">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="services-matrix-copy-line" aria-hidden="true" />
                  </div>
                  <div className="services-matrix-visual" aria-hidden="true">
                    <div className={`services-matrix-art services-matrix-art--${card.mediaKey}`}>
                      <Image
                        src={card.media}
                        alt=""
                        fill
                        sizes="(min-width: 1181px) 33vw, 100vw"
                        priority={false}
                      />
                    </div>
                  </div>
                </article>
              </MotionLi>
            );
          })}
        </AnimatedOl>
      </div>
    </MotionSection>
  );
}
