"use client";

import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { ComparisonTable } from "@/components/sections";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-4 md:px-8 bg-background dark:bg-dark-secondary relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Transparan.<br />Tidak Ada Biaya Tersembunyi.
          </h2>
          <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
            Struktur biaya yang jelas untuk semua pihak.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Pricing */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-background dark:bg-dark-primary rounded-[2rem] p-8 md:p-12 border border-border shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="font-display text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-secondary dark:text-white/70" /> Untuk Bisnis
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium text-muted-foreground">Biaya transaksi</span>
                  <span className="font-bold text-primary text-xl">6%</span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium text-muted-foreground">Biaya top-up (QRIS)</span>
                  <span className="font-bold text-primary text-xl">Rp 0</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="font-medium text-muted-foreground">Biaya langganan</span>
                  <span className="font-bold text-primary text-xl">Rp 0</span>
                </li>
              </ul>
            </motion.div>

            {/* Worker Pricing */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-primary text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group/pricing"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0 group-hover/pricing:scale-150 transition-transform duration-700"></div>
              <h3 className="font-display text-2xl font-bold text-accent mb-6 flex items-center gap-3 relative z-10">
                <Users className="w-6 h-6" /> Untuk Pekerja
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span className="font-medium text-white/80">Komisi potongan upah</span>
                  <span className="font-bold text-accent text-xl">0%</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-white/80">Protection Pool</span>
                    <span className="text-xs text-white/50">Dana perlindungan untuk semua anggota</span>
                  </div>
                  <span className="font-bold text-white text-xl">1%</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <ComparisonTable />
        </motion.div>
      </div>
    </section>
  );
}