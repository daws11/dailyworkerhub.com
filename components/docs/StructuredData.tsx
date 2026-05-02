"use client";

import { usePathname } from "next/navigation";

type FAQItem = { question: string; answer: string };

const faqs: FAQItem[] = [
  { question: "Apakah Daily Worker Hub gratis untuk digunakan?", answer: "Daily Worker Hub gratis untuk pekerja. Untuk pemberi kerja, dikenakan Biaya Platform 3,5%, Biaya Layanan Dana Jaminan, dan Kontribusi Dana Perlindungan 1% dari total gaji per transaksi. Tidak ada biaya registrasi atau biaya bulanan." },
  { question: "Siapa saja yang bisa mendaftar di Daily Worker Hub?", answer: "Siapa saja yang berusia minimal 18 tahun, memiliki KTP Indonesia yang masih berlaku, memiliki nomor telepon aktif, dan memiliki rekening bank. Untuk pemberi kerja, wajib memiliki bisnis yang sah." },
  { question: "Apakah saya bisa mendaftar sebagai pekerja dan pemberi kerja sekaligus?", answer: "Saat ini belum tersedia. Anda perlu membuat dua akun terpisah dengan email berbeda." },
  { question: "Apakah data saya aman di Daily Worker Hub?", answer: "Ya. Data Anda dienkripsi dengan AES-256, disimpan secara terpisah, dan tidak dibagikan ke pihak ketiga tanpa persetujuan." },
  { question: "Mengapa saya perlu memverifikasi akun?", answer: "Verifikasi melindungi seluruh komunitas dari akun palsu dan penipuan. Akun terverifikasi mendapat lebih banyak kepercayaan dan akses penuh ke fitur platform." },
  { question: "Berapa lama proses verifikasi KTP?", answer: "Verifikasi KTP biasanya memakan waktu 1x24 jam kerja." },
  { question: "Bagaimana cara kerja Sistem Dana Jaminan?", answer: "Pemberi Kerja deposit dana ke rekening Dana Jaminan sebelum pekerjaan dimulai. Dana ditahan sampai pekerja menyelesaikan pekerjaan dan pemberi kerja memverifikasi. Setelah verifikasi, dana dirilis ke pekerja." },
  { question: "Berapa biaya yang dikenakan per transaksi?", answer: "Untuk pemberi kerja: Biaya Platform 3,5%, Biaya Layanan Dana Jaminan Rp 5.000, Kontribusi Dana Perlindungan 1%. Untuk pekerja: Biaya Gateway Payout Rp 5.000 per transaksi." },
  { question: "Apakah pekerja dijamin dibayar?", answer: "Ya. Jika pekerja menyelesaikan pekerjaan sesuai deskripsi dan pemberi kerja tidak bisa memberikan alasan valid untuk menolak, pekerja bisa mengajukan perselisihan. Dana Perlindungan tersedia sebagai backup." },
  { question: "Berapa lama proses tarik dana ke rekening bank?", answer: "Proses memakan waktu 1-3 hari kerja, tergantung bank: BCA 1-2 hari, BRI 1-3 hari, Mandiri 1-3 hari." },
  { question: "Apakah ada batasan apply lowongan?", answer: "Tidak ada batasan. Anda bisa melamar ke semua lowongan yang sesuai dengan kriteria dan ketersediaan Anda." },
  { question: "Bagaimana cara saya tahu lowongan baru?", answer: "Aktifkan notifikasi push di aplikasi, cek halaman pencarian secara rutin, atau gunakan filter untuk melihat lowongan terbaru." },
  { question: "Berapa biaya untuk posting lowongan?", answer: "Tidak ada biaya untuk posting. Biaya baru dikenakan saat transaksi terjadi." },
  { question: "Apakah ada batasan jumlah lowongan yang aktif?", answer: "Akun gratis dapat memiliki maksimal 3 lowongan aktif sekaligus." },
  { question: "Kapan saya bisa mengajukan perselisihan?", answer: "Dalam waktu 7 hari setelah tanggal selesai pekerjaan, jika transaksi menggunakan Sistem Dana Jaminan dan Anda memiliki bukti pendukung." },
  { question: "Berapa lama perselisihan diproses?", answer: "Rata-rata 3,2 hari kerja. Perselisihan sederhana 1-2 hari, yang kompleks 5-7 hari." },
  { question: "Apakah data KTP saya aman?", answer: "Ya. Data KTP dienkripsi dengan AES-256, hanya digunakan untuk verifikasi identitas, dan tidak dibagikan ke pihak ketiga." },
  { question: "Apakah saya bisa menghapus akun?", answer: "Ya, melalui menu Pengaturan. Semua saldo harus di-withdraw terlebih dahulu. Riwayat transaksi tetap disimpan untuk audit." },
  { question: "Bagaimana jika saya lupa password?", answer: "Gunakan fitur 'Lupa Password' di halaman login. Sistem akan mengirim link reset ke email Anda." },
  { question: "Apakah Daily Worker Hub tersedia di seluruh Indonesia?", answer: "Saat ini platform beroperasi di Bali dan terus memperluas jangkauan ke daerah lain." },
  { question: "Apakah Daily Worker Hub memiliki program referral?", answer: "Ya. Pekerja yang mereferensikan teman yang mendaftar dan melakukan transaksi pertama akan mendapat bonus." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQPageSchema() {
  const pathname = usePathname();
  if (pathname !== "/docs/faq") return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
