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

const SPECIAL_PREFIXES = ["docs", "terms", "privacy", "cookies"];

function computeTargetUrl(pathname: string, newLocale: string): string {
  // /docs/en/getting-started → /docs/id/getting-started
  const specialPrefix = SPECIAL_PREFIXES.find(
    (p) => pathname === `/${p}` || pathname.startsWith(`/${p}/`)
  );
  if (specialPrefix) {
    const afterSection = pathname.slice(specialPrefix.length + 1);
    const afterLocale = afterSection.replace(/^\/(id|en)/, "");
    return `/${specialPrefix}/${newLocale}${afterLocale}`;
  }

  // /id/community → /community (switch to English default) or stay
  // /community → /id/community (switch to Indonesian) or stay
  const stripped = pathname.replace(/^\/id/, "") || "/";
  if (newLocale === "id") {
    return `/id${stripped}`;
  }
  return stripped;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";

  const switchTo = (newLocale: "id" | "en") => {
    const target = computeTargetUrl(pathname, newLocale);
    window.location.href = target;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-base">
          {FLAGS[locale] || FLAGS["en"]}
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchTo("en")}
          className={locale === "en" ? "bg-muted" : ""}
        >
          🇬🇧 English {locale === "en" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchTo("id")}
          className={locale === "id" ? "bg-muted" : ""}
        >
          🇮🇩 Bahasa Indonesia {locale === "id" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
