"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

type AdSenseWindow = Window & {
  adsbygoogle?: { push: (options: object) => void };
};

export default function AdSenseUnit() {
  const initialized = useRef(false);
  const { isRTL } = useApp();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const adsWindow = window as AdSenseWindow;
    const adsQueue = adsWindow.adsbygoogle ?? ([] as object[]);
    adsWindow.adsbygoogle = adsQueue;
    adsQueue.push({});
  }, []);

  return (
    <aside
      aria-label={isRTL ? "إعلان" : "Advertisement"}
      className="relative mx-auto w-full max-w-5xl px-6 py-8 sm:px-8"
    >
      <p className="mb-3 text-center text-xs text-[var(--foreground-subtle)]">
        {isRTL ? "إعلان" : "Advertisement"}
      </p>
      <div className="min-h-[120px] sm:min-h-[200px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2259594031936212"
          data-ad-slot="2322787218"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
