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
  { id: "section-4", title: "4. Syarat Escrow dan Pembayaran" },
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

          <section className="space-y-4">
            <h2 id="section-1" className="text-xl font-semibold text-foreground scroll-mt-24">1. Kelayakan Pengguna (Eligibility)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Untuk dapat menggunakan layanan Daily Worker Hub sebagai worker maupun employer, 
              Anda harus memenuhi seluruh persyaratan kelayakan yang ditetapkan di bawah ini. 
              Dengan mendaftar dan menggunakan platform, Anda menyatakan dan menjamin bahwa 
              Anda memenuhi semua persyaratan ini.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Persyaratan Usia:</strong> Anda harus 
              berusia minimal 16 tahun pada saat pendaftaran. Pengguna di bawah 18 tahun 
              dianggap sebagai minor dan bertanggung jawab untuk memastikan bahwa mereka 
              memiliki persetujuan yang sah dari orang tua, wali, atau tutor hukum sebelum 
              menggunakan platform ini untuk aktivitas komersial apapun. Daily Worker Hub 
              tidak memverifikasi status perkakas secara aktif tetapi berhak menangguhkan 
              akun jika ditemukan pelanggaran usia.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Identitas yang Valid:</strong> Setiap 
              pengguna wajib memberikan informasi identitas yang benar, akurat, dan 
              lengkap pada saat pendaftaran. Worker diharuskan memverifikasi identitas 
              mereka melalui sistem verifikasi yang kami sediakan, yang dapat mencakup 
              verifikasi nomor WhatsApp dan upload dokumen identitas resmi (KTP, SIM, 
              atau paspor). Employer diharuskan memverifikasi legalitas bisnis mereka 
              sebelum dapat membuat lowongan dan melakukan deposit dana escrow.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Status Blacklist:</strong> Pengguna 
              yang sebelumnya telah di-blacklist dari platform Daily Worker Hub karena 
              pelanggaran berat — termasuk namun tidak terbatas pada fraud, harassment, 
              atau pelanggaran escrow — tidak diizinkan untuk membuat akun baru. Setiap 
              attempt untuk menghindari blacklist dengan membuat akun tambahan akan 
              dianggap sebagai pelanggaran serius dan dapat tindakan hukum yang sesuai.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-2" className="text-xl font-semibold text-foreground scroll-mt-24">2. Jenis Pengguna dan Tanggung Jawab Mereka</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub membedakan antara dua jenis pengguna utama dengan hak dan 
              kewajiban yang berbeda. Memahami peran Anda sangat penting untuk 
              penggunaan platform yang efektif dan menghindari misunderstandings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Employer (Pemberi Kerja):</strong> 
              Employer adalah bisnis atau individu di sektor hospitality Bali — seperti 
              hotel, restoran, kafe, bar, villa, atau event venue — yang menggunakan 
              Daily Worker Hub untuk merekrut worker harian. Tanggung jawab employer 
              mencakup: membuat deskripsi lowongan yang akurat dan tidak misleading, 
              menetapkan harga yang wajar dan sesuai dengan standar industri Bali, 
              melakukan deposit dana ke escrow sebelum pekerjaan dimulai, memverifikasi 
              attendance worker pada awal dan akhir shift, approve atau disputed pekerjaan 
              yang telah selesai dalam waktu 24 jam setelah submission, serta menjaga 
              profesionalisme dalam semua interaksi dengan worker. Employer yang gagal 
              memenuhi tanggung jawab ini dapat dikenai penalti termasuk suspension akun.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Worker (Pekerja Harian):</strong> 
              Worker adalah individu yang menggunakan Daily Worker Hub untuk menemukan 
              pekerjaan harian di sektor hospitality Bali. Tanggung jawab worker 
              mencakup: menyelesaikan profil dengan informasi yang accurate dan 
              portofolio yang dapat diverifikasi, submit attendance tepat waktu pada 
              awal dan akhir shift menggunakan fitur attendance di platform, 
              menyelesaikan pekerjaan sesuai dengan standar yang disepakati dengan 
              employer, mengkomunikasikan masalah atau ketidakmampuan menyelesaikan 
              pekerjaan secepat mungkin agar employer punya waktu untuk contingency, 
              serta menjaga profesionalisme dan etika kerja yang baik selama bekerja. 
              Worker yang tidak memenuhi tanggung jawab dapat menghadapi penalty, 
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
              <strong className="text-foreground">No Show dan Ghosting:</strong> Worker 
              yang accepted sebuah job namun gagal muncul di lokasi employer tanpa 
              memberikan notice yang cukup (minimal 2 jam sebelum shift dimulai) 
              akan diberikan penalty berupa suspension sementara untuk pertama 
              pelanggaran. Violasi berulang akan mengakibatkan permanent blacklist. 
              Employer yang setelah mengapprove worker kemudian membatalkan shift 
              less dari 12 jam sebelum waktunya tanpa alasan yang valid juga 
              akan menerima penalty, karena hal ini menyebabkan worker kehilangan 
             机会 kerja lain.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Catatan Attendance Palsu:</strong> 
              Worker yang dengan sengaja memanipulasi fitur attendance — termasuk 
              menggunakan lokasi palsu (VPN untuk spoofing GPS), submit attendance 
              behalf of worker lain, atau menggunakan foto/screenshot palsu untuk 
              check-in — akan langsung di-blacklist dan dana escrow yang tersimpan 
              dapat hangus. Employer yang secara sengaja memanipulasi records untuk 
              menghindari pembayaran juga akan menghadapi konsekuensi yang sama. 
              Daily Worker Hub berhak memberikan historical data attendance kepada 
              employer yang affected untuk keperluan verificação.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Standar Kualitas Kerja:</strong> 
              Worker diharapkan menyelesaikan pekerjaan sesuai dengan standar yang 
              reasonable untuk posisi masing-masing. Employer yang menemukan kualitas 
              kerja yang tidak memuaskan harus mengkomunikasikan hal ini melalui sistem 
              platform dalam 24 jam setelah pekerjaan selesai. Worker yang secara 
              berulang menerima complaints tentang kualitas kerja — setelah mediation 
              dan kesempatan untuk improve — dapat di-blacklist. Yang tidak termasuk 
              dalam kategori ini adalah differences of opinion yang normal tentang 
              preferensi kerja, selama pekerjaan meet minimum acceptable standards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Harassment dan Perilaku Tidak Profesional:</strong> 
              Semua bentuk harassment — termasuk namun tidak terbatas pada harassment 
              seksual, discriminatory comments berdasarkan agama, suku, gender, atau 
              orientasi seksual, bullying, atau intimidation — baik dari employer maupun 
              worker adalah dilarang mutlak dan dapat dilaporkan melalui sistem dispute. 
              Dalam kasus yang validated, pelaku akan di-blacklist secara permanen tanpa 
              kesempatan appeal, dan dalam kasus yang melibatkan ancaman fisik atau 
              seksual, kami akan menyerahkan evidence kepada otoritas yang berwenang.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Transaksi di Luar Platform:</strong> 
              Baik employer maupun worker dilarang melakukan transaksi keuangan 
              secara langsung di luar sistem escrow Daily Worker Hub untuk menghindari 
              biaya platform. Violasi ini akan mengakibatkan suspension akun dan 
              disqualifikasi dari platform, karena hal ini juga menghilangkan 
              proteksi buyer/seller yang menjadi core value proposition kami.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-4" className="text-xl font-semibold text-foreground scroll-mt-24">4. Syarat Escrow dan Pembayaran</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sistem escrow adalah jantung dari kepercayaan dalam platform Daily Worker Hub. 
              Dengan menggunakan platform, Anda agreeing untuk terikat dengan syarat-syarat 
              escrow berikut yang kami jelaskan secara detail di bawah ini.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Deposit oleh Employer:</strong> Sebelum 
              pekerjaan dimulai, employer wajib melakukan deposit dana ke escrow system 
              Daily Worker Hub sebesar jumlah yang disepakati dengan worker untuk jasa 
              pekerjaan harian tersebut. Dana ini dihold oleh platform dan tidak dapat 
              dicairkan oleh employer selama pekerjaan sedang dalam proses. Deposit 
              dilakukan melalui metode pembayaran yang kami support — saat ini mencakup 
              transfer bank lokal Indonesia dan Xendit virtual account — dan dana deposit 
              akan shown sebagai "pending" di dashboard employer sampai pekerjaan dimulai.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Release Dana kepada Worker:</strong> 
              Setelah worker menyelesaikan pekerjaan dan submit completion notice, 
              employer memiliki jendela 24 jam untuk memverifikasi kualitas dan kuantitas 
              pekerjaan. Jika employer puas, mereka approve release dana dan dana escrow 
              akan ditransfer ke wallet worker di platform. Worker kemudian dapat 
              melakukan withdrawal ke rekening bank mereka. Withdrawal biasanya 
              memakan waktu 1-3 hari kerja tergantung bank tujuan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Dispute Escrow:</strong> Jika employer 
              tidak puas dengan pekerjaan, mereka dapat raise dispute dalam 24 jam setelah 
              submission. Dana akan tetap dihold di escrow sampai dispute resolved melalui 
              proses mediation kami. Selama dispute, baik employer maupun worker dapat 
              submit bukti-bukti pendukung — foto hasil kerja, chat logs, attendance 
              records — untuk memperkuat posisi mereka. Tim mediation kami akan 
              memutuskan berdasarkan bukti yang ada. Jika dispute tidak dapat resolved 
              secara internal, akan diarahkan ke arbitration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Biaya Transaksi:</strong> Daily Worker Hub 
              mengenakan small fee platform untuk setiap transaksi escrow yang berhasil. 
              Fee ini deducted dari jumlah gross escrow sebelum dana released ke worker. 
              Besaran fee transparan dan ditampilkan kepada employer sebelum deposit 
              dilakukan, sehingga tidak ada biaya tersembunyi. Employer menanggung 
              seluruh fee platform agar worker menerima net amount yang disepakati.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-5" className="text-xl font-semibold text-foreground scroll-mt-24">5. Resolusi Sengketa</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub menyediakan proses resolusi sengketa bertingkat untuk menangani 
              konflik antara employer dan worker. Tujuan kami adalah menyelesaikan sengketa 
              secara adil, cepat, dan dengan biaya minimal bagi kedua belah pihak.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Mediasi Internal:</strong> Sengketa pertama-tama 
              akan ditangani melalui proses mediasi internal yang dilakukan oleh tim 
              customer success kami. Kedua belah pihak diminta untuk submit penjelasan 
              tertulis tentang perspektif mereka dalam waktu 48 jam setelah dispute 
              initiated. Tim mediation kemudian review bukti-bukti yang submitted — 
              termasuk attendance records, chat logs, foto, dan lainnya — dan memberikan 
              rekomendasi resolution dalam waktu 5 hari kerja. Рекомендация ini tidak 
              bersifat mengikat tetapi большинность sengketa terselesaikan pada tahap ini.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Arbitrasi:</strong> Jika mediasi tidak 
              mencapai kesepakatan, sengketa akan naik ke tahap arbitration di mana 
              seorang arbiter independen — yang ditunjuk oleh Daily Worker Hub dari 
              panel专业人士 yang memiliki pengalaman di industri hospitality Bali — 
              akan memberikan keputusan yang mengikat bagi kedua belah pihak. Keputusan 
              arbiter bersifat final dan tidak dapat di-appeal melalui platform. 
              Biaya arbitration akan dibebankan kepada pihak yanglose, kecuali 
              arbiter memutuskan lain karena circunstans yang exceptional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Batasan Platform:</strong> Perlu 
              dicatat bahwa Daily Worker Hub bertindak sebagai intermediary saja. 
              Kami tidak menjamin outcomes tertentu dalam sengketa dan tidak memiliki 
              kewajiban untuk menyediakan ganti rugi di luar jumlah dana escrow yang 
              tersimpan di platform untuk transaksi yang disputed. Pengguna yang tidak 
              согласны dengan keputusan arbitration masih dapat pursue remedies melalui 
              jalur hukum yang tersedia di Indonesia.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-6" className="text-xl font-semibold text-foreground scroll-mt-24">6. Batasan Tanggung Jawab</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Worker Hub didirikan sebagai platform yang memfasilitasi pertukaran 
              tenaga kerja di sektor hospitality, bukan sebagai pihak yang secara 
              langsung mempekerjakan atau menyediakan worker. Keterangan ini penting 
              untuk dipahami agar ekspektasi Anda terhadap platform sesuai dengan 
              kenyataan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Platform sebagai Intermediary:</strong> 
              Daily Worker Hub tidak pernah menjadi pihak dalam kontrak pekerjaan antara 
              employer dan worker. Kami menyediakan platform untuk mempertemukan kedua 
              belah pihak, memfasilitasi pembayaran escrow, dan menyediakan tools 
              untuk manajemen attendance dan komunikasi. Kami tidak supervisi langsung 
              pekerjaan yang dilakukan worker di lokasi employer, tidak bertanggung 
              jawab atas kualitas hasil kerja, dan tidak memiliki kontrol atas 
              lingkungan kerja di tempat employer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Force Majeure:</strong> Daily Worker Hub 
              tidak bertanggung jawab atas kegagalan atau penundaan выполнения 
              obligations kami yang disebabkan oleh события diluar kendali kami yang 
              reasonable — termasuk namun tidak terbatas pada bencana alam (gempa 
              bumi, tsunami, letusan Gunung Agung), epidemic atau pandemic yang 
              memerlukan lockdown, kebijakan pemerintah yang secara tiba-tiba 
              melarang kegiatan bisnis tertentu, pemadaman listrik atau internet 
              yang widespread, atau kegagalan infrastruktur pihak ketiga yang 
              essential (seperti Xendit atau Supabase) yang berada di luar kendali kami.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Ganti Rugi:</strong> Dalam tidak 
              ada circunstans where applicable law does not allow it, Daily Worker Hub, 
              directors, employees, dan affiliates kami tidak akan liable untuk 
              indirect, incidental, special, consequential, atau punitive damages 
              yang arising dari penggunaan atau ketidakmampuan menggunakan platform, 
              termasuk namun tidak terbatas pada lost profits, lost data, atau lost 
              opportunity yang связаны dengan pekerjaan yang failed atau worker yang 
              tidak show up. Liability kami dalam hal apapun terbatas pada jumlah 
              total fee yang telah Anda bayarkan kepada kami dalam 12 months preceding 
              the incident yang memberikan rise kepada klaim.
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
              tetap memiliki kepemilikan atas konten yang mereka submit ke platform — 
              termasuk deskripsi lowongan kerja yang dibuat oleh employer, foto dan 
              portofolio worker, dan chat messages. Dengan memposting konten di 
              platform, Anda memberikan Daily Worker Hub license non-exclusive, 
              worldwide, royalty-free untuk menggunakan, mereproduksi, memodifikasi, 
              dan mendistribusikan konten tersebut semata-mata untuk tujuan операционные 
              platform — misalnya menampilkan deskripsi lowongan kepada candidate yang 
              sesuai atau menyimpan portofolio worker untuk ditampilkan kepada employer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Penggunaan yang Dilarang:</strong> 
              Anda tidak diperkenankan untuk menyalin, reproduksi, frame, scrape, 
              atau secara sistematis mengekstrak konten platform untuk tujuan komersial 
              tanpa persetujuan tertulis dari kami. Penggunaan data atau konten platform 
              untuk training machine learning models atau AI systems tanpa izin juga 
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
              terbatas pada login dari multiple locations yang tidak lazim, 
              pola transaksi yang tidak sesuai dengan usage patterns normal, 
              atau laporan dari pengguna lain tentang perilaku yang mencurigakan. 
              Durante periode suspension, pengguna tidak dapat login atau menggunakan 
              fungsionalitas platform. Investigasi akan diselesaikan dalam waktu 
              maksimal 14 hari, dan akun akan dipulihkan jika investigasi membuktikan 
              bahwa tidak ada pelanggaran.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Suspension dengan Cause:</strong> 
              Akun dapat ditangguhkan untuk durasi yang lebih panjang — mulai dari 
              7 hari hingga 90 hari — sebagai penalty untuk pelanggaran sedang 
              seperti repeated no-shows, failure to respond to dispute, atau 
              penggunaan platform yang tidak profesional. Selama periode suspension, 
              pengguna kehilangan akses ke fitur-fitur platform tetapi data mereka 
              tetap disimpan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Termination Permanen (Blacklist):</strong> 
              Akun dapat dihentikan secara permanen dan pengguna di-blacklist dari 
              platform untuk pelanggaran berat seperti: fraud atau pengkhianatan 
              kepercayaan escrow, harassment atau diskriminasi yang validated, 
              manipulasi attendance atau sistem, pembuatan multiple akun untuk 
              menghindari blacklist, atau aktivitas illegal menggunakan platform. 
              Pengguna yang di-blacklist kehilangan akses permanen ke akun dan data 
              mereka, dan tidak diizinkan untuk membuat akun baru dengan data yang sama.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Self-Termination:</strong> Pengguna 
              dapat secara sukarela deactivate akun mereka kapan saja melalui settings 
              menu di dashboard. Akun yang di-deactivate akan memasuki grace period 
              30 hari di mana akun dapat di-restore. Setelah 30 hari, akun akan 
              dihapus secara permanen namun data transaksi akan disimpan untuk 
              compliance sesuai kebijakan retensi kami.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-9" className="text-xl font-semibold text-foreground scroll-mt-24">9. Hukum yang Mengatur</h2>
            <p className="text-muted-foreground leading-relaxed">
              Syarat dan Ketentuan ini, serta setiap sengketa atau klaim yang timbul 
              dari atau terkait dengan nya, diatur oleh dan ditafsirkan sesuai dengan 
              hukum Republik Indonesia tanpa memperhatikan principles of conflict of laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Yurisdiksi:</strong> Anda agree bahwa 
              setiap sengketa yang tidak dapat diselesaikan melalui proses mediasi 
              dan arbitration internal kami akan diajukan kepada courts yang memiliki 
              jurisdiction di wilayah hukum Negara Republik Indonesia, конкретноnya 
              adalah Pengadilan Negeri Jakarta Selatan sebagai courts dari first instance, 
              kecuali для пользователей в других регионах Indonesia yang secara khusus 
              agree untuk menggunakan courts lain yang lebih dekat dengan domisili mereka.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Kepatuhan Hukum Indonesia:</strong> 
              Daily Worker Hub dioperasikan sebagai platform yang fully compliant dengan 
              peraturan perundang-undangan Indonesia yang berlaku, termasuk namun tidak 
              terbatas pada UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik 
              (ITE), UU No. 14 Tahun 2019 tentang Perlindungan Data Pribadi (UU PDP), 
              serta regulasi perpajakan yang berlaku untuk platform digital dan transaksi 
              escrow. Pengguna bertanggung jawab untuk memastikan bahwa penggunaan 
              platform mereka juga comply dengan semua hukum yang berlaku di yurisdiksi 
              masing-masing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="section-10" className="text-xl font-semibold text-foreground scroll-mt-24">10. Informasi Kontak</h2>
            <p className="text-muted-foreground leading-relaxed">
              Jika Anda memiliki pertanyaan, kekhawatiran, atau طلب informasi lebih lanjut 
              tentang Syarat dan Ketentuan ini, jangan ragu untuk menghubungi kami 
              melalui kanal-kanal berikut:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Email:</strong> Hubungi tim customer 
              support kami di support@dailyworkerhub.com untuk pertanyaan umum tentang 
              penggunaan platform, atau di legal@dailyworkerhub.com untuk запросы 
              yang涉及到 aspects legal dari Syarat dan Ketentuan. Kami strive untuk 
              merespons dalam 2-3 hari kerja.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Dalam Platform:</strong> Untuk 
              pertanyaan tentang akun atau dispute yang sedang berjalan, gunakan 
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
              partner dalam найм работников di industri hospitality Bali. Kami 
              akan terus berusaha untuk menyediakan platform yang aman, adil, 
              dan эффективный для seluruh pengguna kami.
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
