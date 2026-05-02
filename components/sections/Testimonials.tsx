"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  quote: string;
  type: "pekerja" | "bisnis";
};

const testimonials: Testimonial[] = [
  {
    name: "Rahmat S.",
    role: "Server Harian",
    initials: "RS",
    quote:
      "Akhirnya bisa kerja tanpa dipotong calo. Upah utuh masuk ke rekening, dan saya bisa pilih shift sesuai jadwal kuliah.",
    type: "pekerja",
  },
  {
    name: "Dewi A.",
    role: "Barista Harian",
    initials: "DA",
    quote:
      "Sistem review-nya adil. Saya punya portofolio digital sendiri sekarang — bisnis yang cocok langsung hubungi saya.",
    type: "pekerja",
  },
  {
    name: "Fajar P.",
    role: "Helper Event",
    initials: "FP",
    quote:
      "Proteksi dari Dana Perlindungan bikin saya tenang. Waktu cedera ringan kemarin, komunitas benar-benar bantu.",
    type: "pekerja",
  },
  {
    name: "Bu Sari",
    role: "Owner Warung Sari",
    initials: "BS",
    quote:
      "Dapat staff harian dalam hitungan jam, bukan hari. Semua pekerja sudah terverifikasi, jadi saya tidak was-was.",
    type: "bisnis",
  },
  {
    name: "Pak Hendra",
    role: "Manager Hotel Kenanga",
    initials: "PH",
    quote:
      "Biaya jauh lebih transparan dibanding agensi. Check-in lewat QR bikin absensi shift jauh lebih mudah dipantau.",
    type: "bisnis",
  },
  {
    name: "Mbak Rina",
    role: "Owner Cafe Senja",
    initials: "MR",
    quote:
      "Kualitas worker-nya konsisten. Review dua arah bikin kami sama-sama termotivasi menjaga standar.",
    type: "bisnis",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-background dark:bg-dark-secondary relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Suara dari Komunitas
          </h2>
          <p className="font-serif italic text-xl text-muted-foreground max-w-2xl mx-auto">
            Cerita nyata dari pekerja dan bisnis yang sudah bergabung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`glass-card rounded-3xl p-8 flex flex-col h-full relative ${
                i >= 3 ? "hidden md:flex" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="font-sans text-base text-foreground/90 leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-border/60">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg shrink-0 ${
                    t.type === "pekerja"
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-foreground dark:text-white truncate">
                    {t.name}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground truncate">
                    {t.role}
                  </div>
                </div>
                <span
                  className={`ml-auto text-[10px] uppercase tracking-wider font-sub font-semibold px-2 py-1 rounded-full shrink-0 ${
                    t.type === "pekerja"
                      ? "bg-primary/10 dark:bg-primary/20 text-primary"
                      : "bg-secondary/10 dark:bg-white/10 text-secondary dark:text-white/70"
                  }`}
                >
                  {t.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
