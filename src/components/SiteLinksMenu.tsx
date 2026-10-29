"use client";

import { NavigationMenu } from "@animate-ui/react/primitives/radix-ui";
import { ChevronDown, ExternalLink } from "lucide-react";

type Site = {
  name: string;
  nameAr: string;
  href: string;
};

type SiteGroup = {
  title: string;
  titleAr: string;
  sites: Site[];
};

const siteGroups: SiteGroup[] = [
  {
    title: "Featured websites",
    titleAr: "مواقع مميزة",
    sites: [
      { name: "Quran Website", nameAr: "موقع القرآن الكريم", href: "https://msr-quran-app.vercel.app" },
      { name: "ScannerPlusX", nameAr: "موقع ScannerPlusX", href: "https://scanner-plusx.vercel.app" },
      { name: "Brick Breaker Ball", nameAr: "موقع Brick Breaker Ball", href: "https://bricks-breaker-ball.vercel.app" },
      { name: "Movies Player", nameAr: "مشغل الأفلام", href: "https://movies-player-hls.vercel.app" },
      { name: "Marbella Tan", nameAr: "متجر ماربيلا تان", href: "https://marbella-tan.vercel.app" },
      { name: "Dalily Bahrain", nameAr: "دليلي البحرين", href: "https://dalilybh.vercel.app" },
      { name: "All Weather", nameAr: "موقع All Weather", href: "https://all-weather-bh.vercel.app" },
    ],
  },
  {
    title: "Tools & learning",
    titleAr: "أدوات وتعلّم",
    sites: [
      { name: "World Map 3D", nameAr: "خريطة العالم 3D", href: "https://world-map-3-d.vercel.app" },
      { name: "Scientific Calculator", nameAr: "الآلة الحاسبة العلمية", href: "https://advanced-calculator-casio.vercel.app" },
      { name: "World Clock", nameAr: "الساعة العالمية", href: "https://world-clock-real-time.vercel.app" },
      { name: "Dream Interpretation", nameAr: "تفسير الأحلام", href: "https://tafseer-ala7lam.vercel.app" },
      { name: "AI Resume Builder", nameAr: "منشئ السيرة الذاتية", href: "https://ai-resume-bh.vercel.app" },
      { name: "Guess the Word", nameAr: "خمّن الكلمة", href: "https://guess-the-word-brown-one.vercel.app" },
    ],
  },
  {
    title: "More projects",
    titleAr: "مشاريع أخرى",
    sites: [
      { name: "Amwaj Resorts", nameAr: "منتجعات أمواج", href: "https://bh-amwaj-resorts.vercel.app" },
      { name: "Collactions", nameAr: "منصة Collactions", href: "https://collactions.vercel.app" },
      { name: "Law Office", nameAr: "مكتب عبدالرحمن للمحاماة", href: "https://abdulrahman-lawyer-bh.vercel.app" },
      { name: "PSM Lite", nameAr: "منصة PSM Lite", href: "https://psm-lite.vercel.app" },
      { name: "Media Detector Pro", nameAr: "Media Detector Pro", href: "https://media-downloder-pro.vercel.app" },
      { name: "Chat UI", nameAr: "واجهة المحادثة", href: "https://chat-ui-nine-sooty.vercel.app" },
    ],
  },
];

function SiteLabel({ site, isRTL }: { site: Site; isRTL: boolean }) {
  return (
    <>
      <span className="min-w-0 break-words">{isRTL ? site.nameAr : site.name}</span>
      <ExternalLink className="size-3.5 shrink-0 opacity-60" aria-hidden="true" />
    </>
  );
}

export function DesktopSiteLinksMenu({ isRTL }: { isRTL: boolean }) {
  return (
    <NavigationMenu.Root className="relative" delayDuration={150}>
      <NavigationMenu.List className="flex items-center">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground-muted)] transition-colors hover:bg-[var(--background-glass)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B93232] data-[state=open]:bg-[var(--background-glass)] data-[state=open]:text-[var(--foreground)]">
            {isRTL ? "مواقعي" : "My sites"}
            <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="w-[min(760px,calc(100vw-2rem))] max-h-[calc(100dvh-7rem)] overflow-y-auto p-5 sm:p-6">
            <div className="grid grid-cols-3 gap-5">
              {siteGroups.map((group) => (
                <div key={group.title} className="min-w-0">
                  <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-wide text-[#d65a5a]">
                    {isRTL ? group.titleAr : group.title}
                  </h2>
                  <ul className="space-y-1">
                    {group.sites.map((site) => (
                      <li key={site.href}>
                        <NavigationMenu.Link
                          href={site.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-10 items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm font-medium leading-snug text-[var(--foreground)] transition-colors hover:bg-[var(--background-glass)] focus-visible:bg-[var(--background-glass)] focus-visible:outline-2 focus-visible:outline-[#B93232]"
                        >
                          <SiteLabel site={site} isRTL={isRTL} />
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport className="absolute end-0 top-full z-50 mt-3 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--background)] shadow-2xl shadow-black/35" />
    </NavigationMenu.Root>
  );
}

export function MobileSiteLinksMenu({ isRTL, onNavigate }: { isRTL: boolean; onNavigate: () => void }) {
  return (
    <details className="group rounded-lg border border-[var(--border-color)] bg-[var(--background-glass)]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 font-medium text-[var(--foreground)] marker:hidden focus-visible:outline-2 focus-visible:outline-[#B93232] [&::-webkit-details-marker]:hidden">
        {isRTL ? "مواقعي" : "My sites"}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="max-h-[50dvh] space-y-5 overflow-y-auto border-t border-[var(--border-color)] px-3 py-4">
        {siteGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-[#d65a5a]">
              {isRTL ? group.titleAr : group.title}
            </h2>
            <ul className="grid gap-1 sm:grid-cols-2">
              {group.sites.map((site) => (
                <li key={site.href}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--background-secondary)] focus-visible:outline-2 focus-visible:outline-[#B93232]"
                  >
                    <SiteLabel site={site} isRTL={isRTL} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
