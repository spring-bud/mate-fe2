"use client";

import Link from "next/link";
import logoImage from "@/assets/images/laptop-cat.png";
import Image from "next/image";

const LogoComponent = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={logoImage}
        alt="Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
        priority
      />
      <span className="ml-2 typo-head3 text-textPrimary dark:text-textLight">
        MATE
      </span>
    </Link>
  );
};

export default LogoComponent;
