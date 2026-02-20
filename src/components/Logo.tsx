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
          className="h-20 md:h-[6.5rem] w-auto -mt-2 -mb-2 scale-105"
          width={180}
          height={180}
          priority
        />
      </span>
    </div>
  );
}
