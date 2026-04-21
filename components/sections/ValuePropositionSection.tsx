"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, MessageCircle } from "lucide-react";

type Benefit = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: Users,
    title: "Akses Tanpa Perantara",
    description:
      "Tidak perlu mengenal calo atau bergabung dengan grup tertentu untuk mendapatkan pekerjaan harian. Daftar, verifikasi, dan mulai ambil shift — semuanya melalui satu platform.",
  },
  {
    icon: ShieldCheck,
    title: "Protection Pool",
    description:
      "1% dari setiap transaksi dialokasikan ke Protection Pool — dana yang dirancang untuk melindungi worker ketika terjadi kecelakaan atau keterlambatan pembayaran. Bisnis tidak sekadar merekrut, tetapi berpartisipasi dalam ekosistem yang lebih aman.",
  },
  {
    icon: MessageCircle,
    title: "Reputasi & Partisipasi",
    description:
      "Setiap worker memiliki skor kepercayaan yang dibangun berdasarkan umpan balik dari bisnis. Sebagai anggota komunitas, worker dan bisnis dapat memberikan masukan dan voting untuk pengembangan fitur platform.",
  },
];

const tiltVariants = {
  hover: {
    rotateX: 5,
    rotateY: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
} as const;

export function ValuePropositionSection() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Bukan Sekadar Marketplace.<br />
            <span className="font-serif italic text-foreground dark:text-white/80 font-light">
              Ini Komunitas.
            </span>
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Platform yang menghubungkan pekerja dan bisnis — dengan perlindungan, transparansi, dan suara yang didengar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover="hover"
              variants={tiltVariants}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-[2rem] p-8 md:p-12 transition-shadow hover:shadow-2xl cursor-default relative overflow-hidden group/card"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none"
                initial={false}
              />
              <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-secondary dark:text-white/70 mb-8">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}