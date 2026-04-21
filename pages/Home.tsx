"use client";

import { Navbar } from "@/components/layout/Navbar";
import {
  LogoMarquee,
  StatsCounter,
  Testimonials,
  FAQ,
  ComparisonTable,
  HeroSection,
  HowItWorksSection,
  ValuePropositionSection,
  SideIncomeSection,
  ForBusinessSection,
  PricingSection,
  CommunityCtaSection,
  Footer,
  MobileFixedCta,
  ScrollProgressBar,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-50 mix-blend-overlay"></div>

      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Logo Marquee - social proof */}
      <LogoMarquee />

      {/* Stats Counter - komunitas traction */}
      <StatsCounter />

      {/* Value Proposition Section */}
      <ValuePropositionSection />

      {/* Side Income Section */}
      <SideIncomeSection />

      {/* For Business Section */}
      <ForBusinessSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials - suara komunitas */}
      <Testimonials />

      {/* Pricing Section */}
      <PricingSection />

      {/* Community CTA Section */}
      <CommunityCtaSection />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Mobile Fixed CTA */}
      <MobileFixedCta />
    </main>
  );
}
