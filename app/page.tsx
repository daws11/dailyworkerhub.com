import type { Metadata } from "next";
import HomePage from "@/pages/Home";

export const metadata: Metadata = {
  title: "Daily Worker Hub",
  description:
    "Daily Worker Hub adalah platform yang menghubungkan pekerja harian lepas dengan pelaku usaha yang membutuhkan tenaga kerja di Indonesia. Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.",
  openGraph: {
    title: "Daily Worker Hub",
    description:
      "Daily Worker Hub adalah platform yang menghubungkan pekerja harian lepas dengan pelaku usaha yang membutuhkan tenaga kerja di Indonesia. Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.",
  },
  twitter: {
    title: "Daily Worker Hub",
    description:
      "Daily Worker Hub adalah platform yang menghubungkan pekerja harian lepas dengan pelaku usaha yang membutuhkan tenaga kerja di Indonesia. Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.",
  },
};

export default function Page() {
  return <HomePage />;
}
