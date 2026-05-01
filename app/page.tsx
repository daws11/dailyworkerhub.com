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
  return (
    <>
      {/* Server-rendered SEO section — visible to Googlebot, hidden from users */}
      <section
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: "0",
        }}
      >
        <h1>Daily Worker Hub</h1>
        <p>
          Daily Worker Hub adalah platform yang menghubungkan pekerja harian
          lepas dengan pelaku usaha yang membutuhkan tenaga kerja di Indonesia.
          Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.
          Daftar sebagai worker untuk mencari lowongan pekerjaan harian, atau
          daftar sebagai business untuk merekrut tenaga kerja harian.
        </p>
      </section>

      <HomePage />
    </>
  );
}
