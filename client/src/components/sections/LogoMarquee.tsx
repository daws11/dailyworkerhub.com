import { motion } from "framer-motion";

const partners = [
  "Warung Sari",
  "Kopi Nusantara",
  "Toko Berkah",
  "Hotel Kenanga",
  "Resto Melati",
  "Bengkel Jaya",
  "Laundry Harum",
  "Cafe Senja",
  "Mart Rakyat",
  "Katering Bu Ani",
];

export function LogoMarquee() {
  const loop = [...partners, ...partners];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-background border-y border-border relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-sub text-sm uppercase tracking-[0.18em] text-muted-foreground mb-10"
        >
          Dipercaya oleh ratusan bisnis di seluruh Indonesia
        </motion.p>

        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee-x flex gap-6 w-max">
            {loop.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="shrink-0 px-8 py-4 rounded-full border border-border bg-white/60 backdrop-blur-sm font-display text-xl font-semibold text-secondary/70 hover:text-primary hover:border-primary/30 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
