"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
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

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const switchTo = (newLocale: "id" | "en") => {
    // Special routes: locale is in SECOND path segment (/docs/en, /terms/id)
    // Manually swap the locale in the URL
    const specialPrefix = SPECIAL_PREFIXES.find(
      (p) => pathname === `/${p}` || pathname.startsWith(`/${p}/`)
    );
    if (specialPrefix) {
      const afterSection = pathname.slice(specialPrefix.length + 1); // '/en' or '/en/getting-started'
      const afterLocale = afterSection.replace(/^\/(id|en)/, "");
      const target = `/${specialPrefix}/${newLocale}${afterLocale}`;
      window.location.href = target;
      return;
    }

    // Regular routes: use next-intl router (handles /en/ prefix)
    router.push(pathname, { locale: newLocale });
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
