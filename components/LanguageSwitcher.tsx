"use client";

import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchTo = (newLocale: "id" | "en") => {
    router.push("/", { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="w-4 h-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchTo("id")}
          className={locale === "id" ? "bg-muted" : ""}
        >
          🇮🇩 Bahasa Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchTo("en")}
          className={locale === "en" ? "bg-muted" : ""}
        >
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
