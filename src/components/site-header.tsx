"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/data";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/comparar", label: "Comparar" },
  { href: "/pronostico", label: "Pronóstico" },
  { href: "/fuentes", label: "Fuentes" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="shell flex flex-col gap-1 py-2 md:h-16 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <Link
          href="/comparar"
          className="tap min-w-0 shrink font-heading text-lg tracking-tight md:text-xl"
        >
          {SITE.name}
        </Link>
        <nav
          aria-label="Principal"
          className="grid grid-cols-3 gap-1 md:flex md:items-center"
        >
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/comparar" && pathname === "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "tap justify-center rounded-full px-2 text-sm md:px-3",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground md:hover:bg-muted md:hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
