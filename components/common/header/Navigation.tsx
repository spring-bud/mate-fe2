import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
  current: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, current }) => {
  return (
    <Link
      href={href}
      className={`typo-button2 px-3 py-2 rounded-md transition-colors ${
        current
          ? "text-active font-medium"
          : "text-textDim hover:text-textPrimary hover:bg-hover"
      }`}
      aria-current={current ? "page" : undefined}
    >
      {label}
    </Link>
  );
};

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const currentPath = pathname;

  const navItems = [
    { href: "/product", label: "Product" },
    { href: "/freelancer", label: "Freelancer" },
    { href: "/help", label: "Help" },
  ];

  return (
    <nav className="flex space-x-1">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          current={currentPath.startsWith(item.href)}
        />
      ))}
    </nav>
  );
};

export default Navigation;
