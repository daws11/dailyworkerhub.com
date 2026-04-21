"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowRight, Star } from "lucide-react";
import { Magnet } from "@/components/animations/Magnet";
import { ScrubText } from "@/components/animations/ScrubText";
import { FloatingElements } from "@/components/animations/FloatingElements";

interface HeroSectionProps {
  scrollProgress?: any;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", isMobile ? "10%" : "50%"]);

  const p1 = useTransform(heroScroll, [0, 1], [0, isMobile ? -20 : -60]);
  const p2 = useTransform(heroScroll, [0, 1], [0, isMobile ? 15 : 40]);
  const p3 = useTransform(heroScroll, [0, 1], [0, isMobile ? -10 : -30]);
  const p4 = useTransform(heroScroll, [0, 1], [0, isMobile ? 25 : 80]);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] w-full flex items-center overflow-hidden bg-background">
      <motion.div
        style={{ y: heroBgY }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
      >
        <FloatingElements />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-20 md:pt-32 pb-32 md:pb-20 flex flex-col md:flex-row items-center gap-16 md:gap-12 relative z-10">
        {/* Left: Content */}
        <motion.div
          style={{ y: heroTextY }}
          className="w-full md:w-[45%] relative z-20 order-1 mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 md:mb-6 flex items-center gap-4"
          >
            <span className="h-[2px] w-8 md:w-12 bg-primary block"></span>
            <span className="font-sub uppercase tracking-[0.2em] text-foreground dark:text-white/60 font-bold text-xs md:text-sm">
              Community First Platform
            </span>
          </motion.div>

          <motion.h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-foreground leading-[1.1] md:leading-[1.05] tracking-tight mb-6 md:mb-8 text-balance">
            <ScrubText
              text="Temukan Daily Worker Terpercaya, Tanpa Perantara."
              variant="reveal"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans font-light leading-[1.6] md:leading-[1.7] mb-8 md:mb-12 text-balance max-w-lg"
          >
            Daily Worker Hub menghubungkan pekerja dan bisnis secara langsung — dengan sistem verifikasi reputasi, perlindungan via Protection Pool, dan transparansi untuk semua pihak.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12"
          >
            <Magnet strength={isMobile ? 0.05 : 0.2}>
              <motion.a
                href="https://staging.dailyworkerhub.com/auth/register?role=business"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 md:px-10 h-14 text-sm md:text-base font-sub tracking-wide whitespace-nowrap shadow-xl group w-full sm:w-auto flex items-center justify-center gap-3"
              >
                <span>Pasang Lowongan</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </Magnet>
            <Magnet strength={isMobile ? 0.05 : 0.2}>
              <motion.a
                href="https://staging.dailyworkerhub.com/auth/register?role=worker"
                whileHover={{ scale: 1.05, backgroundColor: "var(--foreground)", color: "white" }}
                whileTap={{ scale: 0.98 }}
                className="border border-border text-foreground rounded-full px-8 md:px-10 h-14 text-sm md:text-base font-sub tracking-wide whitespace-nowrap bg-transparent hover:bg-foreground hover:text-white transition-colors flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <span>Bergabung sebagai Worker</span>
                <ArrowUpRight className="w-5 h-5 transition-all" />
              </motion.a>
            </Magnet>
          </motion.div>
        </motion.div>

        {/* Right: Asymmetric Image Grid */}
        <div className="w-full md:w-[55%] relative z-10 order-2">
          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 h-[280px] sm:h-[400px] md:h-[600px] relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-accent/30 rounded-full blur-[60px] md:blur-[80px] -z-10"></div>

            {/* Column 1 */}
            <div className="flex flex-col gap-3 sm:gap-4 pt-4 md:pt-12">
              <motion.div
                style={{ y: p1 }}
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[160px] sm:h-[200px] md:h-[300px] shadow-2xl relative group"
              >
                <img src="/hotel-action.webp" alt="Bisnis Hospitality" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div
                style={{ y: p2 }}
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[100px] sm:h-[160px] md:h-[240px] shadow-2xl relative group"
              >
                <img src="/hero-bg.webp" alt="Daily Worker" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 sm:gap-4 pb-4 md:pb-12">
              <motion.div
                style={{ y: p3 }}
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[120px] sm:h-[160px] md:h-[240px] shadow-2xl relative group"
              >
                <img src="/hotel-action.webp" alt="Tim Kerja" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div
                style={{ y: p4 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-card rounded-2xl md:rounded-[2rem] h-[140px] sm:h-[200px] md:h-[300px] p-4 sm:p-6 md:p-8 flex flex-col justify-between border-border/50 dark:bg-slate-800/60 dark:md:bg-slate-800/40"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1 md:mb-4 shrink-0">
                  <Star className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-serif italic text-sm sm:text-lg md:text-2xl text-foreground mb-1 md:mb-2 leading-snug">"Kualitas layanan dimulai dari kualitas orang."</h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}