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
      {/* Visually hidden H1 for Googlebot — hero has the visible H1 */}
      <div
        role="banner"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <h1>Daily Worker Hub</h1>
        <p>
          Daily Worker Hub adalah platform yang menghubungkan pekerja harian
          lepas dengan pelaku usaha di Indonesia. Temukan pekerjaan harian
          atau cari pekerja terpercaya dengan mudah.
        </p>
      </div>

      <HomePage />
    </>
  );
}
