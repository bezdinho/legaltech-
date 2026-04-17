"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
export function Header() {
  const notificationsNonLues = 0;

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 backdrop-blur-sm px-4 lg:px-6">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
      <Separator orientation="vertical" className="h-4 opacity-50" />

      <div className="flex flex-1 items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
          <Input
            type="search"
            placeholder="Rechercher…"
            className="pl-9 h-8 text-sm bg-muted/40 border-transparent focus:border-border focus:bg-background transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
          render={
            <Link href="/notifications">
              <Bell className="h-4 w-4" />
              {notificationsNonLues > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-semibold text-white">
                  {notificationsNonLues}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Link>
          }
        />
        <ThemeToggle />
      </div>
    </header>
  );
}
