import Image from "next/image";
import { withBasePath } from "../utils/basePath";

export function Logo({
  className = "",
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  const baseClasses =
    "flex items-center gap-0 transition-opacity hover:opacity-90";

  return (
    <div className={`${baseClasses} ${className}`}>
      <span>
        <Image
          src={withBasePath("/logo/logo-3D-removebg.png")}
          alt="Global Lift"
          className="h-16 w-auto"
          width={90}
          height={90}
        />
      </span>
      {!iconOnly && (
        <span className="text-sm tracking-tight text-foreground md:text-lg font-display -m-4">
          Global <span className="italic font-bold text-secondary">Lift</span>
        </span>
      )}
    </div>
  );
}
