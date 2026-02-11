
import { withBasePath } from '../utils/basePath';

export function Logo({ className = '', iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  const baseClasses = "flex items-center gap-3 transition-opacity hover:opacity-90";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      <span className="logo-plate">
        <img
          src={withBasePath('/logo/Global-Lift.ico')}
          alt="Global Lift SRL"
          className="h-9 w-auto"
          width={90}
          height={90}
          decoding="async"
        />
      </span>
      {!iconOnly && (
        <span className="text-sm tracking-tight text-foreground md:text-lg font-display">
          Global <span className="italic font-bold text-secondary">Lift</span> <span className="font-medium text-muted-foreground ml-1">SRL</span>
        </span>
      )}
    </div>
  );
}
