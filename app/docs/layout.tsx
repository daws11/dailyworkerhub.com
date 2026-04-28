import { Footer, Layout, Navbar } from "nextra-theme-docs";
import Image from "next/image";
import Link from "next/link";
import { getPageMap } from "nextra/page-map";
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
      <span className="font-semibold text-foreground">DailyWorkerHub</span>
      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
        Docs
      </span>
    </Link>
  );
}

const navLinkClass =
  "px-4 py-2 text-sm rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50";

const navbar = (
  <Navbar
    logo={<Logo />}
    logoLink="/"
    projectLink="https://github.com/daws11/dailyworkerhub.com"
  >
    <div className="hidden md:flex items-center gap-1">
      <a href="/community/discussions" className={navLinkClass}>Diskusi</a>
      <a href="/community/articles" className={navLinkClass}>Artikel</a>
      <a href="/docs" className="px-4 py-2 text-sm rounded-lg transition-colors text-foreground bg-muted/50">Docs</a>
      <a href="/community/feedback" className={navLinkClass}>Feedback</a>
    </div>
    <div className="ml-3 flex items-center gap-3">
      <a href="/login" className={navLinkClass}>Masuk</a>
      <a
        href="/register"
        className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
      >
        Daftar
      </a>
    </div>
  </Navbar>
);

const footer = (
  <Footer>
    © {new Date().getFullYear()} DailyWorkerHub Documentation
  </Footer>
);

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap("/docs");

  return (
    <Layout
      pageMap={pageMap}
      navbar={navbar}
      footer={footer}
      docsRepositoryBase="https://github.com/daws11/dailyworkerhub.com/blob/main/app"
      sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
      editLink="Edit halaman ini di GitHub"
      feedback={{ content: "Punya pertanyaan? Beri tahu kami." }}
      toc={{ backToTop: "Kembali ke atas" }}
    >
      {children}
    </Layout>
  );
}
