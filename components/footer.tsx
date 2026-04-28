"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith("/docs")) return null

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-foreground">DailyWorkerHub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Platform terpercaya untuk pekerja harian di Indonesia.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Produk</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-emerald-400">Cari Kerja</Link></li>
              <li><Link href="/community" className="hover:text-emerald-400">Komunitas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/community/docs" className="hover:text-emerald-400">Panduan</Link></li>
              <li><Link href="/community/articles" className="hover:text-emerald-400">Artikel</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-emerald-400">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400">Syarat & Ketentuan</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-400">Kebijakan Cookie</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground/70">
          © {new Date().getFullYear()} DailyWorkerHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}