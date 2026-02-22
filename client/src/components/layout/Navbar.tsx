import { motion } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 mix-blend-difference text-white"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold font-display tracking-tighter">
            DH
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            Daily Worker Hub
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-sub text-sm uppercase tracking-wider">
          <a href="#about" className="hover:text-secondary transition-colors">Philosophy</a>
          <a href="#how-it-works" className="hover:text-secondary transition-colors">How It Works</a>
          <a href="#stories" className="hover:text-secondary transition-colors">Stories</a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-white/20 bg-white/10 hover:bg-white hover:text-primary rounded-full px-6 font-sub tracking-wide transition-all duration-300">
            Log In
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 font-sub tracking-wide shadow-lg shadow-secondary/25 group">
            Hire Talent
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}