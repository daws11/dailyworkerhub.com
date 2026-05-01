import type { Metadata } from "next";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { LegalToc, type TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Daily Worker Hub",
  description: "Kebijakan Privasi Daily Worker Hub - Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda sebagai pengguna platform.",
  keywords: ["kebijakan privasi", "data pribadi", "perlindungan data", "privacy policy", "dailyworkerhub"],
  openGraph: {
    title: "Kebijakan Privasi - Daily Worker Hub",
    description: "Kebijakan Privasi Daily Worker Hub - Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
    url: "https://dailyworkerhub.com/privacy",
    siteName: "Daily Worker Hub",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Privasi - Daily Worker Hub",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/privacy",
  },
};

const tocItems: TocItem[] = [
  { id: "section-1", title: "1. Informasi yang Kami Kumpulkan" },
  { id: "section-2", title: "2. Bagaimana Kami Menggunakan Data Anda" },
  { id: "section-3", title: "3. Dasar Hukum Pemrosesan Data" },
  { id: "section-4", title: "4. Integrasi Layanan Pihak Ketiga" },
  { id: "section-5", title: "5. Retensi dan Penghapusan Data" },
  { id: "section-6", title: "6. Langkah Keamanan yang Kami Terapkan" },
  { id: "section-7", title: "7. Hak Anda sebagai Subjek Data" },
  { id: "section-8", title: "8. Privasi Anak-anak" },
  { id: "section-9", title: "9. Transfer Data Internasional" },
  { id: "section-10", title: "10. Cara Menghubungi Kami" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <LegalToc items={tocItems} />

            <div className="flex-1 max-w-4xl">
              <div className="prose prose-invert prose-slate max-w-none space-y-6">
                <h1 className="text-3xl font-bold text-foreground mb-8">Kebijakan Privasi</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Terakhir diperbarui: April 2026
                </p>

                <section className="space-y-4">
                  <h2 id="section-1" className="text-xl font-semibold text-foreground scroll-mt-24">1. Informasi yang Kami Kumpulkan</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub mengumpulkan informasi dari Anda dalam beberapa kategori utama untuk
                    dapat mengoperasikan platform marketplace yang menghubungkan pekerja harian hospitality
                    dengan bisnis di Bali. Informasi pertama yang kami kumpulkan adalah data identitas
                    dasar yang Anda berikan saat mendaftar: nama lengkap sesuai KTP atau paspor, alamat
                    email aktif yang akan digunakan untuk konfirmasi akun dan notifikasi penting, nomor
                    telepon WhatsApp yang menjadi jalur komunikasi utama antara worker dan employer, serta
                    tanggal lahir untuk memverifikasi kelayakan usia pengguna.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Untuk employer atau bisnis yang mendaftarkan usahanya, kami mengumpulkan nama bisnis
                    sesuai dokumen legal, alamat usaha, nomor NPWP atau NIB untuk keperluan perpajakan dan
                    compliance, serta informasi rekening bank yang akan digunakan untuk menerima dan
                    mengirim dana escrow. Sementara untuk worker, kami mengumpulkan data profil tambahan
                    seperti kategori pekerjaan hospitality yang dikuasai ( housekeeping, F&B service,
                    bartender, kitchen helper, receptionist), lokasi domisili di Bali untuk
                    pencocokan pekerjaan, serta portofolio atau sertifikat pelatihan jika tersedia.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Kami juga secara otomatis mengumpulkan informasi perangkat dan penggunaan ketika
                    Anda mengakses platform. Ini mencakup alamat IP yang digunakan untuk menentukan
                    lokasi layanan, tipe perangkat dan sistem operasi untuk optimisasi tampilan,
                    browser yang digunakan untuk memastikan kompatibilitas fitur, log aktivitas
                    yang mencatat fitur-fitur yang digunakan dan timestamp, serta cookie dan data
                    serupa yang telah dijelaskan di Kebijakan Cookie kami. Informasi penggunaan ini
                    dikumpulkan untuk meningkatkan keamanan, mendeteksi anomali aktivitas, dan
                    memahami pola penggunaan platform secara agregat.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Dalam situasi tertentu, terutama saat terjadi dispute antara worker dan employer,
                    kami dapat mengumpulkan data tambahan berupa histori transaksi escrow, record
                    attendance yang di-submit melalui platform, riwayat komunikasi melalui sistem
                    chat kami, serta bukti-bukti pendukung yang diunggah oleh kedua belah pihak untuk
                    proses mediasi. Semua data ini disimpan dengan enkripsi dan hanya diakses oleh
                    tim yang berwenang dalam konteks resolusi dispute.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-2" className="text-xl font-semibold text-foreground scroll-mt-24">2. Bagaimana Kami Menggunakan Data Anda</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Data pribadi yang kami kumpulkan digunakan primarily untuk menyediakan dan
                    mempertahankan operasi platform marketplace Daily Worker Hub. Berikut adalah
                    penggunaan spesifik berdasarkan kategori data:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Penyediaan Layanan Inti:</strong> Nama, email,
                    dan nomor WhatsApp Anda digunakan untuk membuat dan mengelola akun, memverifikasi
                    identitas saat login, mengautentikasi setiap transaksi yang dilakukan, serta
                    mengidentifikasi pengguna secara unik dalam sistem. Tanpa data identitas ini,
                    platform tidak dapat membedakan satu pengguna dari pengguna lain, dan fitur
                    escrow tidak dapat beroperasi karena tidak ada referensi untuk menghubungkan
                    deposit dengan beneficiary yang tepat.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Pemrosesan Transaksi Escrow:</strong> Informasi
                    rekening bank dan data identitas digunakan secara eksklusif untuk memproses deposit
                    dari employer ke escrow, hold dana di rekening escrow, release dana ke worker
                    setelah approval, serta memproses penarikan (withdrawal) ke rekening bank worker.
                    Setiap langkah dalam alur escrow memerlukan validasi identitas untuk memastikan
                    dana sampai ke orang yang tepat dan sesuai dengan jumlah yang disepakati.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Komunikasi dan Notifikasi:</strong> Alamat email
                    dan nomor WhatsApp digunakan untuk mengirimkan confirmation transaksi escrow
                    (deposit received, fund released, withdrawal completed), notifikasi jadwal kerja
                    dan reminder attendance, informasi lowongan kerja baru yang match dengan profil
                    worker, pesan dari employer atau worker terkait proyek harian, serta alert keamanan
                    seperti login dari perangkat baru atau perubahan kata sandi.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Pencegahan Fraud dan Penyalahgunaan:</strong>
                    Kami menggunakan data penggunaan dan device information untuk mendeteksi aktivitas
                    yang mencurigakan seperti login dari multiple locations dalam waktu singkat,
                    pola deposit dan withdrawal yang tidak lazim, attempts untuk membuat multiple
                    akun dengan data serupa, serta penggunaan platform untuk aktivitas ilegal.
                    Jika sistem mendeteksi anomali, kami dapat membatasi sementara fungsionalitas
                    akun dan menghubungi pengguna untuk verifikasi tambahan.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Perbaikan Produk:</strong> Data analitik yang
                    dikumpulkan melalui cookie dan log aktivitas digunakan untuk memahami bagaimana
                    pengguna berinteraksi dengan fitur-fitur platform. Insights ini membantu kami
                    mengidentifikasi pain points dalam alur pendaftaran, menemukan fitur yang
                    jarang digunakan sehingga perlu disederhanakan, mengoptimalkan performa platform
                    untuk device dan browser yang paling umum digunakan, serta mengembangkan fitur
                    baru yang sesuai dengan kebutuhan aktual pengguna hospitality di Bali.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-3" className="text-xl font-semibold text-foreground scroll-mt-24">3. Dasar Hukum Pemrosesan Data</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia yang
                    berlaku, Daily Worker Hub memproses data pribadi Anda berdasarkan beberapa dasar
                    hukum yang sah tergantung pada konteks dan tujuan pemrosesan:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Pelaksanaan Kontrak:</strong> Pemrosesan data
                    yang diperlukan untuk memenuhi kewajiban kontraktual kami terhadap Anda — yaitu
                    menyediakan platform marketplace yang berfungsi penuh — dilakukan atas dasar
                    pelaksanaan kontrak. Ketika Anda menyetujui Syarat & Ketentuan dan membuat akun,
                    sebuah kontrak layanan terbentuk antara Anda dan Daily Worker Hub. Data seperti
                    nama, email, nomor WhatsApp, dan informasi rekening bank diperlukan untuk
                    menjalankan kontrak ini, khususnya untuk mengoperasikan fitur escrow di mana
                    dana kepercayaan pengguna harus dikelola dengan transparan dan aman.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Kepentingan Sah:</strong> Kami memproses
                    certain data berdasarkan kepentingan sah kami sebagai operator platform untuk
                    menjaga keamanan dan integritas sistem. Ini mencakup deteksi dan pencegahan fraud,
                    monitoring penyalahgunaan layanan, backup data untuk disaster recovery, serta
                    improvement produk berdasarkan analitik penggunaan. Kepentingan sah ini tidak
                    berlaku jika kepentingan atau hak fundamental Anda sebagai data subject lebih
                    mengutamakan.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Consent (Persetujuan):</strong> Untuk
                    pemrosesan data tertentu yang tidak covered oleh kontrak atau kepentingan sah,
                    kami meminta persetujuan eksplisit Anda. Contohnya termasuk pengiriman
                    marketing communications tentang fitur baru atau promosi khusus, integrasi
                    dengan layanan pihak ketiga yang optional, serta cookie analitik non-essential.
                    Anda dapat menarik persetujuan ini kapan saja melalui pengaturan akun atau
                    dengan menghubungi kami, dan penarikan persetujuan tidak akan memengaruhi
                    pemrosesan yang telah dilakukan sebelumnya.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Kepatuhan Hukum:</strong> Dalam kondisi
                    tertentu, kami dapat diminta oleh hukum untuk memproses atau mengungkapkan data
                    Anda — misalnya untuk compliance dengan permintaan otoritas pajak, proses
                    hukum pengadilan, atau kewajiban pelaporan kepada aparat penegak hukum terkait
                    transaksi keuangan yang mencurigakan.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-4" className="text-xl font-semibold text-foreground scroll-mt-24">4. Integrasi Layanan Pihak Ketiga</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub mengintegrasikan beberapa layanan pihak ketiga yang secara langsung
                    terlibat dalam pengoperasian platform. Pihak-pihak ini memiliki akses terhadap
                    data tertentu sesuai dengan fungsinya masing-masing dan tunduk pada perjanjian
                    pemrosesan data dengan kami:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Supabase (Database dan Authentication):</strong>
                    Supabase adalah backend-as-a-service yang menangani penyimpanan data dan autentikasi
                    pengguna Daily Worker Hub. Semua data profil, histori transaksi escrow, dan records
                    pekerjaan dikelola dalam database Supabase yang terletak di infrastruktur cloud
                    dengan enkripsi end-to-end. Ketika Anda login ke platform, Supabase menangani
                    proses autentikasi — memverifikasi kredensial, menghasilkan session tokens, dan
                    mengelola refresh tokens. Supabase juga mengelola Row Level Security (RLS) yang
                    memastikan setiap pengguna hanya dapat mengakses data yang menjadi hak mereka.
                    Sebagai processor data, Supabase tidak menggunakan data Anda untuk tujuan mereka
                    sendiri dan hanya memproses sesuai instruksi dari Daily Worker Hub.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Xendit (Payment Processing):</strong> Xendit
                    adalah payment gateway yang memproses semua transaksi finansial di platform kami,
                    termasuk deposit escrow dari employer dan withdrawal untuk worker. Ketika Anda
                    melakukan deposit, data pembayaran (nomor kartu atau rekening virtual) diproses
                    langsung oleh Xendit — Daily Worker Hub tidak pernah menyimpan data kartu atau
                    rekening bank penuh. Xendit menangani compliance dengan standar PCI-DSS untuk
                    keamanan data pembayaran, konversi mata uang jika diperlukan, settlement dana
                    ke rekening bank lokal Indonesia, serta notification transaksiberhasil atau gagal.
                    Data transaksi yang diproses Xendit mencakup jumlah, timestamp, status payment,
                    dan referensi idempotency untuk mencegah duplicate charges.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Cloud Messaging (Push Notifications):</strong>
                    FCM digunakan untuk mengirimkan push notifications ke perangkat pengguna — baik
                    via browser web maupun app mobile jika di masa depan kami mengembangkan aplikasi
                    native. Notifications ini mencakup konfirmasi escrow (deposit received, fund
                    released), pengingat attendance yang harus di-submit oleh worker, update status
                    dispute resolution, serta announcement platform seperti maintenance window atau
                    fitur baru. Untuk dapat mengirim notifikasi, FCM menyimpan registration tokens
                    yang di-generate per device per browser. Tokens ini tidakterkait dengan data identitas
                    pribadi kecuali Anda sedang logged in, dan Anda dapat menonaktifkan notifikasi
                    melalui pengaturan browser atau pengaturan akun kapan saja.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Firebase Analytics:</strong> Kami menggunakan
                    Firebase Analytics untuk memahami perilaku pengguna di platform secara agregat.
                    Analytics ini mengumpulkan interaksi pengguna seperti page views, button clicks,
                    feature usage patterns, dan conversion events dalam alur kerja (misalnya berapa
                    banyak employer yang berhasil menyelesaikan deposit pertama mereka). Data ini
                    bersifat anonim dan tidak dapat digunakan untuk mengidentifikasi Anda secara
                    individual. Firebase Analytics tidak membagikan data ini ke advertiser atau
                    pihak ketiga lainnya.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-5" className="text-xl font-semibold text-foreground scroll-mt-24">5. Retensi dan Penghapusan Data</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Kami menyimpan data pribadi Anda hanya selama diperlukan untuk tujuan-tujuan
                    yang telah dijelaskan dalam kebijakan ini. Masa retensi berbeda-beda tergantung
                    pada jenis data dan tujuan penggunaannya:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Data Akun dan Profil:</strong> Data identitas
                    dasar (nama, email, nomor WhatsApp) dan profil disimpan selama akun Anda aktif.
                    Jika Anda deactivate atau delete akun, data akan memasuki masa quarantine selama
                    30 hari di mana Anda dapat restore akun Anda. Setelah 30 hari tanpa restore,
                    data profil akan dihapus dari sistem aktif, kecuali data histori transaksi
                    yang mungkin diperlukan untuk compliance perpajakan retention selama 10 tahun
                    sesuai regulasi perpajakan Indonesia.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Data Transaksi Escrow:</strong> Record
                    transaksi escrow, termasuk deposit, hold, release, dan withdrawal, disimpan
                    selama minimum 10 tahun untuk kepatuhan pajak dan peraturan keuangan Indonesia.
                    Data ini mencakup ID transaksi, jumlah, timestamp, status, dan referensi
                    ke user accounts yang terlibat. Meskipun akun telah dihapus, data transaksi
                    ini tetap disimpan untuk keperluan audit dan compliance hukum.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Log Aktivitas dan Keamanan:</strong> Log
                    yang mencatat login, perubahan pengaturan, dan aktivitas security disimpan
                    selama 2 tahun untuk keperluan audit keamanan dan investigasi insiden.
                    Log ini membantu kami merekonstruksi aktivitas mencurigakan jika terjadi
                    unauthorized access atau fraud.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Cookie dan Data Analitik:</strong> Cookie
                    yang disimpan di browser Anda memiliki durasi yang telah dijelaskan di
                    Kebijakan Cookie — dari session cookies yang hilang saat browser ditutup
                    hingga cookie analitik yang bertahan 12 bulan. Data analitik agregat yang
                    telah di-anonimisasi dapat disimpan indefinitely untuk comparative analysis
                    dan trend reporting.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Data Dispute:</strong> Jika terjadi dispute
                    antara worker dan employer, data terkait dispute (submissions dari kedua
                    belah pihak, communications, bukti-bukti, dan resolusi) disimpan selama 5
                    tahun setelah dispute resolved untuk keperluan reference dan potential appeal.
                    Ini memastikan bahwa jika ada sengketa lanjutan yang terkait, data pendukung
                    masih tersedia.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-6" className="text-xl font-semibold text-foreground scroll-mt-24">6. Langkah Keamanan yang Kami Terapkan</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Keamanan data pribadi dan dana escrow pengguna adalah prioritas utama
                    Daily Worker Hub. Kami menerapkan multiple layers of protection untuk
                    safeguarding data Anda:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Enkripsi Data:</strong> Semua data yang
                    dikirim antara perangkat Anda dan server Daily Worker Hub dilindungi dengan
                    TLS 1.3 encryption — protokol enkripsi terkini yang memastikan tidak ada
                    pihak ketiga yang dapat menyadap komunikasi Anda saat menggunakan platform.
                    Data sensitif seperti kata sandi tidak pernah disimpan dalam plaintext;
                    kami menggunakan bcrypt hashing dengan salt yang kuat. Untuk data sensitif
                    finansial, kami menerapkan tambahan encryption at rest menggunakan AES-256.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Two-Factor Authentication (2FA):</strong>
                    Kami sangat menganjurkan semua pengguna untuk mengaktifkan 2FA pada akun
                    mereka. Ketika diaktifkan, login memerlukan tidak hanya kata sandi tetapi
                    juga kode verifikasi yang dikirim ke nomor WhatsApp Anda atau generated
                    oleh authenticator app. 2FA memberikan layer pertahanan ekstra meskipun
                    kata sandi Anda berhasil dikompromikan.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Row Level Security (RLS) Database:</strong>
                    Database Supabase kami dikonfigurasi dengan RLS policies yang memastikan
                    setiap query database secara otomatis difilter berdasarkan hak akses user.
                    Ini berarti bahkan jika ada malicious actor yang mendapatkan akses ke
                    database credentials, mereka tidak dapat mengekstrak data pengguna lain
                    karena RLS policies secara otomatis membatasi akses ke data yang memang
                    menjadi hak user tersebut.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Audit Trail untuk Transaksi Escrow:</strong>
                    Setiap perubahan status transaksi escrow — dari deposit initiated hingga
                    withdrawal completed — dicatat dalam immutable audit log. Log ini mencakup
                    timestamp, user ID, action yang dilakukan, IP address asal, dan hash
                    transaksi sebelumnya untuk mendeteksi tampering. Audit trail ini dapat
                    digunakan sebagai bukti dalam dispute resolution.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Regular Security Assessments:</strong>
                    Kami secara berkala melakukan vulnerability scanning dan penetration testing
                    pada infrastruktur platform untuk mengidentifikasi dan memperbaiki potential
                    security weaknesses sebelum dapat dieksploitasi.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-7" className="text-xl font-semibold text-foreground scroll-mt-24">7. Hak Anda sebagai Subjek Data</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Sebagai pengguna Daily Worker Hub, Anda memiliki serangkaian hak yang dijamin
                    oleh Undang-Undang Perlindungan Data Pribadi Indonesia. Anda dapat
                    menggunakan hak-hak ini dengan menghubungi tim kami melalui kanal yang
                    tersedia di bagian akhir kebijakan ini:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Hak Akses:</strong> Anda berhak untuk
                    meminta salinan data pribadi yang kami simpan tentang Anda, termasuk data
                    profil, histori transaksi escrow, dan pengaturan akun. Kami akan memberikan
                    salinan ini dalam format yang dapat dibaca — umumnya JSON atau PDF — dalam
                    waktu 14 hari kerja setelah verifikasi identitas Anda. Ada kondisi di mana
                    kami tidak dapat sepenuhnya memenuhi permintaan ini jika pengungkapan akan
                    adversely affect hak dan kebebasan orang lain.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Hak Koreksi (Rectification):</strong>
                    Jika Anda mengetahui bahwa data pribadi kami tentang Anda inaccurate atau
                    incomplete, Anda berhak untuk meminta koreksi. Ini mencakup perubahan nama,
                    update nomor WhatsApp, koreksi alamat email, atau perubahan informasi rekening
                    bank. Koreksi akan dilakukan dalam waktu 7 hari kerja, dan kami akan memberi
                    tahu Anda melalui email setelah perubahan diterapkan.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Hak Penghapusan (Erasure):</strong>
                    Anda dapat meminta penghapusan data pribadi Anda dari sistem kami — dikenal
                    sebagai "hak untuk dilupakan." Namun, ada batasan penting: kami tidak dapat
                    menghapus data jika masih diperlukan untuk kewajiban hukum (misalnya data
                    transaksi escrow yang harus disimpan 10 tahun untuk compliance perpajakan),
                    untuk establish, exercise, atau defend legal claims, atau jika ada dispute
                    yang belum resolved. Untuk kasus-kasus ini, data akan dihapus segera setelah
                    periode retensi wajib berakhir.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Hak Portabilitas:</strong> Anda berhak
                    untuk menerima data pribadi Anda dalam format yang terstruktur, umum digunakan,
                    dan dapat dibaca oleh mesin — misalnya JSON atau CSV — dan Mentransfer data
                    tersebut ke layanan lain tanpa hambatan dari kami. Hak ini berlaku untuk data
                    yang Anda berikan kepada kami berdasarkan consent atau pelaksanaan kontrak, dan
                    yang diproses secara otomatis.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Hak Keberatan (Objection):</strong>
                    Anda memiliki hak untuk mengajukan keberatan terhadap pemrosesan data Anda
                    yang didasarkan pada kepentingan sah kami, termasuk profiling yang dilakukan
                    untuk analisis penggunaan platform. Ketika Anda mengajukan keberatan, kami
                    akan berhenti memproses data Anda kecuali kami dapat menunjukkan alasan
                    legitimate yang sah yang mengesampingkan interests, rights, dan freedoms
                    Anda, atau jika pemrosesan diperlukan untuk establish, exercise, atau defend
                    legal claims.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Cara Menggunakan Hak-Hak Anda:</strong>
                    Untuk exercising any of these rights, silakan kirim email ke tim kami di
                    privacy@dailyworkerhub.com dengan subjek "Data Subject Rights Request" dan
                    sertakan: nama lengkap sesuai akun, email yang terdaftar, nomor WhatsApp
                    yang terdaftar, deskripsi spesifik hak yang ingin Anda gunakan, dan detail
                    tambahan yang dapat membantu kami memproses permintaan Anda. Kami akan
                    memverifikasi identitas Anda sebelum memproses permintaan — ini adalah
                    security measure untuk mencegah unauthorized access ke akun Anda. Respons
                    akan diberikan dalam waktu 30 hari sesuai ketentuan UU PDP.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-8" className="text-xl font-semibold text-foreground scroll-mt-24">8. Privasi Anak-anak</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub adalah platform yang dirancang untuk pengguna dewasa dalam konteks
                    pekerjaan profesional di industri hospitality. Kami secara strict tidak
                    mengumpulkan data pribadi dari individu yang belum berusia 16 tahun.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Sejak proses pendaftaran, kami menerapkan verifikasi usia melalui input tanggal
                    lahir yang diverifikasi secara primer melalui pengakuan pengguna. Kami tidak
                    dengan sengaja mengumpulkan, menggunakan, atau mengungkapkan informasi pribadi
                    dari anak-anak di bawah 16 tahun. Jika kami mengetahui bahwa kami telah
                    mengumpulkan data dari seseorang di bawah 16 tahun tanpa verifikasi consent
                    orang tua atau wali yang terverifikasi, kami akan mengambil langkah untuk
                    menghapus informasi tersebut dari servers kami sesegera mungkin.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Untuk pengguna yang berusia 16-18 tahun di yurisdiksi Indonesia yang menganggap
                    mereka sebagai minor, perlu memahami bahwa penggunaan platform Daily Worker Hub
                    untuk aktivitas pekerjaan — baik sebagai worker maupun dalam hal employer yang
                    menjalankan bisnis — adalah aktivitas kontrak yang secara hukum mengikat di
                    bawah pengawasan tutors atau guardians yang sah. Kami highly recommend agar
                    parents atau guardians dari pengguna dalam kelompok usia ini memonitor dan
                    memberikan persetujuan sebelum anak mereka menggunakan platform.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-9" className="text-xl font-semibold text-foreground scroll-mt-24">9. Transfer Data Internasional</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Worker Hub mengoperasikan bisnis dan menyimpan data primarily di Indonesia,
                    dengan infrastruktur cloud yang menggunakan servers yang berlokasi di Asia
                    Tenggara — khususnya Singapore dan Jakarta. Ketika data Anda ditransfer di
                    luar Indonesia, kami memastikan bahwa transfer tersebut mematuhi persyaratan
                    UU PDP tentang transfer data lintas batas negara.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Beberapa vendor pihak ketiga yang kami gunakan — seperti Supabase yang
                    berbasis di Singapura dan Firebase (Google) yang berbasis di Amerika Serikat
                    — mungkin memiliki infrastruktur yang tersebar secara global. Data Anda dapat
                    diproses di negara-negara ini untuk keperluan operasional seperti disaster
                    recovery, load balancing, dan dukungan teknis. Namun, semua transfer ini
                    dilindungi oleh agreement yang mensyaratkan level perlindungan data yang
                    equivalent dengan yang kami terapkan sendiri.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Untuk transfer ke negara yang belum memiliki tingkat perlindungan data yang
                    adequate menurut pemerintah Indonesia, kami menerapkan standard contractual
                    clauses dan mengharuskan vendor untuk certified bahwa mereka menyediakan
                    level keamanan yang sesuai dengan standar internasional. Anda dapat meminta
                    salinen dari safeguards yang kami terapkan untuk transfer data Anda dengan
                    menghubungi kami di privacy@dailyworkerhub.com.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 id="section-10" className="text-xl font-semibold text-foreground scroll-mt-24">10. Cara Menghubungi Kami</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Jika Anda memiliki pertanyaan, concerns, atau permintaan terkait kebijakan
                    privasi ini atau praktik perlindungan data kami, silakan hubungi kami
                    melalui kanal-kanal berikut:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Email:</strong> Kirimkan email ke
                    privacy@dailyworkerhub.com dengan subjek yang jelas dan respons biasanya
                    diberikan dalam 3-5 hari kerja. Untuk permintaan yangmenyangkut data subject
                    rights, tolong sertakan informasi verifikasi seperti nomor akun dan
                    email terdaftar untuk mempercepat proses.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Dalam Platform:</strong> Anda juga
                    dapat menghubungi kami melalui fitur chat yang tersedia di dashboard
                    akun Anda untuk pertanyaan umum yang tidak memerlukan pengungkapan data
                    sensitif.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Postal Mail:</strong> Untuk permintaan
                    formal yang memerlukan tanda tangan terverifikasi atau untuk escalate concerns
                    yang belum terselesaikan melalui email, Anda dapat mengirim surat ke alamat
                    kantor kami yang tercantum di halaman Hubungi Kami di platform.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Kami strive untuk merespons semua inquiries dalam waktu yang wajar dan akan
                    mengkomunikasikan setiap penundaan jika volume permintaan sedang tinggi.
                    Jika Anda merasa bahwa respons kami tidak memuaskan atau bahwa pemrosesan
                    data Anda tidak sesuai dengan hukum yang berlaku, Anda juga memiliki hak
                    untuk mengajukan keluhan kepada otoritas perlindungan data Indonesia
                    (Kementerian Komunikasi dan Informatika atau KOMINFO).
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
