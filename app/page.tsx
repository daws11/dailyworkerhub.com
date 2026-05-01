import type { Metadata } from "next";
import HomePage from "@/pages/Home";

export const metadata: Metadata = {
  title: "Daily Worker Hub",
  description:
    "Daily Worker Hub adalah platform yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia. Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.",
  openGraph: {
    title: "Daily Worker Hub",
    description:
      "Daily Worker Hub adalah platform yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia.",
  },
  twitter: {
    title: "Daily Worker Hub",
    description:
      "Daily Worker Hub adalah platform yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia.",
  },
};

export default function Page() {
  return (
    <>
      <header className="px-4 md:px-8 py-6 md:py-8 bg-background text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Daily Worker Hub
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Daily Worker Hub adalah platform yang menghubungkan pekerja harian
          lepas dengan pelaku usaha di Indonesia. Temukan pekerjaan harian atau
          cari pekerja terpercaya dengan mudah. Daftar sebagai worker untuk
          mencari lowongan, atau sebagai business untuk merekrut tenaga kerja.
        </p>
      </header>

      <HomePage />
    </>
  );
}
