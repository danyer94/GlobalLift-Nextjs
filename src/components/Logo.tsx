import Image from "next/image";
import { withBasePath } from "../utils/basePath";

type LogoVariant = "hero" | "default";

export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  const baseClasses =
    "flex items-center gap-0 transition-opacity hover:opacity-90";
  const src =
    variant === "hero"
      ? withBasePath("/logo/white-borders-removebg.png")
      : withBasePath("/logo/logo-3D-removebg.png");

  return (
    <div className={`${baseClasses} ${className}`}>
      <span>
        <Image
          src={src}
          alt="Global Lift"
          className="h-[3.5rem] md:h-[5.5rem] w-auto"
          width={180}
          height={180}
          priority
        />
      </span>
    </div>
  );
}
