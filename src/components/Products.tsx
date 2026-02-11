import type { CSSProperties } from 'react';
import { ArrowUpRight, Package, Ship } from 'lucide-react';
import type { ProductsCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';
import { ProductGallery } from './ProductGallery';

type ProductsProps = {
  copy: ProductsCopy;
};

export function Products({ copy }: ProductsProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/products-produce-table.webp')})`,
    '--cinema-position': 'center 42%',
  } as CSSProperties;

  return (
    <MotionSection
      id="products"
      className="section section-base cinema-surface"
      decorVariant="tide"
      parallaxStrength={20}
      style={cinematicStyle}
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.1fr] lg:items-start">
          <div>
            <p className="badge">{copy.label}</p>
            <h2 className="section-title font-display mt-6">{copy.heading}</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <span
                className="block h-px w-24 bg-gradient-to-r from-secondary/80 via-secondary/35 to-transparent"
                aria-hidden="true"
              />
              <div className="flex items-center gap-3">
                <Ship className="h-4 w-4 text-secondary" aria-hidden="true" />
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">{copy.exportTitle}</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground md:text-lg">{copy.exportText}</p>
            <p className="text-base font-semibold text-foreground md:text-lg">{copy.coalHighlight}</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <span
                className="block h-px w-24 bg-gradient-to-r from-accent/80 via-accent/35 to-transparent"
                aria-hidden="true"
              />
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-accent" aria-hidden="true" />
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">{copy.supplyTitle}</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground md:text-lg">{copy.supplyText}</p>
            <p className="text-base font-semibold text-foreground md:text-lg">{copy.openCatalogHighlight}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <a href="#contact" className="btn btn-contact">
            {copy.cta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <ProductGallery heading={copy.heading} galleryCopy={copy.gallery} />
      </div>
    </MotionSection>
  );
}
