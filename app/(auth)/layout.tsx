import { MainNavbar } from "@/components/layout/MainNavbar";
import { Footer } from "@/components/footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNavbar />
      <div className="flex-1 flex items-center justify-center pt-16">
        {children}
      </div>
      <Footer />
    </div>
  )
}