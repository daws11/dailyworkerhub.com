"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SideIncomeSection() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -100]);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-background dark:bg-dark-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
        {/* Left: Worker Portrait */}
        <div className="w-full lg:w-1/2">
          <motion.div
            style={{ y: y1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-primary/10"></div>
              <img
                src="/worker-portrait.webp"
                alt="Worker Fleksibel"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10 flex flex-col justify-end p-8 pb-12 md:p-12 text-white">
                <div className="mb-4 relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="text-accent font-sub font-bold text-sm uppercase tracking-widest">
                      Fleksibel
                    </span>
                  </div>
                  <p className="font-bold text-lg md:text-xl leading-snug drop-shadow-md">
                    Ambil shift sesuai waktu luangmu. Tidak ada minimum jam kerja. Tidak ada kewajiban harian.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <span className="font-sub uppercase tracking-[0.2em] text-foreground dark:text-white/60 font-bold text-sm mb-4">
            Income Tambahan
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 tracking-tight text-balance">
            Penghasilan Tambahan<br />
            <span className="text-secondary dark:text-white/70">Tanpa Konflik.</span>
          </h2>

          <div className="space-y-4 mb-10 text-muted-foreground font-sans text-lg">
            <p>
              Daily Worker Hub dirancang untuk mereka yang memiliki komitmen lain — pelajar, mahasiswa, pekerja paruh waktu, atau siapa pun yang ingin mendapatkan penghasilan tambahan tanpa harus terikat kontrak penuh waktu.
            </p>
            <p>
              Ambil shift sesuai waktu luangmu. Tidak ada minimum jam kerja. Tidak ada kewajiban harian. Yang kamu butuhkan: smartphone, koneksi internet, dan kemauan untuk bekerja.
            </p>
          </div>

          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-base md:text-lg font-sub shadow-xl w-full sm:w-auto"
          >
            <a href="https://staging.dailyworkerhub.com/auth/register?role=worker">
              Bergabung sebagai Worker <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
