"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";

import { mainNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl py-3"
          : "bg-gradient-to-b from-black/50 to-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/npgc-logo.png"
            alt="NPGC logo"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="hidden font-display text-sm font-bold tracking-wide text-foreground sm:block">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-foreground/90 transition-colors hover:text-gold-400">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-2xl border border-border/60 bg-card/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 transition-colors hover:bg-accent"
                      >
                        <p className="text-sm font-semibold text-foreground">
                          {child.label}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {child.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-wide text-foreground/90 transition-colors hover:text-gold-400"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden bg-gold-500 font-semibold text-primary-foreground hover:bg-gold-400 sm:inline-flex"
          >
            <Link href="/give">Give</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-border bg-background sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="text-left font-display text-lg text-foreground">
                  {siteConfig.shortName}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 flex flex-col border-l border-border pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  asChild
                  className="mt-4 bg-gold-500 font-semibold text-primary-foreground hover:bg-gold-400"
                >
                  <Link href="/give">Give</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
