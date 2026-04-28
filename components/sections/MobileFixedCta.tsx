"use client";

import { Button } from "@/components/ui/button";

export function MobileFixedCta() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border z-50 flex gap-2">
      <Button asChild className="flex-1 bg-secondary hover:bg-secondary/90 text-white rounded-full h-12 text-sm font-sub shadow-xl">
        <a href="https://staging.dailyworkerhub.com/auth/register?role=business">
          Untuk Bisnis
        </a>
      </Button>
      <Button asChild variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 rounded-full h-12 text-sm font-sub">
        <a href="https://staging.dailyworkerhub.com/auth/register?role=worker">
          Untuk Pekerja
        </a>
      </Button>
    </div>
  );
}
