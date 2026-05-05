import { Footer, Layout, Navbar } from "nextra-theme-docs";
import Image from "next/image";
import Link from "next/link";
import { getPageMap } from "nextra/page-map";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { FAQPageSchema } from "@/components/docs/StructuredData";
import "nextra-theme-docs/style.css";
import "./docs.css";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo-new.png"
        alt="Daily Worker Hub"
        width={32}
        height={32}
        className="h-8 w-auto object-contain"
      />
      <span className="font-semibold text-foreground">Daily Worker Hub</span>
      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
        Docs
      </span>
    </Link>
  );
}

const navLinkClass =
  "px-4 py-2 text-sm rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap("/docs");
  const t = await getTranslations("nav");
  const ft = await getTranslations("footer");

  const navbar = (
    <Navbar
      logo={<Logo />}
      logoLink="/"

    >
      <div className="hidden md:flex items-center gap-1">
        <a href="/community/discussions" className={navLinkClass}>{t("discussions")}</a>
        <a href="/community/articles" className={navLinkClass}>{t("articles")}</a>
        <a href="/docs" className="px-4 py-2 text-sm rounded-lg transition-colors text-foreground bg-muted/50">{t("docs")}</a>
        <a href="/community/feedback" className={navLinkClass}>{t("feedback")}</a>
      </div>
      <div className="ml-3 flex items-center gap-3">
        <LanguageSwitcher />
        <a href="/login" className={navLinkClass}>{t("login")}</a>
        <a
          href="/register"
          className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          {t("register")}
        </a>
      </div>
    </Navbar>
  );

  const footer = (
    <Footer>
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-foreground">Daily Worker Hub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {ft("tagline")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{ft("products")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">{ft("findJobs")}</a></li>
              <li><a href="/community" className="hover:text-emerald-400 transition-colors">{ft("workerCommunity")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{ft("resources")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/docs" className="hover:text-emerald-400 transition-colors">{ft("platformGuide")}</a></li>
              <li><a href="/community/articles" className="hover:text-emerald-400 transition-colors">{ft("articlesTips")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{ft("legal")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/privacy" className="hover:text-emerald-400 transition-colors">{ft("privacyPolicy")}</a></li>
              <li><a href="/terms" className="hover:text-emerald-400 transition-colors">{ft("termsConditions")}</a></li>
              <li><a href="/cookies" className="hover:text-emerald-400 transition-colors">{ft("cookiePolicy")}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground/70">
          &copy; {new Date().getFullYear()} Daily Worker Hub. {ft("rightsReserved")}
        </div>
      </div>
    </Footer>
  );

  return (
    <Layout
      pageMap={pageMap}
      navbar={navbar}
      footer={footer}

      sidebar={{ defaultMenuCollapseLevel: 99, autoCollapse: false, toggleButton: true }}
      editLink={false}
      feedback={undefined}
      toc={{ backToTop: t("backToTop") }}
    >
      <FAQPageSchema />
      {children}
    </Layout>
  );
}
