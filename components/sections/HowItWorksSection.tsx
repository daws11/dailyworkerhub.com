"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Building2, Search, CheckCircle2, Wallet, Users, Clock } from "lucide-react";
import { useState } from "react";

// Animation variants
const stepCardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.94, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: i * 0.09,
      ease: [0.22, 1, 0.36, 1],
    }
  }),
  exit: { opacity: 0, y: -16, scale: 0.96, filter: "blur(4px)", transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] } }
} as any;

const tabPanelVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } }
} as any;

interface HowItWorksTabsProps {
  className?: string;
}

export function HowItWorksTabs({ className }: HowItWorksTabsProps) {
  const [activeTab, setActiveTab] = useState<"bisnis" | "pekerja">("bisnis");

  const bisnisSteps = [
    { step: "1", title: "Daftar & Verifikasi", desc: "Proses verifikasi bisnis dalam hitungan menit.", icon: FileText },
    { step: "2", title: "Pasang Lowongan", desc: "Tentukan posisi, tanggal, jumlah worker, dan budget.", icon: Building2 },
    { step: "3", title: "Pilih Worker", desc: "Lihat reputasi dan histori pekerja sebelum memilih.", icon: Search },
    { step: "4", title: "Konfirmasi & Pantau", desc: "Worker check-in via QR code di lokasi.", icon: CheckCircle2 },
    { step: "5", title: "Pembayaran Otomatis", desc: "Dana ditransfer otomatis setelah shift selesai.", icon: Wallet }
  ];

  const pekerjaSteps = [
    { step: "1", title: "Buat Profil", desc: "Unggah informasi dasar, foto, dan mulai verifikasi.", icon: Users },
    { step: "2", title: "Jelajahi Lowongan", desc: "Filter berdasarkan posisi, area, dan ketersediaan.", icon: Search },
    { step: "3", title: "Lamar Sekali Klik", desc: "Tidak perlu kirim pesan atau hubungi calo.", icon: CheckCircle2 },
    { step: "4", title: "Check-in di Lokasi", desc: "Scan QR code untuk konfirmasi kehadiran.", icon: Clock },
    { step: "5", title: "Dana Masuk Langsung", desc: "Pembayaran ditransfer ke wallet setelah shift.", icon: Wallet }
  ];

  const steps = activeTab === "bisnis" ? bisnisSteps : pekerjaSteps;

  return (
    <div className={`w-full ${className || ""}`}>
      {/* Tab switcher */}
      <div className="flex justify-center mb-16">
        <div className="bg-black/10 p-1.5 rounded-full border border-white/20 flex gap-1">
          {(["bisnis", "pekerja"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative rounded-full px-8 py-3 text-lg font-sub transition-colors duration-300 focus:outline-none"
              style={{ color: activeTab === tab ? undefined : "rgba(255,255,255,0.6)" }}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="how-tab-pill"
                  className={`absolute inset-0 rounded-full ${tab === "bisnis" ? "bg-secondary" : "bg-white"}`}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span
                className="relative z-10 font-sub"
                style={{
                  color: activeTab === tab
                    ? tab === "bisnis" ? "white" : "var(--color-primary)"
                    : "rgba(255,255,255,0.6)"
                }}
              >
                {tab === "bisnis" ? "Untuk Bisnis" : "Untuk Pekerja"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards with AnimatePresence */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6"
          >
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={stepCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  backgroundColor: "rgba(255,255,255,0.22)",
                  borderColor: "rgba(255,255,255,0.4)",
                  transition: { duration: 0.28, ease: "easeOut" }
                }}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-lg backdrop-blur-sm cursor-default"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-white text-primary mx-auto flex items-center justify-center mb-5 shadow-2xl"
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0 0 24px 4px rgba(255,255,255,0.35)",
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                >
                  <item.icon className="w-7 h-7" />
                </motion.div>
                <div className="font-display text-white/60 text-xs font-bold mb-3 tracking-widest">LANGKAH 0{item.step}</div>
                <h3 className="font-sub font-bold text-xl mb-3 text-white">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-primary text-white relative pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>

      <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Cara Kerja</h2>
          <p className="font-serif italic text-xl text-white/70">Proses yang sederhana, hasil yang terstruktur.</p>
        </motion.div>

        <HowItWorksTabs />
      </div>
    </section>
  );
}