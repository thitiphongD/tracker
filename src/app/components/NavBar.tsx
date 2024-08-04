"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ImBug } from "react-icons/im";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Link href={"/"}>
        <ImBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            // className={`${
            //   link.href === currentPath ? "text-zinc-900" : "text-zinc-500"
            // }  hover:text-zinc-800 transition-colors`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
