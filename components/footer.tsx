"use client"

import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

export function Footer() {
  const pathname = usePathname()
  const t = useTranslations("footer")
  if (pathname?.startsWith("/docs")) return null

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-foreground">Daily Worker Hub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{t("products")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-emerald-400">{t("findJobs")}</Link></li>
              <li><Link href="/community" className="hover:text-emerald-400">{t("workerCommunity")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{t("resources")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/docs" className="hover:text-emerald-400">{t("platformGuide")}</a></li>
              <li><Link href="/community/articles" className="hover:text-emerald-400">{t("articlesTips")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{t("legal")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/privacy" className="hover:text-emerald-400">{t("privacyPolicy")}</a></li>
              <li><a href="/terms" className="hover:text-emerald-400">{t("termsConditions")}</a></li>
              <li><a href="/cookies" className="hover:text-emerald-400">{t("cookiePolicy")}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground/70">
          &copy; {new Date().getFullYear()} Daily Worker Hub. {t("rightsReserved")}
        </div>
      </div>
    </footer>
  )
}
