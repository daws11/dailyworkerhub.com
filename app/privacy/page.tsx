import { MainNavbar } from "@/components/layout/MainNavbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">Kebijakan Privasi</h1>
        <div className="prose prose-invert prose-slate max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Terakhir diperbarui: April 2026
          </p>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, termasuk nama, email,
              dan informasi profil saat Anda mendaftar atau menggunakan layanan kami.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Penggunaan Informasi</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami menggunakan informasi yang dikumpulkan untuk menyediakan, memelihara, dan meningkatkan
              layanan kami, memproses transaksi, dan mengkomunikasikan informasi terkait layanan.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Perlindungan Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda
              dari akses yang tidak sah, pengubahan, pengungkapan, atau penghancuran yang tidak sah.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Hak Anda</h2>
            <p className="text-muted-foreground leading-relaxed">
              Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda.
              Hubungi kami jika Anda ingin menggunakan hak-hak tersebut.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Perubahan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan akan diinformasikan melalui email atau pemberitahuan di layanan kami.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}