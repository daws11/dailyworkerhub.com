"use client";

import * as React from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

export interface TocItem {
  id: string;
  title: string;
}

interface LegalTocProps {
  items: TocItem[];
  className?: string;
}

export function LegalToc({ items, className }: LegalTocProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id ?? "");
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const observers = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observers.set(entry.target.id, entry);
        });

        let active: string | null = null;
        observers.forEach((entry, id) => {
          if (entry.isIntersecting) {
            active = id;
          }
        });

        if (active) {
          setActiveId(active);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleLinkClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
    setIsOpen(false);
  };

  const tocContent = (
    <nav className="space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleLinkClick(item.id)}
          className={cn(
            "block w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors border-l-2",
            activeId === item.id
              ? "text-primary font-medium border-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground border-transparent hover:bg-muted/50"
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
          >
            <List className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto max-h-[60vh] rounded-t-2xl">
          <SheetHeader className="mb-3">
            <SheetTitle className="text-base">Daftar Isi</SheetTitle>
          </SheetHeader>
          <ScrollArea className="max-h-[40vh] pr-3">
            {tocContent}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "w-full lg:w-64 flex-shrink-0 hidden lg:block",
        className
      )}
    >
      <div className="sticky top-24">
        <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
          Daftar Isi
        </h2>
        {tocContent}
      </div>
    </aside>
  );
}
