"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FLAGS: Record<string, string> = {
  id: "🇮🇩",
  en: "🇬🇧",
};

const SPECIAL_PREFIXES = ["/docs", "/terms", "/privacy", "/cookies"];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";

  const switchTo = (newLocale: "id" | "en") => {
    // Set cookie for server-side locale detection
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Compute target URL
    let target = pathname;

    // Check if current path is a special route (docs/terms/privacy/cookies)
    const specialPrefix = SPECIAL_PREFIXES.find(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    );

    if (specialPrefix) {
      // /docs/en/getting-started → /docs/id/getting-started
      const afterPrefix = pathname.slice(specialPrefix.length);
      const afterLocale = afterPrefix.replace(/^\/(id|en)/, '');
      target = `${specialPrefix}/${newLocale}${afterLocale}`;
    } else if (newLocale === "en") {
      // Add /en/ prefix for English
      target = `/en${pathname}`;
      if (target.endsWith("/")) target = target.slice(0, -1);
    } else {
      // Remove /en/ prefix for Indonesian (default locale)
      target = pathname.replace(/^\/en/, "") || "/";
    }

    window.location.href = target;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-base">
          {FLAGS[locale] || FLAGS["id"]}
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchTo("id")}
          className={locale === "id" ? "bg-muted" : ""}
        >
          🇮🇩 Bahasa Indonesia {locale === "id" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchTo("en")}
          className={locale === "en" ? "bg-muted" : ""}
        >
          🇬🇧 English {locale === "en" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
