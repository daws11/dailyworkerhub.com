"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Handshake, ArrowRight } from "lucide-react";

export function CommunityCtaSection() {
  return (
    <section className="py-32 px-4 md:px-8 relative z-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent"></div>

          <div className="flex justify-center mb-8 relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <Handshake className="w-10 h-10 text-accent" />
            </div>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 relative z-10 tracking-tight">
            Bangun Bersama Komunitas<br />
            <span className="text-white italic font-serif font-light">Tenaga Kerja Indonesia</span>
          </h2>
          <p className="font-sans text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
            Daily Worker Hub bukan sekadar platform — ini adalah komunitas di mana worker dan bisnis saling melindungi dan membangun standar kerja yang lebih baik. Bergabunglah di tahap awal. Suara dan partisipasi kamu akan membentuk bagaimana platform ini berkembang.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-10 h-14 sm:h-16 text-base sm:text-lg font-sub shadow-xl group w-full sm:w-auto flex justify-center items-center gap-3">
              <a href="https://staging.dailyworkerhub.com/auth/register?role=business">
                <span className="flex items-center gap-2">Pasang Lowongan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 sm:px-10 h-14 sm:h-16 text-base sm:text-lg font-sub bg-transparent w-full sm:w-auto flex justify-center items-center">
              <a href="https://staging.dailyworkerhub.com/auth/register?role=worker">
                Bergabung sebagai Worker
              </a>
            </Button>
          </div>
          <p className="font-sub text-sm text-white/50 mt-8 relative z-10">
            Forum diskusi, leaderboard, dan governance poll akan tersedia di community.dailyworkerhub.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
