import Image from "next/image";
import { withBasePath } from "../utils/basePath";

export function Logo({
  className = "",
}: {
  className?: string;
}) {
  const baseClasses =
    "flex items-center gap-0 transition-opacity hover:opacity-90";

  return (
    <div className={`${baseClasses} ${className}`}>
      <span>
        <Image
          src={withBasePath("/logo/logo-3D-removebg.png")}
          alt="Global Lift"
          className="h-[3.5rem] md:h-[4.5rem] w-auto"
          width={180}
          height={180}
          priority
        />
      </span>
    </div>
  );
}
