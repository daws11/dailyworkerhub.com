import Link from "next/link"
import Image from "next/image"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-new.png"
              alt="Daily Worker Hub"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-foreground">DailyWorkerHub</span>
          </Link>
          <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground">
            Kembali ke Community
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Kebijakan Cookie</h1>
        <div className="prose prose-invert prose-slate max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Terakhir diperbarui: April 2026
          </p>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Apa itu Cookie?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookie adalah file kecil yang disimpan di perangkat Anda saat Anda mengunjungi situs web.
              Cookie membantu situs web mengingat preferensi Anda dan meningkatkan pengalaman browsing Anda.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Jenis Cookie yang Kami Gunakan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami menggunakan cookie esensial yang diperlukan untuk funcionamiento situs web,
              cookie analitik untuk memahami bagaimana pengunjung menggunakan situs kami,
              dan cookie fungsional untukRemember preferensi Anda.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Bagaimana Menggunakan Cookie</h2>
            <p className="text-muted-foreground leading-relaxed">
              Anda dapat mengatur browser Anda untuk menolak cookie atau menghapus cookie yang sudah ada.
              Namun, beberapa fitur situs mungkin tidak berfungsi dengan baik tanpa cookie.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Cookie Pihak Ketiga</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami mungkin menggunakan layanan pihak ketiga yang juga menetapkan cookie di situs kami.
              Ini termasuk layanan analitik dan integrasi media sosial.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Perubahan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami dapat memperbarui kebijakan cookie ini dari waktu ke waktu.
              Perubahan akan diinformasikan melalui email atau pemberitahuan di layanan kami.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}