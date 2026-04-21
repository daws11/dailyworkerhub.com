"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ForBusinessSection() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 md:gap-24">
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-8 md:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-sub uppercase tracking-[0.2em] text-foreground dark:text-white/60 font-bold text-sm mb-4 block">
              Untuk Bisnis
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 tracking-tight text-balance">
              Rekrut dengan<br />
              <span className="text-secondary dark:text-white/70">Kepercayaan.</span>
            </h2>

            <div className="space-y-4 mb-10 text-muted-foreground font-sans text-lg">
              <p>
                Temukan daily worker dengan rekam jejak yang terverifikasi. Sistem kami menyediakan informasi kehadiran, skor kepercayaan, dan histori kerja — sehingga Anda dapat membuat keputusan rekrutmen yang lebih baik.
              </p>
              <p>
                Absensi via QR code, pembayaran otomatis setelah shift selesai, dan monitoring kepatuhan regulasi yang terintegrasi. Semua dalam satu platform.
              </p>
            </div>

            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-base md:text-lg font-sub shadow-xl w-full sm:w-auto"
            >
              <a href="https://staging.dailyworkerhub.com/auth/register?role=business">
                Pasang Lowongan <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Right: Image with Overlay */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-primary/10"></div>
              <img
                src="/hotel-action.webp"
                alt="Manajemen Bisnis"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10 flex flex-col justify-end p-8 pb-12 md:p-12 text-white">
                <div className="mb-4 relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-accent" />
                    <span className="text-accent font-sub font-bold text-sm uppercase tracking-widest">
                      Terstruktur
                    </span>
                  </div>
                  <p className="font-bold text-lg md:text-xl leading-snug drop-shadow-md">
                    Rekrutmen yang terstruktur, pembayaran yang transparan, dan perlindungan regulasi yang otomatis.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
