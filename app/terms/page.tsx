import type { Metadata } from "next";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { LegalToc, type TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - Daily Worker Hub",
  description: "Syarat dan Ketentuan Daily Worker Hub - Aturan dan ketentuan penggunaan platform marketplace pekerja harian Indonesia.",
  keywords: ["syarat ketentuan", "terms of service", "peraturan platform", "dailyworkerhub"],
  openGraph: {
    title: "Syarat & Ketentuan - Daily Worker Hub",
    description: "Syarat dan Ketentuan Daily Worker Hub - Aturan dan ketentuan penggunaan platform marketplace pekerja harian Indonesia.",
    url: "https://dailyworkerhub.com/terms",
    siteName: "Daily Worker Hub",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syarat & Ketentuan - Daily Worker Hub",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/terms",
  },
};

const tocItems: TocItem[] = [
  { id: "section-1", title: "1. Kelayakan Pengguna (Eligibility)" },
  { id: "section-2", title: "2. Jenis Pengguna dan Tanggung Jawab Mereka" },
  { id: "section-3", title: "3. Penggunaan yang Dilarang dalam Konteks Hospitality" },
  { id: "section-4", title: "4. Syarat Dana Jaminan dan Pembayaran" },
  { id: "section-5", title: "5. Resolusi Sengketa" },
  { id: "section-6", title: "6. Batasan Tanggung Jawab" },
  { id: "section-7", title: "7. Hak Kekayaan Intelektual" },
  { id: "section-8", title: "8. Penangguhan dan Penghentian Akun" },
  { id: "section-9", title: "9. Hukum yang Mengatur" },
  { id: "section-10", title: "10. Informasi Kontak" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <LegalToc items={tocItems} />

            <div className="flex-1 max-w-4xl">
              <div className="prose prose-invert prose-slate max-w-none space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-8">Syarat & Ketentuan</h1>
                <p className="text-muted-foreground leading-relaxed">
            Terakhir diperbarui: April 2026
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Kebijakan ini harus dibaca bersama dengan{" "}
            <a href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">Kebijakan Privasi</a>{" "}
            dan{" "}
            <a href="/cookies" className="text-emerald-400 hover:text-emerald-300 underline">Kebijakan Cookie</a>{" "}
            kami.
          </p>

          <section className="space-y-4">
            <h2 id="section-1" className="text-xl font-semibold text-foreground scroll-mt-24">1. Kelayakan Pengguna (Eligibility)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Untuk dapat menggunakan layanan Daily Worker Hub sebagai pekerja maupun pemberi kerja, 
              Anda harus memenuhi seluruh persyaratan kelayakan yang ditetapkan di bawah ini. 
              Dengan mendaftar dan menggunakan platform, Anda menyatakan dan menjamin bahwa 
              Anda memenuhi semua persyaratan ini.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Persyaratan Usia:</strong> Anda harus 
              berusia minimal 16 tahun pada saat pendaftaran. Pengguna di bawah 18 tahun 
              dianggap sebagai minor dan bertanggung jawab untuk memastikan bahwa mereka 
              memiliki persetujuan yang sah dari orang tua, wali, atau tutor hukum sebelum 
              menggunakan platform ini untuk aktivitas komersial apa pun. Daily Worker Hub 
              tidak memverifikasi status kedewasaan secara aktif tetapi berhak menangguhkan 
              akun jika ditemukan pelanggaran usia.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Identitas yang Valid:</strong> Setiap 
              pengguna wajib memberikan informasi identitas yang benar, akurat, dan 
              lengkap pada saat pendaftaran. Pekerja diharuskan memverifikasi identitas 
              mereka melalui sistem verifikasi yang kami sediakan, yang dapat mencakup 
              verifikasi nomor WhatsApp dan upload dokumen identitas resmi (KTP, SIM, 
              atau paspor). Pemberi Kerja diharuskan memverifikasi legalitas bisnis mereka 
              sebelum dapat membuat lowongan dan melakukan deposit Dana Jaminan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Jenis Kelayakan Blacklist:</strong> Pengguna 
              yang sebelumnya telah masuk daftar hitam dari platform Daily Worker Hub karena 
              pelanggaran berat — termasuk namun tidak terbatas pada penipuan, pelecehan, 
              atau pelanggaran Dana Jaminan — tidak diizinkan untuk membuat akun baru. Setiap 
              upaya untuk menghindari daftar hitam dengan membuat akun tambahan akan 
              dianggap sebagai pelanggaran serius dan dapat dikenakan tindakan hukum yang sesuai.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-2" className="text-xl font-semibold text-foreground scroll-mt-24">2. Jenis Pengguna dan Tanggung Jawab Mereka</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub membedakan antara dua jenis pengguna utama dengan hak dan 
              kewajiban yang berbeda. Memahami peran Anda sangat penting untuk 
              penggunaan platform yang efektif dan menghindari kesalahpahaman.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Pemberi Kerja (Pemberi Kerja):</strong> 
              Pemberi Kerja adalah bisnis atau individu di sektor hospitality Bali — seperti 
              hotel, restoran, kafe, bar, villa, atau event venue — yang menggunakan 
              Daily Worker Hub untuk merekrut pekerja harian. Tanggung jawab pemberi kerja 
              mencakup: membuat deskripsi lowongan yang akurat dan tidak misleading, 
              menetapkan harga yang wajar dan sesuai dengan standar industri Bali, 
              melakukan deposit dana ke Dana Jaminan sebelum pekerjaan dimulai, memverifikasi 
              attendance pekerja pada awal dan akhir shift, approve atau perselisihand pekerjaan 
              yang telah selesai dalam waktu 24 jam setelah submission, serta menjaga 
              profesionalisme dalam semua interaksi dengan pekerja. Pemberi Kerja yang gagal 
              memenuhi tanggung jawab ini dapat dikenai penalti termasuk suspension akun.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Pekerja (Pekerja Harian):</strong> 
              Pekerja adalah individu yang menggunakan Daily Worker Hub untuk menemukan 
              pekerjaan harian di sektor hospitality Bali. Tanggung jawab pekerja 
              mencakup: menyelesaikan profil dengan informasi yang accurate dan 
              portofolio yang dapat diverifikasi, submit attendance tepat waktu pada 
              awal dan akhir shift menggunakan fitur attendance di platform, 
              menyelesaikan pekerjaan sesuai dengan standar yang disepakati dengan 
              pemberi kerja, mengkomunikasikan masalah atau ketidakmampuan menyelesaikan 
              pekerjaan secepat mungkin agar pemberi kerja punya waktu untuk contingency, 
              serta menjaga profesionalisme dan etika kerja yang baik selama bekerja. 
              Pekerja yang tidak memenuhi tanggung jawab dapat menghadapi penalty, 
              negative reviews, atau blacklisting dari platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-3" className="text-xl font-semibold text-foreground scroll-mt-24">3. Penggunaan yang Dilarang dalam Konteks Hospitality</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub memiliki zero tolerance terhadap penyalahgunaan platform. 
              Berikut adalah penggunaan yang secara eksplisit dilarang, dengan 
              penjelasan khusus tentang bagaimana kebijakan ini berlaku dalam konteks 
              industri hospitality:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">No Show dan Menghilang:</strong> Pekerja 
              yang menerima pekerjaan namun gagal hadir di lokasi pemberi kerja tanpa 
              memberikan pemberitahuan yang cukup (minimal 2 jam sebelum shift dimulai) 
              akan diberikan sanksi berupa penangguhan sementara untuk 
              pelanggaran pertama. Pelanggaran berulang akan mengakibatkan daftar hitam permanen. 
              Pemberi Kerja yang setelah menyetujui pekerja kemudian membatalkan shift 
              kurang dari 12 jam sebelum waktunya tanpa alasan yang sah juga 
              akan menerima sanksi, karena hal ini menyebabkan pekerja kehilangan 
              kesempatan kerja lain.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Catatan Kehadiran Palsu:</strong> 
              Pekerja yang dengan sengaja memanipulasi fitur kehadiran — termasuk 
              menggunakan lokasi palsu (VPN untuk pemalsuan GPS), mencatat kehadiran 
              atas nama pekerja lain, atau menggunakan foto/tangkapan layar palsu untuk 
              check-in — akan langsung dimasukkan daftar hitam dan Dana Jaminan yang tersimpan 
              dapat hangus. Pemberi Kerja yang secara sengaja memanipulasi catatan untuk 
              menghindari pembayaran juga akan menghadapi konsekuensi yang sama. 
              Daily Worker Hub berhak memberikan data kehadiran historis kepada 
              pemberi kerja yang terdampak untuk keperluan verifikasi.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Standar Kualitas Kerja:</strong> 
              Pekerja diharapkan menyelesaikan pekerjaan sesuai dengan standar yang 
              wajar untuk posisi masing-masing. Pemberi Kerja yang menemukan kualitas 
              kerja yang tidak memuaskan harus mengomunikasikan hal ini melalui sistem 
              platform dalam 24 jam setelah pekerjaan selesai. Pekerja yang secara 
              berulang menerima keluhan tentang kualitas kerja — setelah mediasi 
              dan kesempatan untuk memperbaiki — dapat dimasukkan daftar hitam. Tidak termasuk 
              dalam kategori ini adalah perbedaan pendapat yang normal tentang 
              preferensi kerja, selama pekerjaan memenuhi standar minimum yang dapat diterima.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Pelecehan dan Perilaku Tidak Profesional:</strong> 
              Semua bentuk pelecehan — termasuk namun tidak terbatas pada pelecehan 
              seksual, komentar diskriminatif berdasarkan agama, suku, gender, atau 
              orientasi seksual, perundungan, atau intimidasi — baik dari pemberi kerja maupun 
              pekerja dilarang mutlak dan dapat dilaporkan melalui sistem perselisihan. 
              Dalam kasus yang terbukti, pelaku akan dimasukkan daftar hitam secara permanen tanpa 
              kesempatan banding, dan dalam kasus yang melibatkan ancaman fisik atau 
              seksual, kami akan menyerahkan bukti kepada otoritas yang berwenang.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Transaksi di Luar Platform:</strong> 
              Baik pemberi kerja maupun pekerja dilarang melakukan transaksi keuangan 
              secara langsung di luar Sistem Dana Jaminan Daily Worker Hub untuk menghindari 
              biaya platform. Violasi ini akan mengakibatkan suspension akun dan 
              disqualifikasi dari platform, karena hal ini juga menghilangkan 
              proteksi buyer/seller yang menjadi core value proposition kami.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-4" className="text-xl font-semibold text-foreground scroll-mt-24">4. Syarat Dana Jaminan dan Pembayaran</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sistem Dana Jaminan adalah jantung dari kepercayaan dalam platform Daily Worker Hub. 
              Dengan menggunakan platform, Anda agreeing untuk terikat dengan syarat-syarat 
              Dana Jaminan berikut yang kami jelaskan secara detail di bawah ini.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Deposit oleh Pemberi Kerja:</strong> Sebelum 
              pekerjaan dimulai, pemberi kerja wajib melakukan deposit dana ke Sistem Dana Jaminan 
              Daily Worker Hub sebesar jumlah yang disepakati dengan pekerja untuk jasa 
              pekerjaan harian tersebut. Dana ini dihold oleh platform dan tidak dapat 
              dicairkan oleh pemberi kerja selama pekerjaan sedang dalam proses. Deposit 
              dilakukan melalui metode pembayaran yang kami support — saat ini mencakup 
              transfer bank lokal Indonesia dan virtual account — dan dana deposit 
              akan shown sebagai "pending" di dashboard pemberi kerja sampai pekerjaan dimulai.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Release Dana kepada Pekerja:</strong> 
              Setelah pekerja menyelesaikan pekerjaan dan submit completion notice, 
              pemberi kerja memiliki jendela 24 jam untuk memverifikasi kualitas dan kuantitas 
              pekerjaan. Jika pemberi kerja puas, mereka approve release dana dan Dana Jaminan 
              akan ditransfer ke wallet pekerja di platform. Pekerja kemudian dapat 
              melakukan withdrawal ke rekening bank mereka. Withdrawal biasanya 
              memakan waktu 1-3 hari kerja tergantung bank tujuan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Perselisihan Dana Jaminan:</strong> Jika pemberi kerja 
              tidak puas dengan pekerjaan, mereka dapat mengajukan perselisihan dalam 24 jam setelah 
              pengajuan. Dana akan tetap ditahan di Dana Jaminan sampai perselisihan diselesaikan melalui 
              proses mediasi kami. Selama perselisihan, baik pemberi kerja maupun pekerja dapat 
              menyerahkan bukti-bukti pendukung — foto hasil kerja, riwayat percakapan, catatan 
              kehadiran — untuk memperkuat posisi mereka. Tim mediasi kami akan 
              memutuskan berdasarkan bukti yang ada. Jika perselisihan tidak dapat diselesaikan 
              secara internal, akan diarahkan ke arbitrase.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Biaya Transaksi:</strong> Daily Worker Hub 
              mengenakan Biaya Platform kecil untuk setiap transaksi Dana Jaminan yang berhasil. 
              Biaya ini dipotong dari jumlah kotor Dana Jaminan sebelum dana dicairkan ke pekerja. 
              Besaran biaya transparan dan ditampilkan kepada pemberi kerja sebelum deposit 
              dilakukan, sehingga tidak ada biaya tersembunyi. Pemberi Kerja menanggung 
              seluruh Biaya Platform agar pekerja menerima jumlah bersih yang disepakati.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-5" className="text-xl font-semibold text-foreground scroll-mt-24">5. Resolusi Sengketa</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub menyediakan proses resolusi perselisihan bertingkat untuk menangani 
              konflik antara pemberi kerja dan pekerja. Tujuan kami adalah menyelesaikan perselisihan 
              secara adil, cepat, dan dengan biaya minimal bagi kedua belah pihak.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Mediasi Internal:</strong> Sengketa pertama-tama 
              akan ditangani melalui proses mediasi internal yang dilakukan oleh tim 
              customer success kami. Kedua belah pihak diminta untuk menyerahkan penjelasan 
              tertulis tentang perspektif mereka dalam waktu 48 jam setelah perselisihan 
              dimulai. Tim mediasi kemudian meninjau bukti-bukti yang diserahkan — 
              termasuk catatan kehadiran, riwayat percakapan, foto, dan lainnya — dan memberikan 
              rekomendasi penyelesaian dalam waktu 5 hari kerja. Rekomendasi ini tidak 
              bersifat mengikat tetapi mayoritas perselisihan terselesaikan pada tahap ini.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Arbitrase:</strong> Jika mediasi tidak 
              mencapai kesepakatan, perselisihan akan naik ke tahap arbitrase di mana 
              seorang arbiter independen — yang ditunjuk oleh Daily Worker Hub dari 
              panel profesional yang memiliki pengalaman di industri hospitality — 
              akan memberikan keputusan yang mengikat bagi kedua belah pihak. Keputusan 
              arbiter bersifat final dan tidak dapat diajukan banding melalui platform. 
              Biaya arbitrase akan dibebankan kepada pihak yang kalah, kecuali 
              arbiter memutuskan lain karena keadaan yang luar biasa.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Batasan Platform:</strong> Perlu 
              dicatat bahwa Daily Worker Hub bertindak sebagai perantara saja. 
              Kami tidak menjamin hasil tertentu dalam perselisihan dan tidak memiliki 
              kewajiban untuk menyediakan ganti rugi di luar jumlah Dana Jaminan yang 
              tersimpan di platform untuk transaksi yang diperselisihkan. Pengguna yang tidak 
              setuju dengan keputusan arbitrase masih dapat menempuh upaya hukum melalui 
              jalur hukum yang tersedia di Indonesia.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-6" className="text-xl font-semibold text-foreground scroll-mt-24">6. Batasan Tanggung Jawab</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub didirikan sebagai platform yang memfasilitasi pertukaran 
              tenaga kerja di sektor hospitality, bukan sebagai pihak yang secara 
              langsung mempekerjakan atau menyediakan pekerja. Keterangan ini penting 
              untuk dipahami agar ekspektasi Anda terhadap platform sesuai dengan 
              kenyataan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Platform sebagai Perantara:</strong> 
              Daily Worker Hub tidak pernah menjadi pihak dalam kontrak pekerjaan antara 
              pemberi kerja dan pekerja. Kami menyediakan platform untuk mempertemukan kedua 
              belah pihak, memfasilitasi pembayaran Dana Jaminan, dan menyediakan alat 
              untuk manajemen kehadiran dan komunikasi. Kami tidak mengawasi langsung 
              pekerjaan yang dilakukan pekerja di lokasi pemberi kerja, tidak bertanggung 
              jawab atas kualitas hasil kerja, dan tidak memiliki kontrol atas 
              lingkungan kerja di tempat pemberi kerja.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Keadaan Kahar:</strong> Daily Worker Hub 
              tidak bertanggung jawab atas kegagalan atau penundaan pemenuhan 
              kewajiban kami yang disebabkan oleh peristiwa di luar kendali kami yang 
              wajar — termasuk namun tidak terbatas pada bencana alam (gempa 
              bumi, tsunami, letusan gunung berapi), wabah atau pandemi yang 
              memerlukan karantina wilayah, kebijakan pemerintah yang secara tiba-tiba 
              melarang kegiatan bisnis tertentu, pemadaman listrik atau internet 
              yang meluas, atau kegagalan infrastruktur pihak ketiga yang 
              penting (seperti penyedia pembayaran atau infrastruktur) yang berada di luar kendali kami.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Ganti Rugi:</strong> Dalam keadaan 
              apa pun yang diizinkan oleh hukum yang berlaku, Daily Worker Hub, 
              direksi, pekerja, dan afiliasi kami tidak akan bertanggung jawab atas 
              kerugian tidak langsung, insidental, khusus, konsekuensial, atau ganti rugi 
              hukuman yang timbul dari penggunaan atau ketidakmampuan menggunakan platform, 
              termasuk namun tidak terbatas pada kehilangan keuntungan, kehilangan data, 
              atau kehilangan kesempatan yang terkait dengan pekerjaan yang gagal atau pekerja 
              yang tidak hadir. Tanggung jawab kami dalam hal apa pun terbatas pada jumlah 
              total biaya yang telah Anda bayarkan kepada kami dalam 12 bulan sebelum 
              kejadian yang menimbulkan klaim.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-7" className="text-xl font-semibold text-foreground scroll-mt-24">7. Hak Kekayaan Intelektual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Seluruh konten yang tersedia di platform Daily Worker Hub — termasuk namun 
              tidak terbatas pada logo, merek dagang, desain antarmuka, teks, grafik, 
              ikon tombol, dan kode software — adalah milik Daily Worker Hub atau 
              pemberi lisensinya dan dilindungi oleh undang-undang hak cipta, merek 
              dagang, dan kekayaan intelektual Indonesia dan internasional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Konten Pengguna:</strong> Pengguna 
              tetap memiliki kepemilikan atas konten yang mereka serahkan ke platform — 
              termasuk deskripsi lowongan kerja yang dibuat oleh pemberi kerja, foto dan 
              portofolio pekerja, dan pesan percakapan. Dengan memposting konten di 
              platform, Anda memberikan Daily Worker Hub lisensi non-eksklusif, 
              seluruh dunia, bebas royalti untuk menggunakan, mereproduksi, memodifikasi, 
              dan mendistribusikan konten tersebut semata-mata untuk tujuan operasional 
              platform — misalnya menampilkan deskripsi lowongan kepada kandidat yang 
              sesuai atau menyimpan portofolio pekerja untuk ditampilkan kepada pemberi kerja.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Penggunaan yang Dilarang:</strong> 
              Anda tidak diperkenankan untuk menyalin, mereproduksi, membingkai, mengikis, 
              atau secara sistematis mengekstrak konten platform untuk tujuan komersial 
              tanpa persetujuan tertulis dari kami. Penggunaan data atau konten platform 
              untuk melatih model pembelajaran mesin atau sistem AI tanpa izin juga 
              merupakan pelanggaran hak kekayaan intelektual kami.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-8" className="text-xl font-semibold text-foreground scroll-mt-24">8. Penangguhan dan Penghentian Akun</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub berhak menangguhkan atau menghentikan akun pengguna dalam 
              kondisi-kondisi tertentu yang telah kami tentukan. Berikut adalah 
              penjelasan mengenai kondisi-kondisi tersebut:
            </p>
              <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Suspension Sementara:</strong> 
              Akun dapat ditangguhkan sementara untuk investigasi jika kami 
              mencurigai adanya aktivitas yang mencurigakan — termasuk namun tidak 
              terbatas pada login dari berbagai lokasi yang tidak lazim, 
              pola transaksi yang tidak sesuai dengan pola penggunaan normal, 
              atau laporan dari pengguna lain tentang perilaku yang mencurigakan. 
              Selama periode penangguhan, pengguna tidak dapat login atau menggunakan 
              fungsionalitas platform. Investigasi akan diselesaikan dalam waktu 
              maksimal 14 hari, dan akun akan dipulihkan jika investigasi membuktikan 
              bahwa tidak ada pelanggaran.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Penangguhan dengan Sebab:</strong> 
              Akun dapat ditangguhkan untuk durasi yang lebih panjang — mulai dari 
              7 hari hingga 90 hari — sebagai sanksi untuk pelanggaran sedang 
              seperti ketidakhadiran berulang, kegagalan menanggapi perselisihan, atau 
              penggunaan platform yang tidak profesional. Selama periode penangguhan, 
              pengguna kehilangan akses ke fitur-fitur platform tetapi data mereka 
              tetap disimpan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Penghentian Permanen (Daftar Hitam):</strong> 
              Akun dapat dihentikan secara permanen dan pengguna dimasukkan daftar hitam dari 
              platform untuk pelanggaran berat seperti: penipuan atau pengkhianatan 
              kepercayaan Dana Jaminan, pelecehan atau diskriminasi yang terbukti, 
              manipulasi kehadiran atau sistem, pembuatan banyak akun untuk 
              menghindari daftar hitam, atau aktivitas ilegal menggunakan platform. 
              Pengguna yang masuk daftar hitam kehilangan akses permanen ke akun dan data 
              mereka, dan tidak diizinkan untuk membuat akun baru dengan data yang sama.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Penghentian Mandiri:</strong> Pengguna 
              dapat secara sukarela menonaktifkan akun mereka kapan saja melalui menu 
              pengaturan di dasbor. Akun yang dinonaktifkan akan memasuki masa tenggang 
              30 hari di mana akun dapat dipulihkan. Setelah 30 hari, akun akan 
              dihapus secara permanen namun data transaksi akan disimpan untuk 
              kepatuhan sesuai kebijakan retensi kami.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-9" className="text-xl font-semibold text-foreground scroll-mt-24">9. Hukum yang Mengatur</h2>
            <p className="text-muted-foreground leading-relaxed">
              Syarat dan Ketentuan ini, serta setiap perselisihan atau klaim yang timbul 
              dari atau terkait dengan nya, diatur oleh dan ditafsirkan sesuai dengan 
              hukum Republik Indonesia tanpa memperhatikan principles of conflict of laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Yurisdiksi:</strong> Anda setuju bahwa 
              setiap perselisihan yang tidak dapat diselesaikan melalui proses mediasi 
              dan arbitrase internal kami akan diajukan kepada pengadilan yang memiliki 
              yurisdiksi di wilayah hukum Negara Republik Indonesia, spesifiknya 
              adalah Pengadilan Negeri Jakarta Selatan sebagai pengadilan tingkat pertama, 
              kecuali untuk pengguna di wilayah lain di Indonesia yang secara khusus 
              setuju untuk menggunakan pengadilan lain yang lebih dekat dengan domisili mereka.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Kepatuhan Hukum Indonesia:</strong> 
              Daily Worker Hub dioperasikan sebagai platform yang sepenuhnya patuh terhadap 
              peraturan perundang-undangan Indonesia yang berlaku, termasuk namun tidak 
              terbatas pada UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik 
              (ITE), UU No. 14 Tahun 2019 tentang Perlindungan Data Pribadi (UU PDP), 
              serta regulasi perpajakan yang berlaku untuk platform digital dan transaksi 
              Dana Jaminan. Pengguna bertanggung jawab untuk memastikan bahwa penggunaan 
              platform mereka juga mematuhi semua hukum yang berlaku di yurisdiksi 
              masing-masing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-10" className="text-xl font-semibold text-foreground scroll-mt-24">10. Informasi Kontak</h2>
            <p className="text-muted-foreground leading-relaxed">
              Baik pemberi kerja maupun pekerja dilarang melakukan transaksi keuangan 
              secara langsung di luar Sistem Dana Jaminan Daily Worker Hub untuk menghindari 
              biaya platform. Pelanggaran ini akan mengakibatkan penangguhan akun dan 
              diskualifikasi dari platform, karena hal ini juga menghilangkan 
              perlindungan pembeli/penjual yang menjadi proposisi nilai inti kami.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Email:</strong> Hubungi tim customer 
              support kami di support@dailyworkerhub.com untuk pertanyaan umum tentang 
              penggunaan platform, atau di legal@dailyworkerhub.com untuk permintaan 
              yang berkaitan aspek hukum dari Syarat dan Ketentuan. Kami berupaya untuk 
              merespons dalam 2-3 hari kerja.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Dalam Platform:</strong> Untuk 
              pertanyaan tentang akun atau perselisihan yang sedang berjalan, gunakan 
              fitur percakapan yang tersedia di dasbor untuk terhubung dengan tim 
              customer success kami secara langsung.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Situs Web:</strong> Kunjungi halaman 
              Hubungi Kami di dailyworkerhub.com untuk informasi kontak lengkap 
              termasuk alamat kantor kami, nomor telepon yang dapat 
              dihubungi selama jam kerja (09:00-17:00 WIB), dan formulir 
              kontak untuk permintaan spesifik.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Kami menghargai kepercayaan Anda menggunakan Daily Worker Hub sebagai 
              mitra dalam perekrutan pekerja di industri hospitality. Kami 
              akan terus berusaha untuk menyediakan platform yang aman, adil, 
              dan efektif untuk seluruh pengguna kami.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Dalam Platform:</strong> Untuk 
              pertanyaan tentang akun atau perselisihan yang sedang berjalan, gunakan 
              fitur chat yang tersedia di dashboard untuk connected dengan tim 
              customer success kami secara langsung.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Website:</strong> Kunjungi halaman 
              Hubungi Kami di dailyworkerhub.com untuk informasi kontak lengkap 
              termasuk alamat kantor kami di Bali, nomor telepon yang dapat 
              dihubungi selama jam kerja (09:00-17:00 WITA), dan formulir 
              kontak untuk request spesifik.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Kami appreciate kepercayaan Anda menggunakan Daily Worker Hub sebagai 
              partner dalam perekrutan pekerja di industri hospitality Bali. Kami 
              akan terus berusaha untuk menyediakan platform yang aman, adil, 
              dan efektif для seluruh pengguna kami.
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
