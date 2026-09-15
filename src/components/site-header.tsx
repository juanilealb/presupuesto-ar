import Link from "next/link";
import { SITE } from "@/data";

const NAV = [
  { href: "/#error", label: "El error" },
  { href: "/#ganadores", label: "Quién perdió" },
  { href: "/fuentes", label: "Fuentes" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="shell flex flex-col gap-1 py-2 md:h-16 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <Link
          href="/"
          className="tap min-w-0 shrink font-heading text-lg tracking-tight md:text-xl"
        >
          {SITE.name}
        </Link>
        <nav
          aria-label="Principal"
          className="grid grid-cols-3 gap-1 md:flex md:items-center"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tap justify-center rounded-full px-2 text-sm text-muted-foreground md:px-3 md:hover:bg-muted md:hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
