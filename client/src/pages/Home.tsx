import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Star, Clock, Users, Building2, ChevronRight, ShieldCheck, Wallet, CheckCircle2, TrendingUp, Search, Calendar, FileText, Check, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import heroBg from "@/assets/images/hero-hospitality.jpg";
import actionImg from "@/assets/images/kitchen-action.jpg";
import portraitImg from "@/assets/images/portrait-worker.jpg";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function CountUp({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isVisible, end]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-5xl md:text-7xl font-bold text-primary">
        {count}{suffix}
      </span>
      <span className="font-sub text-muted-foreground mt-2 uppercase tracking-widest text-sm">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      {/* Texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-50 mix-blend-overlay"></div>
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] w-full flex items-center overflow-hidden bg-background">
        {/* Mobile Decorative Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none md:hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-[60px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 md:pt-32 pb-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          {/* Left: Content */}
          <div className="w-full md:w-[45%] relative z-20 order-1 mt-8 md:mt-0">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp} className="mb-4 md:mb-6 flex items-center gap-4">
                <span className="h-[2px] w-8 md:w-12 bg-secondary block"></span>
                <span className="font-sub uppercase tracking-[0.2em] text-secondary font-bold text-xs md:text-sm">
                  Community-First Platform
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeUp}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-foreground leading-[1.1] md:leading-[1.05] tracking-tight mb-6 md:mb-8 text-balance"
              >
                Temukan<br />Pekerja Harian<br />Profesional<br />
                di Bali.<br />
                <span className="text-secondary italic font-serif font-light">Hari Ini.</span>
              </motion.h1>

              <motion.p 
                variants={fadeUp}
                className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans font-light leading-[1.6] md:leading-[1.7] mb-8 md:mb-12 text-balance max-w-lg"
              >
                Platform yang menghubungkan hotel, villa & restoran dengan pekerja harian terpercaya. Rate Bali adil, reliability score transparan, 100% legal sesuai PP 35/2021.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-base md:text-lg font-sub tracking-wide shadow-xl group justify-between w-full sm:w-auto">
                  <span>🏢 Daftar (Bisnis)</span>
                  <ArrowUpRight className="ml-4 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-foreground hover:text-white rounded-full px-8 h-14 text-base md:text-lg font-sub tracking-wide bg-transparent justify-between w-full sm:w-auto transition-colors">
                  <span>👷 Profil (Pekerja)</span>
                  <ArrowUpRight className="ml-4 w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-row gap-4 sm:gap-8 items-center border-t border-border pt-6 md:pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground text-xl sm:text-2xl">50+</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider">Bisnis Bergabung</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground text-xl sm:text-2xl">500+</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider">Pekerja Aktif</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Asymmetric Image Grid */}
          <div className="w-full md:w-[55%] relative z-10 order-2">
            <motion.div 
              className="grid grid-cols-2 gap-3 sm:gap-4 h-[280px] sm:h-[400px] md:h-[600px] relative"
            >
              {/* Decorative Blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-accent/30 rounded-full blur-[60px] md:blur-[80px] -z-10"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-secondary/20 rounded-full blur-[60px] md:blur-[80px] -z-10"></div>

              {/* Column 1 - Shifts Down */}
              <div className="flex flex-col gap-3 sm:gap-4 pt-4 md:pt-12">
                <div className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[160px] sm:h-[200px] md:h-[300px] shadow-2xl relative group">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <img src={actionImg} alt="Hotel Business" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[100px] sm:h-[160px] md:h-[240px] shadow-2xl relative group">
                  <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <img src={heroBg} alt="Hospitality Scene" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              {/* Column 2 - Shifts Up */}
              <div className="flex flex-col gap-3 sm:gap-4 pb-4 md:pb-12">
                <div className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[120px] sm:h-[160px] md:h-[240px] shadow-2xl relative group">
                  <div className="absolute inset-0 bg-accent/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <img src={portraitImg} alt="Worker Portrait" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top" />
                </div>
                <div className="glass-card rounded-2xl md:rounded-[2rem] h-[140px] sm:h-[200px] md:h-[300px] p-4 sm:p-6 md:p-8 flex flex-col justify-between border-border/50 bg-white/80 md:bg-white/60">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1 md:mb-4 shrink-0">
                    <Star className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-sm sm:text-lg md:text-2xl text-foreground mb-1 md:mb-2 leading-snug">"Quality of service starts with quality of people."</h3>
                    <p className="font-sub text-[9px] md:text-sm text-muted-foreground uppercase tracking-widest">— The Bali Way</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Bukan Sekadar Marketplace.<br />
              <span className="font-serif italic text-secondary font-light">Ini Ekosistem.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-[2rem] p-8 md:p-12 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-secondary mb-8">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Reliability Score™</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                Score 1-5 berdasarkan kehadiran & ketepatan waktu. Lihat track record asli, jangan sekadar menebak.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-[2rem] p-8 md:p-12 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-secondary mb-8">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Compliance Guard™</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                Proteksi otomatis PP 35/2021. Tidak ada risiko pelanggaran limit 21 hari dengan sistem tracking pintar kami.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-[2rem] p-8 md:p-12 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-secondary mb-8">
                <Wallet className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Rate Bali Adil</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                Upah terstandarisasi berbasis UMK. Pekerja mendapatkan bayaran fair, bisnis memiliki kejelasan budget.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Businesses (Demand Side) */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2">
            <motion.div 
              style={{ y: y2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
                <img src={actionImg} alt="Hotel Management" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                      <img src={portraitImg} alt="Manager" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex text-accent mb-1">
                        <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                      </div>
                      <p className="font-bold text-sm">"No-show rate turun drastis dari 30% ke 5%. Game changer untuk operasional kami."</p>
                    </div>
                  </div>
                  <p className="font-sub text-xs text-white/70 uppercase tracking-widest">— Hotel Manager, Ubud</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <span className="font-sub uppercase tracking-[0.2em] text-secondary font-bold text-sm mb-4">Untuk Bisnis</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 tracking-tight text-balance">
              Stop No-Show.<br />
              Start Reliability.
            </h2>
            
            <div className="space-y-3 mb-10 text-muted-foreground font-sans">
              <p className="flex items-start gap-3"><span className="text-secondary mt-1">😫</span> Pekerja tidak datang last minute?</p>
              <p className="flex items-start gap-3"><span className="text-secondary mt-1">❓</span> Tidak ada data kehandalan sebelum booking?</p>
              <p className="flex items-start gap-3"><span className="text-secondary mt-1">⚖️</span> Takut salah hitung PP 35/2021 (21 hari limit)?</p>
              <p className="flex items-start gap-3"><span className="text-secondary mt-1">⏱️</span> Rekrut manual butuh waktu berjam-jam?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-12">
              {[
                "Filter by skill & score",
                "One-tap booking & notif real-time",
                "QR check-in absensi otomatis",
                "Compliance alert (day 15-18)",
                "Wallet system: bayar otomatis",
                "Digital contract PDF per shift"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span className="font-sans text-primary font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="glass-card bg-primary/5 p-6 rounded-2xl mb-10 w-full flex items-center justify-between border-primary/10">
              <div>
                <p className="text-sm text-muted-foreground font-sub uppercase tracking-wider mb-1">Rata-rata Reliability Score</p>
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl text-primary font-bold line-through opacity-50">2.4</span>
                  <ArrowRight className="text-secondary w-5 h-5" />
                  <span className="font-display text-4xl text-primary font-bold">4.6<span className="text-lg text-muted-foreground">/5.0</span></span>
                </div>
              </div>
              <TrendingUp className="text-secondary w-12 h-12 opacity-20" />
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-sub shadow-xl w-full sm:w-auto">
              Daftar Gratis → Booking Hari Ini
            </Button>
          </div>
        </div>
      </section>

      {/* For Workers (Supply Side) */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <span className="font-sub uppercase tracking-[0.2em] text-accent font-bold text-sm mb-4">Untuk Pekerja</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 tracking-tight text-balance">
              Kerja Fleksibel.<br />
              <span className="text-accent">Income Stabil.</span><br />
              Perlindungan Nyata.
            </h2>
            
            <div className="space-y-3 mb-10 text-muted-foreground font-sans">
              <p className="flex items-start gap-3"><span className="text-destructive mt-1">📅</span> Job tidak stabil, banyak hari kosong?</p>
              <p className="flex items-start gap-3"><span className="text-destructive mt-1">💸</span> Upah rendah dan lelah negosiasi?</p>
              <p className="flex items-start gap-3"><span className="text-destructive mt-1">🏥</span> Tidak ada jaminan sosial/kesehatan?</p>
              <p className="flex items-start gap-3"><span className="text-destructive mt-1">⭐</span> Reputasi bagus tidak diakui di tempat baru?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-12">
              {[
                "Browse jobs terdekat dengan filter",
                "'Rate Bali' standar - tanpa tawar",
                "Build score untuk job premium",
                "Instant payout ke wallet",
                "BPJS & asuransi dari Community Fund",
                "Review system - reputasi ikut kamu"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="font-sans text-primary font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="glass-card bg-white p-6 rounded-2xl mb-10 w-full flex items-center justify-between border-white">
              <div>
                <p className="text-sm text-muted-foreground font-sub uppercase tracking-wider mb-1">Rata-rata Pendapatan</p>
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-primary font-bold line-through opacity-50">Rp 3.2jt</span>
                  <ArrowRight className="text-accent w-5 h-5" />
                  <span className="font-display text-3xl text-primary font-bold text-accent">Rp 5.8jt<span className="text-sm text-muted-foreground">/bln</span></span>
                </div>
              </div>
              <Wallet className="text-accent w-12 h-12 opacity-20" />
            </div>

            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary rounded-full px-8 h-14 text-lg font-sub font-bold shadow-xl w-full sm:w-auto">
              Daftar Gratis → Dapat Job Hari Ini
            </Button>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div 
              style={{ y: y1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
                <img src={portraitImg} alt="Worker" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="mb-4">
                    <div className="flex text-accent mb-3">
                      <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="font-bold text-lg leading-snug">"Dulu 2-3 job/week. Sekarang 20+ shift/bulan dengan rate yang jauh lebih tinggi dan pasti dibayar."</p>
                  </div>
                  <p className="font-sub text-sm text-accent uppercase tracking-widest">— I Made, Housekeeper</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive "How it Works" Tabs */}
      <section id="how-it-works" className="py-24 md:py-32 bg-primary text-white relative pb-32">
        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Cara Kerja</h2>
            <p className="font-serif italic text-xl text-white/70">Seamless precision meets human connection.</p>
          </div>

          <Tabs defaultValue="bisnis" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="bg-white/10 p-1 rounded-full border border-white/20 h-16">
                <TabsTrigger value="bisnis" className="rounded-full px-8 py-3 text-lg font-sub data-[state=active]:bg-secondary data-[state=active]:text-white">Untuk Bisnis</TabsTrigger>
                <TabsTrigger value="pekerja" className="rounded-full px-8 py-3 text-lg font-sub data-[state=active]:bg-accent data-[state=active]:text-primary">Untuk Pekerja</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="bisnis" className="mt-0 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
                {[
                  { step: "1", title: "Sign Up", desc: "Verifikasi bisnis dalam 5 menit.", icon: FileText },
                  { step: "2", title: "Post Job", desc: "Input posisi, tanggal & jumlah worker.", icon: Building2 },
                  { step: "3", title: "Match", desc: "Filter by reliability, kirim request.", icon: Search },
                  { step: "4", title: "Confirm", desc: "Worker accept, pantau QR check-in.", icon: CheckCircle2 },
                  { step: "5", title: "Auto-pay", desc: "Wallet system, transparan tanpa ribet.", icon: Wallet }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary mx-auto flex items-center justify-center mb-4 border border-secondary/30">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="font-display text-white/40 text-sm font-bold mb-2">STEP 0{item.step}</div>
                    <h3 className="font-sub font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pekerja" className="mt-0 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
                {[
                  { step: "1", title: "Create Profile", desc: "Upload skill, foto, & verifikasi KYC.", icon: Users },
                  { step: "2", title: "Browse Jobs", desc: "Filter posisi, area, & ketersediaan.", icon: Search },
                  { step: "3", title: "1-Tap Apply", desc: "Satu klik apply, notif real-time.", icon: CheckCircle2 },
                  { step: "4", title: "Check-in", desc: "Scan QR di lokasi untuk absen.", icon: Clock },
                  { step: "5", title: "Get Paid", desc: "Instant ke wallet, withdraw kapan saja.", icon: Wallet }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center mb-4 border border-accent/30">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="font-display text-white/40 text-sm font-bold mb-2">STEP 0{item.step}</div>
                    <h3 className="font-sub font-bold text-xl mb-2 text-accent">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing / Transparency Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Transparan.<br />Tidak Ada Hidden Fee.
            </h2>
            <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
              Fairness is built into our code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Business Pricing */}
            <div className="bg-background rounded-[2rem] p-8 md:p-12 border border-border">
              <h3 className="font-display text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-secondary" /> Untuk Bisnis
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium text-muted-foreground">Komisi per transaksi</span>
                  <span className="font-bold text-primary text-xl">6%</span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium text-muted-foreground">Biaya top-up (QRIS)</span>
                  <span className="font-bold text-primary text-xl">Rp 0</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="font-medium text-muted-foreground">Subscription / Hidden Cost</span>
                  <span className="font-bold text-primary text-xl">Rp 0</span>
                </li>
              </ul>
            </div>

            {/* Worker Pricing */}
            <div className="bg-primary text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
              <h3 className="font-display text-2xl font-bold text-accent mb-6 flex items-center gap-3 relative z-10">
                <Users className="w-6 h-6" /> Untuk Pekerja
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span className="font-medium text-white/80">Komisi potongan upah</span>
                  <span className="font-bold text-accent text-xl">0%</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/20 pb-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white/80">Community Fund</span>
                    <span className="text-xs text-white/50">Untuk alokasi BPJS & Asuransi</span>
                  </div>
                  <span className="font-bold text-white text-xl">1-2%</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-white/80">Withdrawal fee</span>
                    <span className="text-xs text-white/50">Gratis 1x/minggu</span>
                  </div>
                  <span className="font-bold text-white text-xl">Rp 2.500 <span className="text-sm font-normal text-white/60">/instant</span></span>
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background/50">
                  <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">Feature</th>
                  <th className="p-6 font-display font-bold text-xl text-primary border-b border-border bg-primary/5">Daily Worker Hub</th>
                  <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">Staffinc</th>
                  <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">MyRobin</th>
                  <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">Manual / WA</th>
                </tr>
              </thead>
              <tbody className="font-sans text-primary">
                <tr>
                  <td className="p-6 border-b border-border font-medium">Fokus Industri</td>
                  <td className="p-6 border-b border-border bg-primary/5 font-bold text-secondary">Hospitality Bali</td>
                  <td className="p-6 border-b border-border text-muted-foreground">General (Retail/F&B)</td>
                  <td className="p-6 border-b border-border text-muted-foreground">Blue Collar Umum</td>
                  <td className="p-6 border-b border-border text-muted-foreground">Hospitality</td>
                </tr>
                <tr>
                  <td className="p-6 border-b border-border font-medium">Reliability Score</td>
                  <td className="p-6 border-b border-border bg-primary/5"><Check className="text-secondary w-6 h-6" /></td>
                  <td className="p-6 border-b border-border text-muted-foreground">-</td>
                  <td className="p-6 border-b border-border text-muted-foreground">-</td>
                  <td className="p-6 border-b border-border text-destructive"><X className="w-6 h-6" /></td>
                </tr>
                <tr>
                  <td className="p-6 border-b border-border font-medium">Kepatuhan PP 35/2021</td>
                  <td className="p-6 border-b border-border bg-primary/5 font-bold">Auto-Guard System</td>
                  <td className="p-6 border-b border-border text-muted-foreground">Tersedia</td>
                  <td className="p-6 border-b border-border text-muted-foreground">Tersedia</td>
                  <td className="p-6 border-b border-border text-destructive">Risiko Tinggi</td>
                </tr>
                <tr>
                  <td className="p-6 border-b border-border font-medium">Asuransi / BPJS</td>
                  <td className="p-6 border-b border-border bg-primary/5 font-bold">Community Fund</td>
                  <td className="p-6 border-b border-border text-muted-foreground">Via Agency</td>
                  <td className="p-6 border-b border-border text-muted-foreground">Via Agency</td>
                  <td className="p-6 border-b border-border text-destructive"><X className="w-6 h-6" /></td>
                </tr>
                <tr>
                  <td className="p-6 border-b border-border font-medium">Rate Pekerja</td>
                  <td className="p-6 border-b border-border bg-primary/5 font-bold">100% (Tanpa Potongan)</td>
                  <td className="p-6 border-b border-border text-muted-foreground">N/A</td>
                  <td className="p-6 border-b border-border text-muted-foreground">N/A</td>
                  <td className="p-6 border-b border-border text-muted-foreground">Sering dinego</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-8 relative z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent"></div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 relative z-10 tracking-tight">
              Mulai Bangun Tim <span className="text-accent italic font-serif font-light">Solid</span> Anda
            </h2>
            <p className="font-sans text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
              Bergabung dengan ekosistem hospitality terbesar dan terpercaya di Bali.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-10 h-16 text-lg font-sub shadow-xl group">
                🏢 Daftar Gratis (Bisnis)
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 rounded-full px-10 h-16 text-lg font-sub bg-transparent">
                👷 Buat Profil (Pekerja)
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 md:px-8 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold font-display tracking-tighter">
              DH
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Daily Worker Hub
            </span>
          </div>
          <div className="flex gap-6 font-sub text-sm uppercase tracking-widest text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-white/50 text-sm">
            © 2026 Daily Worker Hub. Built in Bali.
          </div>
        </div>
      </footer>
      
      {/* Mobile Fixed CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border z-50 flex gap-2">
         <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-white rounded-full h-12 text-sm font-sub shadow-xl">
            Untuk Bisnis
         </Button>
         <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 rounded-full h-12 text-sm font-sub">
            Untuk Pekerja
         </Button>
      </div>
    </main>
  );
}