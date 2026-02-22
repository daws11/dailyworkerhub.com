import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Star, Clock, Users, Building2, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import heroBg from "@/assets/images/hero-hospitality.jpg";
import actionImg from "@/assets/images/kitchen-action.jpg";
import portraitImg from "@/assets/images/portrait-worker.jpg";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
      <section className="relative h-[100dvh] w-full flex items-center overflow-hidden bg-primary clip-diagonal">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y1 }}
        >
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10" />
          <img 
            src={heroBg} 
            alt="Hospitality Worker in Bali" 
            className="w-full h-[120%] object-cover object-center transform -translate-y-[10%]"
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full pt-20">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-secondary block"></span>
              <span className="font-sub uppercase tracking-[0.2em] text-secondary font-medium text-sm">
                Bali's Premium Network
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-8 text-balance"
            >
              Authentic warmth.<br />
              <span className="text-secondary italic font-serif font-light">Tech precision.</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-2xl text-white/80 max-w-2xl font-sans font-light leading-relaxed mb-12 text-balance"
            >
              We connect Bali's finest hospitality businesses with verified professional daily workers. No generic rosters—just genuine talent powered by modern reliability.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 h-14 text-lg font-sub tracking-wide shadow-xl shadow-secondary/20 group">
                Find Talent Now
                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary rounded-full px-8 h-14 text-lg font-sub tracking-wide bg-transparent backdrop-blur-sm">
                Join as a Worker
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="max-w-md">
              <h2 className="font-serif italic text-3xl md:text-4xl text-primary mb-4">"It's not just about filling shifts. It's about finding the right energy."</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={portraitImg} alt="Reviewer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sub font-bold text-primary">Made Sudana</p>
                  <p className="text-sm text-muted-foreground">F&B Director, Seminyak</p>
                </div>
              </div>
            </div>
            
            <div className="w-px h-24 bg-border hidden md:block"></div>

            <div className="flex gap-12 md:gap-24">
              <CountUp end={500} label="Verified Workers" suffix="+" />
              <CountUp end={98} label="Match Rate" suffix="%" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Asymmetric About Section */}
      <section id="about" className="py-24 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            style={{ y: y2 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] md:aspect-[3/4] rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
              <img src={actionImg} alt="Kitchen Action" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700" />
            </div>
            {/* Floating decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
          </motion.div>

          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-8 tracking-tight">
              Built in Bali,<br />
              <span className="text-secondary">for Bali.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-sans font-light leading-relaxed mb-6">
              We understand the rhythm of the island. Hospitality here isn't just an industry; it's a culture of warmth and care. We built Daily Worker Hub to protect that culture while bringing the reliability of modern technology to your operations.
            </p>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed mb-10">
              No more chaotic WhatsApp groups or uncertain turn-ups. Just verified professionals ready to deliver exceptional service.
            </p>

            <ul className="space-y-6 mb-12">
              {[
                { icon: Star, text: "Strict vetting & skill verification" },
                { icon: Clock, text: "Real-time availability matching" },
                { icon: Users, text: "Community-rated reliability scores" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-primary font-sub font-medium text-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-secondary">
                    <item.icon className="w-5 h-5" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive "How it Works" Timeline */}
      <section id="how-it-works" className="py-24 md:py-32 bg-primary text-white relative clip-diagonal-reverse pb-48">
        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 mt-12">
          <div className="text-center mb-24">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">The Process</h2>
            <p className="font-serif italic text-xl md:text-2xl text-white/70">Seamless precision meets human connection.</p>
          </div>

          <div className="relative border-l border-white/20 ml-6 md:ml-0 md:pl-12 space-y-24">
            {/* Timeline Steps */}
            {[
              {
                step: "01",
                title: "Post Your Shift",
                desc: "Drop the details in seconds. Our system categorizes your needs by venue type, role, and required expertise."
              },
              {
                step: "02",
                title: "Algorithmic Matching",
                desc: "We don't just blast notifications. We match your shift with workers who have proven experience in your specific venue style."
              },
              {
                step: "03",
                title: "Instant Confirmation",
                desc: "Review profiles, see ratings, and confirm with one tap. The worker receives a detailed brief and location pin."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative group"
              >
                {/* Dot */}
                <div className="absolute -left-[1.6rem] md:-left-[3.1rem] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-primary group-hover:scale-150 transition-transform duration-300"></div>
                
                <span className="font-display text-6xl font-bold text-white/10 absolute -top-8 -left-4 md:left-0 select-none">
                  {item.step}
                </span>
                <h3 className="font-sub text-2xl md:text-3xl font-bold mb-4 relative z-10 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-white/70 text-lg leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-8 relative -mt-24 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-accent rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Decorative BG */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent"></div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-8 relative z-10 tracking-tight">
              Ready to elevate your service?
            </h2>
            <p className="font-sans text-xl text-primary/80 mb-12 max-w-2xl mx-auto relative z-10">
              Join the community of top-tier venues and professionals redefining hospitality in Bali.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg font-sub shadow-xl group">
                Post a Shift
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-10 h-16 text-lg font-sub bg-transparent">
                Apply as Worker
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 md:px-8 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold font-display tracking-tighter">
              DH
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Daily Worker Hub
            </span>
          </div>
          <div className="text-white/50 text-sm">
            © 2026 Daily Worker Hub. Built in Bali.
          </div>
        </div>
      </footer>
      
      {/* Mobile Fixed CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-50">
         <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full h-14 text-lg font-sub shadow-xl">
            Hire Talent Now
         </Button>
      </div>
    </main>
  );
}