import type { Metadata } from "next";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { LegalToc, type TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Kebijakan Cookie - Daily Worker Hub",
  description: "Kebijakan Cookie Daily Worker Hub - Pelajari bagaimana kami menggunakan cookie dan teknologi pelacakan lainnya.",
  keywords: ["kebijakan cookie", "cookie", "pelacakan", "privasi", "dailyworkerhub"],
  openGraph: {
    title: "Kebijakan Cookie - Daily Worker Hub",
    description: "Kebijakan Cookie Daily Worker Hub - Pelajari bagaimana kami menggunakan cookie dan teknologi pelacakan lainnya.",
    url: "https://dailyworkerhub.com/cookies",
    siteName: "Daily Worker Hub",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Cookie - Daily Worker Hub",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/cookies",
  },
};

const tocItems: TocItem[] = [
  { id: "section-1", title: "1. Apa itu Cookie?" },
  { id: "section-2", title: "2. Jenis Cookie yang Kami Gunakan" },
  { id: "section-3", title: "3. Cookie Pihak Ketiga" },
  { id: "section-4", title: "4. Cara Mengelola Cookie" },
  { id: "section-5", title: "5. Pembaruan Kebijakan Cookie" },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <LegalToc items={tocItems} />

            <div className="flex-1 max-w-4xl">
              <div className="prose prose-invert prose-slate max-w-none space-y-6">
                <h1 className="text-3xl font-bold text-foreground mb-8">Kebijakan Cookie</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Terakhir diperbarui: April 2026
                </p>

                <section className="space-y-4">
                  <h2 id="section-1" className="text-xl font-semibold text-foreground scroll-mt-24">1. Apa itu Cookie?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookie adalah file teks kecil yang disimpan pada perangkat Anda — baik komputer, tablet,
                    maupun smartphone — saat Anda mengunjungi atau menggunakan layanan Daily Worker Hub. Cookie
                    dikirim oleh server platform dan disimpan di browser Anda untuk berbagai keperluan, mulai
                    dari mengingat preferensi bahasa, status login, hingga melacak aktivitas penggunaan agar
                    kami dapat meningkatkan pengalaman Anda di platform kami.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Ketika Anda membuat akun di Daily Worker Hub, cookie memungkinkan kami mengenali perangkat
                    Anda sehingga Anda tidak perlu login ulang setiap kali mengunjungi platform. Cookie juga
                    membantu kami memahami bagaimana Anda berinteraksi dengan fitur-fitur seperti pencarian
                    lowongan kerja, pencarian pekerja, manajemen proyek harian, dan penggunaan Sistem Dana Jaminan
                    pembayaran.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Perlu dipahami bahwa cookie tidak menjalankan kode program, tidak mengandung virus, dan
                    tidak dapat membaca data lain yang tersimpan di perangkat Anda. Cookie hanya menyimpan
                    informasi dalam bentuk teks biasa yang dapat Anda kelola melalui pengaturan browser
                    Anda kapan saja.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-2" className="text-xl font-semibold text-foreground scroll-mt-24">2. Jenis Cookie yang Kami Gunakan</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub menggunakan tiga kategori utama cookie yang masing-masing memiliki fungsi
                    berbeda. Memahami perbedaan ini membantu Anda mengetahui apa yang kami kumpulkan dan
                    mengapa kami membutuhkannya.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Jenis Cookie</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Fungsi</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Durasi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">Essential (Wajib)</td>
                          <td className="px-4 py-3">
                            Cookie ini mutlak diperlukan untuk operasi dasar platform, termasuk autentikasi
                            pengguna, manajemen sesi login, security, dan fungsionalitas keranjang Dana Jaminan.
                            Tanpa cookie ini, fitur utama seperti deposit dana, release pembayaran, dan
                            notifikasi push tidak akan berfungsi dengan baik.
                          </td>
                          <td className="px-4 py-3">Session / 30 hari</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">Analytics (Analitik)</td>
                          <td className="px-4 py-3">
                            Cookie analitik mengumpulkan data anonim tentang bagaimana Anda menggunakan
                            platform — halaman mana yang dikunjungi, berapa lama waktu yang dihabiskan,
                            fitur apa yang paling sering digunakan, dan di mana letak kesulitan pengguna.
                            Data ini membantu kami memperbaiki UX, mempercepat proses pencarian kerja dan
                            rekrutmen, serta mengidentifikasi bug yang mungkin Anda temui.
                          </td>
                          <td className="px-4 py-3">12 bulan</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">Functional (Fungsional)</td>
                          <td className="px-4 py-3">
                            Cookie fungsional mengingat preferensi dan pengaturan personal Anda, seperti
                            bahasa yang dipilih, lokasi kerja yang Anda minati di Bali, kategori pekerjaan
                            hospitality yang Anda cari, serta preferensi notifikasi. Cookie ini membuat
                            pengalaman Anda lebih personal dan efisien setiap kali kembali ke platform.
                          </td>
                          <td className="px-4 py-3">6 bulan</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Kami tidak menggunakan cookie untuk tujuan iklan atau pelacakan lintas situs lain.
                    Data analitik yang kami kumpulkan tidak dikaitkan dengan identitas pribadi Anda
                    kecuali Anda secara eksplisit login dan menggunakan fitur-fitur platform.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-3" className="text-xl font-semibold text-foreground scroll-mt-24">3. Cookie Pihak Ketiga</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub mengandalkan beberapa layanan pihak ketiga yang dalam pengoperasiannya
                    juga menempatkan cookie di perangkat Anda. Berikut adalah layanan-layanan tersebut
                    beserta penjelasan tentang data yang mereka kumpulkan:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Analytics (Google):</strong> Kami
                    mengintegrasikan Firebase Analytics untuk memahami perilaku pengguna di aplikasi web
                    dan mobile. Firebase mengumpulkan data interaksi anonim yang mencakup waktu session,
                    fitur yang digunakan, error yang terjadi, dan konversi dalam alur kerja — misalnya
                    berapa banyak pemberi kerja yang berhasil membuat lowongan atau berapa banyak pekerja yang
                    menyelesaikan proses tarik dana pertama mereka. Data ini digunakan solely untuk tujuan
                    optimisasi produk dan tidak dibagikan ke advertiser.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Supabase:</strong> Sebagai backend platform kami,
                    Supabase menggunakan cookie sesi untuk mengelola autentikasi dan otorisasi pengguna.
                    Cookie ini memastikan bahwa setiap kali Anda mengakses fitur-fitur seperti melihat
                    detail lowongan kerja, mengelola proposal, atau memproses transaksi Dana Jaminan, sistem
                    dapat memverifikasi identitas Anda secara aman. Supabase tidak menggunakan cookie
                    untuk tujuan pelacakan komersial.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Cloud Messaging (FCM):</strong> Untuk
                    mengirimkan push notification — seperti konfirmasi deposit Dana Jaminan, status pembayaran,
                    atau pengingat jadwal kerja — kami menggunakan FCM yang mungkin menyimpan token unik
                    di perangkat Anda. Token ini memungkinkan kami mengirim notifikasi even when browser
                    tab tertutup, selama Anda telah memberikan izin notifikasi.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Setiap layanan pihak ketiga memiliki kebijakan cookie dan privasi mereka sendiri yang
                    beroperasi secara independen dari kebijakan ini. Kami sangat menyarankan Anda untuk
                    membaca kebijakan privasi masing-masing pihak ketiga tersebut agar memahami bagaimana
                    data Anda dikelola di luar infrastruktur kami.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-4" className="text-xl font-semibold text-foreground scroll-mt-24">4. Cara Mengelola Cookie</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Anda memiliki kendali penuh atas cookie yang disimpan di perangkat Anda. Setiap browser
                    web modern menyediakan pengaturan yang memungkinkan Anda untuk memblokir, menghapus,
                    atau membatasi cookie tertentu. Berikut panduan umum untuk masing-masing browser:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Google Chrome:</strong> Buka Settings → Privacy
                    and security → Cookies and other site data. Di sini Anda dapat memblokir cookie dari
                    semua situs, memblokir cookie pihak ketiga saja, atau menghapus cookie spesifik dari
                    Daily Worker Hub. Gunakan opsi "Block third-party cookies" jika Anda ingin tetap login
                    di platform kami tanpa menerima cookie pelacakan dari situs lain.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Mozilla Firefox:</strong> Buka Options → Privacy
                    &amp; Security → Cookies and Site Data. Anda dapat mengatur apakah ingin menerima semua
                    cookie, cookie dari situs yang dikunjungi saja, atau memblokir semua cookie sama sekali.
                    Opsi "Delete cookies when Firefox is closed" sangat berguna jika Anda menggunakan perangkat
                    bersama.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Safari:</strong> Buka Preferences → Privacy.
                    Safari memungkinkan Anda memblokir semua cookie atau hanya cookie pihak ketiga.
                    Anda juga dapat menghapus semua cookie yang tersimpan melalui opsi "Manage Website Data".
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Perlu diketahui bahwa menonaktifkan cookie essential akansangat memengaruhi fungsi platform.
                    Misalnya, Anda tidak akan bisa tetap login, Sistem Dana Jaminan tidak dapat memverifikasi sesi
                    transaksi, dan deposit dana tidak dapat diproses dengan aman. Untuk pengalaman terbaik,
                    kami merekomendasikan untuk menerima cookie essential dari Daily Worker Hub sambil
                    memblokir cookie analitik dan fungsional pihak ketiga jika Anda concerned tentang
                    privasi.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-5" className="text-xl font-semibold text-foreground scroll-mt-24">5. Pembaruan Kebijakan Cookie</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Kami secara berkala memperbarui kebijakan cookie ini setiap kali ada perubahan dalam
                    praktik pengumpulan data kami, integrasi layanan pihak ketiga baru, atau perubahan
                    regulasi yang berlaku di Indonesia — khususnya Undang-Undang Perlindungan Data Pribadi
                    (UU PDP) yang mulai berlaku penuh pada Oktober 2024. Setiap perubahan signifikan akan
                    diinformasikan melalui beberapa saluran:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Pertama, kami akan mengirimkan notifikasi email ke semua pengguna yang telah
                    memverifikasi akun mereka, menjelaskan ringkasan perubahan utama dan tanggal efektif
                    kebijakan baru. Kedua, saat Anda login ke platform setelah kebijakan diperbarui, kami
                    akan menampilkan banner persetujuan ulang yang meminta Anda untuk meninjau dan menyetujui
                    kebijakan terbaru sebelum dapat melanjutkan penggunaan.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Ketiga, untuk perubahan minor seperti pembaruan nama layanan atau koreksi editorial,
                    kami akan memperbarui tanggal "Terakhir diperbarui" di bagian atas kebijakan ini tanpa
                    memerlukan persetujuan eksplisit ulang. Dengan terus menggunakan layanan Daily Worker Hub
                    setelah adanya pemberitahuan perubahan, Anda dianggap telah menyetujui kebijakan yang
                    telah diperbarui tersebut.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Kami sangat mendorong Anda untuk secara berkala meninjau kebijakan ini, terutama
                    sebelum membuat transaksi Dana Jaminan besar atau menghubungkan metode pembayaran baru ke
                    akun Daily Worker Hub Anda. Jika Anda memiliki pertanyaan atau concerns tentang kebijakan
                    cookie kami, silakan hubungi tim kami melalui halaman Kontak yang tersedia di platform.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
