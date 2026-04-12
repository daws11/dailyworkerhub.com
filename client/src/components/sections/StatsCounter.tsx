import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Building2, ShieldCheck, Star } from "lucide-react";

type Stat = {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  format?: (n: number) => string;
};

const stats: Stat[] = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Pekerja terverifikasi",
    format: (n) => Math.round(n).toLocaleString("id-ID"),
  },
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Bisnis aktif",
    format: (n) => Math.round(n).toLocaleString("id-ID"),
  },
  {
    icon: ShieldCheck,
    value: 0,
    suffix: "%",
    label: "Potongan calo",
    format: (n) => Math.round(n).toString(),
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Rating komunitas",
    format: (n) => n.toFixed(1),
  },
];

function Counter({ stat, inView }: { stat: Stat; inView: boolean }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const Icon = stat.icon;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, stat.value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = mv.on("change", (v) => {
      setDisplay(stat.format ? stat.format(v) : Math.round(v).toString());
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, stat]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div className="font-display text-5xl md:text-6xl font-bold text-primary tracking-tight tabular-nums">
        {display}
        <span className="text-accent-foreground">{stat.suffix}</span>
      </div>
      <p className="mt-3 font-sans text-base text-muted-foreground max-w-[14rem]">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-white relative z-10">
      <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((stat) => (
          <Counter key={stat.label} stat={stat} inView={inView} />
        ))}
      </div>
    </section>
  );
}
