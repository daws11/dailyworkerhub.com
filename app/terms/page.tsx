import { MainNavbar } from "@/components/layout/MainNavbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">Syarat & Ketentuan</h1>
        <div className="prose prose-invert prose-slate max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Terakhir diperbarui: April 2026
          </p>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Penerimaan Syarat</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dengan mengakses dan menggunakan layanan DailyWorkerHub, Anda menyetujui untuk terikat
              dengan syarat dan ketentuan ini. Jika Anda tidak setuju, mohon tidak menggunakan layanan kami.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Deskripsi Layanan</h2>
            <p className="text-muted-foreground leading-relaxed">
              DailyWorkerHub adalah platform yang menghubungkan pekerja harian dengan pemberi kerja.
              Kami menyediakan layanan pencarian kerja, pendaftaran, dan komunikasi antara pengguna.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Akun Pengguna</h2>
            <p className="text-muted-foreground leading-relaxed">
              Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda.
              Semua aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Penggunaan yang Dilarang</h2>
            <p className="text-muted-foreground leading-relaxed">
              Anda tidak boleh menggunakan layanan kami untuk tujuan ilegal atau yang melanggar
              syarat ini. Kami berhak menangguhkan atau menghentikan akun yang melanggar.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Batasan Tanggung Jawab</h2>
            <p className="text-muted-foreground leading-relaxed">
              DailyWorkerHub tidak bertanggung jawab atas kerugian langsung atau tidak langsung
              yang timbul dari penggunaan layanan kami.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Perubahan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami dapat mengubah syarat ini dari waktu ke waktu. Perubahan akan diinformasikan
              melalui email atau pemberitahuan di layanan kami.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}