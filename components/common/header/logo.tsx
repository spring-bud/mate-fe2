"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/assets/images/laptop-cat.png";

const LogoComponent: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={LogoImage}
        alt="Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
      />
      <span className="ml-2 typo-head3 text-textPrimary dark:text-textLight">
        MATE
      </span>
    </Link>
  );
};

export default LogoComponent;
