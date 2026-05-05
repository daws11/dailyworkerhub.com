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

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const switchTo = (newLocale: "id" | "en") => {
    router.push(pathname, { locale: newLocale });
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
