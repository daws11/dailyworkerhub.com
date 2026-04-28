import { MainNavbar } from "@/components/layout/MainNavbar";
import { Footer } from "@/components/footer";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">Kebijakan Cookie</h1>
        <div className="prose prose-invert prose-slate max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Terakhir diperbarui: April 2026
          </p>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Apa itu Cookie?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookie adalah file kecil yang disimpan di perangkat Anda saat Anda mengunjungi situs web.
              Cookie membantu situs web remembers preferensi Anda dan meningkatkan pengalaman browsing Anda.
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

      <Footer />
    </div>
  )
}