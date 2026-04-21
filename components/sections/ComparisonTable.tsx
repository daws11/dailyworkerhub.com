"use client";

import { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";

type Row = {
  feature: string;
  dwh: boolean;
  staffinc: boolean;
  myrobin: boolean;
  calo: boolean;
};

const rows: Row[] = [
  { feature: "Akses terbuka — siapa pun bisa daftar tanpa perantara", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Tanpa komisi platform — 1% hanya untuk Protection Pool komunitas", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Protection Pool komunitas (dana darurat anggota)", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Suara & partisipasi worker dalam kebijakan platform", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Transparansi upah publik sebelum apply (rate/jam terbuka)", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Payment escrow — dana dijamin hingga shift selesai", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Review dua arah worker ↔ bisnis, publik", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "QR check-in & verifikasi kehadiran real-time di lokasi", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Jaminan hak kerja otomatis sesuai aturan (upah minimum, lembur, jam istirahat)", dwh: true, staffinc: false, myrobin: false, calo: false },
  { feature: "Fleksibel per-shift untuk side income (tanpa kontrak jangka panjang)", dwh: true, staffinc: false, myrobin: false, calo: true },
];

const competitors: { key: keyof Row; label: string }[] = [
  { key: "staffinc", label: "Staffinc" },
  { key: "myrobin", label: "MyRobin" },
  { key: "calo", label: "Calo / WA" },
];

function Indicator({ value, size = "md" }: { value: boolean; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-4 h-4" : "w-6 h-6";
  return value ? (
    <Check className={`${cls} text-primary`} />
  ) : (
    <X className={`${cls} text-destructive`} />
  );
}

const MOBILE_PREVIEW_COUNT = 4;

export function ComparisonTable() {
  const [expanded, setExpanded] = useState(false);
  const mobileRows = expanded ? rows : rows.slice(0, MOBILE_PREVIEW_COUNT);
  const hiddenCount = rows.length - MOBILE_PREVIEW_COUNT;

  return (
    <div className="mt-16 md:mt-20">
      <h3 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-8">
        Mengapa Daily Worker Hub?
      </h3>

      {/* Desktop table (lg+) */}
      <div className="hidden lg:block rounded-2xl border border-border bg-background dark:bg-dark-primary shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background/50">
              <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">Fitur</th>
              <th className="p-6 font-display font-bold text-xl text-primary border-b border-border bg-primary/5">Daily Worker Hub</th>
              <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">Staffinc</th>
              <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">MyRobin</th>
              <th className="p-6 font-sub font-bold text-muted-foreground border-b border-border">Sistem Calo / WA</th>
            </tr>
          </thead>
          <tbody className="font-sans text-primary">
            {rows.map((row) => (
              <tr key={row.feature}>
                <td className="p-6 border-b border-border font-medium">{row.feature}</td>
                <td className="p-6 border-b border-border bg-primary/5"><Indicator value={row.dwh} /></td>
                <td className="p-6 border-b border-border"><Indicator value={row.staffinc} /></td>
                <td className="p-6 border-b border-border"><Indicator value={row.myrobin} /></td>
                <td className="p-6 border-b border-border"><Indicator value={row.calo} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet card stack (<lg) */}
      <div className="lg:hidden space-y-4">
        {mobileRows.map((row) => (
          <div
            key={row.feature}
            className="rounded-2xl border border-border bg-background dark:bg-dark-primary shadow-md overflow-hidden"
          >
            <div className="p-5 bg-background/60 border-b border-border">
              <p className="font-sans font-semibold text-primary text-sm leading-snug">
                {row.feature}
              </p>
            </div>

            <div className="px-5 py-4 flex items-center justify-between bg-primary/5 border-b border-border">
              <span className="font-display font-bold text-primary">Daily Worker Hub</span>
              <Indicator value={row.dwh} />
            </div>

            <ul className="divide-y divide-border">
              {competitors.map((c) => (
                <li
                  key={c.key}
                  className="px-5 py-3 flex items-center justify-between text-sm"
                >
                  <span className="font-sub text-muted-foreground">{c.label}</span>
                  <Indicator value={row[c.key] as boolean} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="w-full mt-2 py-4 rounded-2xl border border-primary/20 bg-primary/5 text-primary font-sub font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
          >
            {expanded ? "Tutup perbandingan" : `Lihat ${hiddenCount} perbandingan lainnya`}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
