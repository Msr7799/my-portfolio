"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useState, useEffect } from "react";

export default function Footer() {
    const { t, isRTL, language } = useApp();
    const currentYear = new Date().getFullYear();
    const [visitorCount, setVisitorCount] = useState<number | null>(null);

    useEffect(() => {
        // Simple visitor counter using localStorage
        // In production, you would use a backend API or service like CountAPI
        const incrementVisitor = () => {
            const storageKey = "portfolio_visitor_count";
            const lastVisitKey = "portfolio_last_visit";
            const lastVisit = localStorage.getItem(lastVisitKey);
            const now = Date.now();

            // Only count as new visit if more than 1 hour since last visit
            const oneHour = 60 * 60 * 1000;
            let count = parseInt(localStorage.getItem(storageKey) || "0", 10);

            if (!lastVisit || (now - parseInt(lastVisit, 10)) > oneHour) {
                count += 1;
                localStorage.setItem(storageKey, count.toString());
                localStorage.setItem(lastVisitKey, now.toString());
            }

            setVisitorCount(count);
        };

        incrementVisitor();
    }, []);

    const navItems = [
        { name: t("home"), href: "#home" },
        { name: t("about"), href: "#about" },
        { name: t("skills"), href: "#skills" },
        { name: t("projects"), href: "#projects" },
        { name: t("contact"), href: "#contact" },
    ];

    return (
        <footer className="relative py-8 sm:py-12 border-t border-[var(--border-color)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#667eea]/5 to-transparent" />

            <div className="container mx-auto px-6 sm:px-8 relative">
                <div className={`flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 ${isRTL ? "md:flex-row-reverse" : ""}`}>
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.05 }} className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                            <span className="text-base font-bold text-white">M</span>
                        </div>
                        <span className="text-base font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                            {language === "ar" ? "محمد الرميحي" : "Mohamed Alromaihi"}
                        </span>
                    </motion.div>

                    {/* Links */}
                    <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-xs sm:text-sm">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <a href="https://github.com/msr7799" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-[var(--background-glass)] border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[#667eea]/50 transition-all">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                        <a href="mailto:mmalromaihi99@gmail.com" className="w-8 h-8 rounded-lg bg-[var(--background-glass)] border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[#667eea]/50 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className={`mt-6 pt-6 border-t border-[var(--border-color)] text-center ${isRTL ? "font-cairo" : ""}`}>
                    <p className="text-[var(--foreground-subtle)] text-xs sm:text-sm">
                        © {currentYear} {language === "ar" ? "محمد سعود الرميحي" : "Mohamed Saud Alromaihi"}. {t("allRightsReserved")}
                    </p>
                    <p className="text-[var(--foreground-subtle)] text-[10px] sm:text-xs mt-2 opacity-70">
                        {t("builtWith")}
                    </p>

                    {/* Hidden Visitor Counter - disguised as a subtle design element */}
                    {visitorCount !== null && (
                        <div
                            className="mt-4 inline-flex items-center gap-1.5 opacity-30 hover:opacity-50 transition-opacity cursor-default select-none"
                            title=""
                        >
                            <span className="w-2 h-2 rounded-full bg-[var(--foreground-subtle)]" />
                            <span className="text-[10px] text-[var(--foreground-subtle)] font-mono tracking-widest">
                                {visitorCount.toString().padStart(6, '0')}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[var(--foreground-subtle)]" />
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}

