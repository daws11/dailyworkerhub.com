"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Apakah Daily Worker Hub legal dan aman?",
    a: "Ya. Semua transaksi berjalan di atas payment escrow yang dijamin hingga shift selesai, dan pekerja maupun bisnis harus melalui proses verifikasi identitas sebelum bertransaksi. Kami mematuhi regulasi ketenagakerjaan Indonesia.",
  },
  {
    q: "Bagaimana cara pembayaran bekerja?",
    a: "Bisnis melakukan top-up saldo lewat QRIS tanpa biaya tambahan. Saat shift dimulai, dana ditahan sebagai escrow. Setelah pekerja check-out melalui QR di lokasi, dana otomatis cair ke wallet pekerja — tanpa perantara.",
  },
  {
    q: "Apa itu Protection Pool?",
    a: "Protection Pool adalah dana komunitas dari potongan 1% setiap transaksi yang digunakan untuk bantuan darurat anggota, seperti kecelakaan kerja, keterlambatan pembayaran dari bisnis, atau sengketa. Dikelola transparan oleh komunitas.",
  },
  {
    q: "Berapa biaya platform untuk bisnis dan pekerja?",
    a: "Pekerja: 0% komisi potongan upah. Bisnis: 6% biaya transaksi + 1% Protection Pool. Tidak ada biaya langganan, tidak ada biaya top-up QRIS, dan tidak ada biaya tersembunyi.",
  },
  {
    q: "Bagaimana proses verifikasi pekerja?",
    a: "Pekerja wajib mengunggah KTP, foto wajah untuk liveness check, dan data rekening bank. Kami juga menampilkan review publik dua arah — histori shift dan reputasi pekerja bisa dilihat bisnis sebelum menerima lamaran.",
  },
  {
    q: "Daerah mana saja yang sudah dicakup?",
    a: "Saat ini Daily Worker Hub aktif di kota-kota besar Pulau Jawa (Jakarta, Bandung, Yogyakarta, Surabaya) dan sedang ekspansi ke Bali, Medan, dan Makassar. Daftar gratis walau kota kamu belum tercover — kami akan notifikasi saat tersedia.",
  },
  {
    q: "Bagaimana jika terjadi sengketa antara pekerja dan bisnis?",
    a: "Tim moderasi Daily Worker Hub akan meninjau bukti dari kedua belah pihak (check-in QR, chat, foto lokasi). Selama proses berjalan, dana tetap aman di escrow. Dalam kasus tertentu, Protection Pool dapat digunakan untuk membantu pihak yang dirugikan.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-white relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="font-serif italic text-lg text-muted-foreground">
            Masih ragu? Jawaban singkat untuk keraguan yang paling umum.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="font-display text-left text-lg md:text-xl font-semibold text-secondary py-6 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-base text-muted-foreground leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
