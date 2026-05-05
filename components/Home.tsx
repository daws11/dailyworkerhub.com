"use client";

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Star, Clock, Users, Building2, ChevronRight, ShieldCheck, Wallet, CheckCircle2, TrendingUp, Search, Calendar, FileText, Check, X, Handshake, MessageCircle, Trophy } from "lucide-react";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Magnet } from "@/components/animations/Magnet";
import { ScrubText } from "@/components/animations/ScrubText";
import { FloatingElements } from "@/components/animations/FloatingElements";
import { LogoMarquee, StatsCounter, Testimonials, FAQ, ComparisonTable } from "@/components/sections";
import { useTranslations } from "next-intl";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
} as any;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const charVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const tiltVariants = {
  hover: {
    rotateX: 5,
    rotateY: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  }
} as any;

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

function HowItWorksTabs() {
  const [activeTab, setActiveTab] = useState<"bisnis" | "pekerja">("bisnis");
  const t = useTranslations("home");

  const bisnisSteps = [
    { step: "1", title: t("howBusinessStep1"), desc: t("howBusinessStep1Desc"), icon: FileText },
    { step: "2", title: t("howBusinessStep2"), desc: t("howBusinessStep2Desc"), icon: Building2 },
    { step: "3", title: t("howBusinessStep3"), desc: t("howBusinessStep3Desc"), icon: Search },
    { step: "4", title: t("howBusinessStep4"), desc: t("howBusinessStep4Desc"), icon: CheckCircle2 },
    { step: "5", title: t("howBusinessStep5"), desc: t("howBusinessStep5Desc"), icon: Wallet }
  ];

  const pekerjaSteps = [
    { step: "1", title: t("howWorkerStep1"), desc: t("howWorkerStep1Desc"), icon: Users },
    { step: "2", title: t("howWorkerStep2"), desc: t("howWorkerStep2Desc"), icon: Search },
    { step: "3", title: t("howWorkerStep3"), desc: t("howWorkerStep3Desc"), icon: CheckCircle2 },
    { step: "4", title: t("howWorkerStep4"), desc: t("howWorkerStep4Desc"), icon: Clock },
    { step: "5", title: t("howWorkerStep5"), desc: t("howWorkerStep5Desc"), icon: Wallet }
  ];

  const steps = activeTab === "bisnis" ? bisnisSteps : pekerjaSteps;

  return (
    <div className="w-full">
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
                {tab === "bisnis" ? t("howTabBusiness") : t("howTabWorker")}
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
                <div className="font-display text-white/60 text-xs font-bold mb-3 tracking-widest">{t("howStep")} 0{item.step}</div>
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

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("home");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, 200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const heroRef = useRef(null);
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
    <main className="min-h-screen bg-background overflow-hidden relative perspective-1000">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-50 mix-blend-overlay"></div>

      <MainNavbar />

      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
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
            style={{ y: heroTextY, opacity }}
            className="w-full md:w-[45%] relative z-20 order-1 mt-0"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="mb-4 md:mb-6 flex items-center gap-4">
                <span className="h-[2px] w-8 md:w-12 bg-primary block"></span>
                <span className="font-sub uppercase tracking-[0.2em] text-foreground dark:text-white/60 font-bold text-xs md:text-sm">
                  {t("tagline")}
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-foreground leading-[1.1] md:leading-[1.05] tracking-tight mb-4 md:mb-6 text-balance"
                initial={{ opacity: 1, y: 0 }}
              >
                <ScrubText
                  text={t("heroTitle")}
                  variant="reveal"
                />
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans font-light leading-[1.6] md:leading-[1.7] mb-8 md:mb-12 text-balance max-w-lg"
              >
                {t("heroDescription")}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12">
                <Magnet strength={isMobile ? 0.05 : 0.2}>
                  <motion.a
                    href="https://app.dailyworkerhub.com/register?role=business"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 md:px-10 h-14 text-sm md:text-base font-sub tracking-wide whitespace-nowrap shadow-xl group w-full sm:w-auto flex items-center justify-center gap-3"
                  >
                    <span>{t("postJob")}</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                </Magnet>
                <Magnet strength={isMobile ? 0.05 : 0.2}>
                  <motion.a
                    href="https://app.dailyworkerhub.com/register?role=pekerja"
                    whileHover={{ scale: 1.05, backgroundColor: "var(--foreground)", color: "white" }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-border text-foreground rounded-full px-8 md:px-10 h-14 text-sm md:text-base font-sub tracking-wide whitespace-nowrap bg-transparent hover:bg-foreground hover:text-white transition-colors flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    <span>{t("joinAsWorker")}</span>
                    <ArrowUpRight className="w-5 h-5 transition-all" />
                  </motion.a>
                </Magnet>
              </motion.div>
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
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[160px] sm:h-[200px] md:h-[300px] shadow-2xl relative group"
                >
                  <Image src="/hotel-action.webp" alt="Bisnis Hospitality" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </motion.div>
                <motion.div
                  style={{ y: p2 }}
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[100px] sm:h-[160px] md:h-[240px] shadow-2xl relative group"
                >
                  <Image src="/hero-bg.webp" alt="Daily Pekerja" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </motion.div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3 sm:gap-4 pb-4 md:pb-12">
                <motion.div
                  style={{ y: p3 }}
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl md:rounded-[2rem] overflow-hidden h-[120px] sm:h-[160px] md:h-[240px] shadow-2xl relative group"
                >
                  <Image src="/hotel-action.webp" alt="Tim Kerja" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                </motion.div>
                <motion.div
                  style={{ y: p4 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass-card rounded-2xl md:rounded-[2rem] h-[140px] sm:h-[200px] md:h-[300px] p-4 sm:p-6 md:p-8 flex flex-col justify-between border-border/50 dark:bg-slate-800/60 dark:md:bg-slate-800/40"
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1 md:mb-4 shrink-0">
                    <Star className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-sm sm:text-lg md:text-2xl text-foreground mb-1 md:mb-2 leading-snug">{t("qualityQuote")}</h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PURPOSE — tentang Daily Worker Hub */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 md:px-8 relative z-10 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              {t("aboutUs")}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              {t("aboutTitle")}
            </h2>
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t("aboutDescription")}
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* For Pekerja */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t("forWorkers")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("forWorkersDesc")}
              </p>
            </div>

            {/* For Businesses */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t("forBusiness")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("forBusinessFeatureDesc")}
              </p>
            </div>

            {/* Protection */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t("protection")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("protectionDesc")}
              </p>
            </div>
          </div>

          {/* Traction microcopy */}
          <p className="text-center mt-12 text-sm text-muted-foreground/70">
            {t("tractionStats")}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LOGO MARQUEE — social proof */}
      {/* ============================================================ */}
      {/* STATS COUNTER — sementara nonaktif (belum launch) */}
      {/* ============================================================ */}
      {/* <StatsCounter /> */}

      {/* ============================================================ */}
      {/* LOGO MARQUEE — sementara nonaktif (belum launch) */}
      {/* ============================================================ */}
      {/* <LogoMarquee /> */}

      {/* ============================================================ */}
      {/* SIDE INCOME SECTION */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-background dark:bg-dark-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2">
            <motion.div
              style={{ y: isMobile ? 0 : y2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-primary/10"></div>
                <Image src="/worker-portrait.webp" alt="Pekerja Fleksibel" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10 flex flex-col justify-end p-8 pb-12 md:p-12 text-white">
                  <div className="mb-4 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="text-accent font-sub font-bold text-sm uppercase tracking-widest">{t("flexible")}</span>
                    </div>
                    <p className="font-bold text-lg md:text-xl leading-snug drop-shadow-md">{t("flexibleDesc")}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <span className="font-sub uppercase tracking-[0.2em] text-foreground dark:text-white/60 font-bold text-sm mb-4">{t("sideIncome")}</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 tracking-tight text-balance">
              {t("sideIncomeTitle")}<br />
              <span className="text-secondary dark:text-white/70">{t("sideIncomeSub")}</span>
            </h2>

            <div className="space-y-4 mb-10 text-muted-foreground font-sans text-lg">
              <p>
                {t("sideIncomeDesc")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-base">
                <li>{t("sideIncome1")}</li>
                <li>{t("sideIncome2")}</li>
                <li>{t("sideIncome3")}</li>
                <li>{t("sideIncome4")}</li>
              </ul>
            </div>

            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-base md:text-lg font-sub shadow-xl w-full sm:w-auto">
              <a href="https://app.dailyworkerhub.com/register?role=pekerja">
                {t("joinAsWorker")} <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOR BUSINESSES SECTION */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2 flex flex-col items-start pt-8 md:pt-0">
            <span className="font-sub uppercase tracking-[0.2em] text-foreground dark:text-white/60 font-bold text-sm mb-4">{t("forBusinessTab")}</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 tracking-tight text-balance">
              {t("forBusinessTitle")}<br />
              <span className="text-secondary dark:text-white/70">{t("forBusinessSub")}</span>
            </h2>

            <div className="space-y-4 mb-10 text-muted-foreground font-sans text-lg">
              <p>
                {t("forBusinessDesc")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-base">
                <li>{t("forBusiness1")}</li>
                <li>{t("forBusiness2")}</li>
                <li>{t("forBusiness3")}</li>
                <li>{t("forBusiness4")}</li>
              </ul>
            </div>

            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-base md:text-lg font-sub shadow-xl w-full sm:w-auto">
              <a href="https://app.dailyworkerhub.com/register?role=business">
                {t("postJob")} <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              style={{ y: isMobile ? 0 : y1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-primary/10"></div>
                <Image src="/hotel-action.webp" alt="Manajemen Bisnis" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10 flex flex-col justify-end p-8 pb-12 md:p-12 text-white">
                  <div className="mb-4 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-accent" />
                      <span className="text-accent font-sub font-bold text-sm uppercase tracking-widest">{t("structured")}</span>
                    </div>
                    <p className="font-bold text-lg md:text-xl leading-snug drop-shadow-md">{t("structuredDesc")}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS SECTION */}
      {/* ============================================================ */}
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
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t("howItWorks")}</h2>
            <p className="font-serif italic text-xl text-white/70">{t("howItWorksSub")}</p>
          </motion.div>

          <HowItWorksTabs />
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS — suara komunitas */}
      {/* ============================================================ */}
      <Testimonials />

      {/* ============================================================ */}
      {/* PRICING / TRANSPARENCY SECTION */}
      {/* ============================================================ */}
      <section id="pricing" className="py-24 md:py-32 px-4 md:px-8 bg-background dark:bg-dark-secondary relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              {t("pricingTitle")}
            </h2>
            <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("pricingSub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Pricing */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-background dark:bg-dark-primary rounded-[2rem] p-8 md:p-12 border border-border shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="font-display text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-secondary dark:text-white/70" /> {t("pricingBusinessTitle")}
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium text-muted-foreground">{t("pricingBusinessFee")}</span>
                  <span className="font-bold text-primary text-xl">6%</span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium text-muted-foreground">{t("pricingTopupFee")}</span>
                  <span className="font-bold text-primary text-xl">Rp 0</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="font-medium text-muted-foreground">{t("pricingSubFee")}</span>
                  <span className="font-bold text-primary text-xl">Rp 0</span>
                </li>
              </ul>
            </motion.div>

            {/* Pekerja Pricing */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-primary text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group/pricing"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0 group-hover/pricing:scale-150 transition-transform duration-700"></div>
              <h3 className="font-display text-2xl font-bold text-accent mb-6 flex items-center gap-3 relative z-10">
                <Users className="w-6 h-6" /> {t("pricingWorkerTitle")}
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span className="font-medium text-white/80">{t("pricingWorkerCommission")}</span>
                  <span className="font-bold text-accent text-xl">0%</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-white/80">{t("pricingWorkerProtection")}</span>
                    <span className="text-xs text-white/50">{t("pricingWorkerProtectionDesc")}</span>
                  </div>
                  <span className="font-bold text-white text-xl">1%</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <ComparisonTable />
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMMUNITY CTA SECTION */}
      {/* ============================================================ */}
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
              {t("communityCTA")}
            </h2>
            <p className="font-sans text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
              {t("communityCTADesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 mb-6">
              <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-10 h-14 sm:h-16 text-base sm:text-lg font-sub shadow-xl group w-full sm:w-auto flex justify-center items-center gap-3">
                <a href="/community">
                  <span className="flex items-center gap-2">{t("visitCommunity")}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 sm:px-10 h-14 sm:h-16 text-base sm:text-lg font-sub bg-transparent w-full sm:w-auto flex justify-center items-center">
                <a href="https://app.dailyworkerhub.com/register?role=business">
                  {t("postJob")}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 sm:px-10 h-14 sm:h-16 text-base sm:text-lg font-sub bg-transparent w-full sm:w-auto flex justify-center items-center">
                <a href="https://app.dailyworkerhub.com/register?role=pekerja">
                  {t("joinAsWorker")}
                </a>
              </Button>
            </div>
            <p className="font-sub text-sm text-white/50 mt-8 relative z-10">
              {t("communityLinkLabel")}{" "}
              <a href="/community" className="text-white/70 hover:text-white underline">
                dailyworkerhub.com/community
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ — menjawab keberatan terakhir sebelum footer */}
      {/* ============================================================ */}
      <FAQ />

      {/* ============================================================ */}
      {/* MOBILE FIXED CTA */}
      {/* ============================================================ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border z-50 flex gap-2">
        <Button asChild className="flex-1 bg-secondary hover:bg-secondary/90 text-white rounded-full h-12 text-sm font-sub shadow-xl">
          <a href="https://app.dailyworkerhub.com/register?role=business">{t("mobileBusinessCTA")}</a>
        </Button>
        <Button asChild variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 rounded-full h-12 text-sm font-sub">
          <a href="https://app.dailyworkerhub.com/register?role=pekerja">{t("mobileWorkerCTA")}</a>
        </Button>
      </div>
    </main>
  );
}
