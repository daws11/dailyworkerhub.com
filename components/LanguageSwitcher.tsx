"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

const FLAGS: Record<string, string> = {
  id: "🇮🇩",
  en: "🇬🇧",
};

function setLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLocale: "id" | "en") => {
    setLocaleCookie(newLocale);
    window.location.reload();
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
