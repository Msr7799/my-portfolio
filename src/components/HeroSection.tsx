"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useOptimizedAnimations } from "@/hooks/usePerformance";

export default function HeroSection() {
    const { t, isRTL, language } = useApp();
    const { isMobile, isLowPowerDevice, prefersReducedMotion } = useOptimizedAnimations();

    const roles = useMemo(() => [t("role1"), t("role2"), t("role3"), t("role4")], [t]);

    const [mounted, setMounted] = useState(false);
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [orbitRadius, setOrbitRadius] = useState(210);

    const shouldReduceMotion = prefersReducedMotion || isLowPowerDevice;
    const shouldRunAmbientMotion = !isMobile && !shouldReduceMotion;
    const shouldRunOrbitMotion = !shouldReduceMotion;
    const orbitDuration = isMobile ? 42 : 25;
    const iconShellSize = isMobile ? "w-13 h-13 p-2.5" : "w-16 h-16 p-3";
    const iconImageSize = isMobile ? "w-8 h-8" : "w-10 h-10";

    useEffect(() => {
        const mountedTimer = window.setTimeout(() => setMounted(true), 0);

        const handleResize = () => {
            if (window.innerWidth < 380) setOrbitRadius(118);
            else if (window.innerWidth < 640) setOrbitRadius(128);
            else if (window.innerWidth < 1024) setOrbitRadius(190);
            else setOrbitRadius(175);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.clearTimeout(mountedTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const role = roles[currentRole];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < role.length) {
                    setDisplayText(role.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(role.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRole, roles]);

    useEffect(() => {
        const resetTimer = window.setTimeout(() => {
            setDisplayText("");
            setCurrentRole(0);
            setIsDeleting(false);
        }, 0);

        return () => window.clearTimeout(resetTimer);
    }, [language]);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
            {/* Background Effects */}
            <div className="hero-surface absolute inset-0 pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[600px] bg-gradient-to-br from-[#F8FAFC]/16 via-[#B32626]/14 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tl from-[#B32626]/18 to-transparent blur-3xl pointer-events-none" />

            {/* Floating Orbs */}
            {shouldRunAmbientMotion && (
                <>
                    <motion.div
                        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-32 left-10 sm:left-20 w-3 h-3 rounded-full bg-[#B32626] blur-sm pointer-events-none"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-48 right-16 sm:right-32 w-4 h-4 rounded-full bg-[#771111] blur-sm pointer-events-none"
                    />
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-48 left-1/4 w-2 h-2 rounded-full bg-[#F8FAFC] blur-sm pointer-events-none"
                    />
                </>
            )}

            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className={`flex flex-col ${isRTL ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between gap-12 lg:gap-16`}>
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`flex-1 text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--background-glass)] border border-[var(--border-color)] mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-[var(--foreground-muted)]">{t("availableForWork")}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4"
                        >
                            <span className="text-[var(--foreground)]">{t("greeting")}</span>
                            <br />
                            <span className="theme-hero-title">{t("name")}</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl sm:text-2xl md:text-3xl text-[var(--foreground-muted)] mb-6 h-10"
                        >
                            <span className="text-[#B32626]">&lt;</span>
                            <span className="text-[var(--foreground)]">{displayText}</span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="text-[#B32626]"
                            >
                                |
                            </motion.span>
                            <span className="text-[#B32626]"> /&gt;</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-[var(--foreground-muted)] text-base sm:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
                        >
                            {t("heroDescription")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className={`flex flex-wrap gap-4 justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} mb-12`}
                        >
                            <a
                                href="#projects"
                                className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#771111] to-[#B32626] text-[#F8FAFC] font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-[#B32626]/30 ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <span className="relative z-10">{t("viewMyWork")}</span>
                                <svg
                                    className={`w-5 h-5 relative z-10 transition-transform ${isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a
                                href="#contact"
                                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[var(--border-color)] text-[var(--foreground)] font-semibold transition-all hover:border-[#B32626] hover:bg-[#B32626]/10 ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <span>{t("contactMe")}</span>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className={`flex flex-wrap gap-10 justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"}`}
                        >
                            {[
                                { number: "5+", label: t("yearsExperience") },
                                { number: "20+", label: t("projectsCompleted") },
                                { number: "10+", label: t("technologies") },
                            ].map((stat, index) => (
                                <div key={index} className={`text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}>
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold theme-stat-number mb-1">{stat.number}</div>
                                    <div className="text-sm text-[var(--foreground-subtle)]">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Center QR Code */}
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="flex w-full shrink-0 flex-col items-center gap-4 lg:w-[190px]"
                    >
                        <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[24px] border border-[#B32626]/35 bg-white p-2 shadow-[0_20px_55px_rgba(179,38,38,0.22)] sm:h-[180px] sm:w-[180px] lg:h-[190px] lg:w-[190px]">
                            <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-white">
                                <Image
                                    src="/assets/qrcode.png"
                                    alt={language === "ar" ? "رمز QR لمعرض الأعمال" : "Portfolio website QR code"}
                                    width={1000}
                                    height={1000}
                                    className="absolute left-1/2 top-0 -translate-x-1/2"
                                    style={{ width: "135%", maxWidth: "none", height: "auto" }}
                                />
                            </div>
                        </div>
                        <p className="rounded-2xl border border-[var(--border-color)] bg-[var(--background-glass)] px-5 py-2.5 text-center text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-[var(--foreground-muted)] shadow-lg backdrop-blur-md sm:text-sm">
                            {language === "ar" ? (
                                <>معرض الأعمال<br />امسح رمز QR</>
                            ) : (
                                <>Portfolio Website<br />Scan the QR</>
                            )}
                        </p>
                    </motion.div>

                    {/* Hero Image + IconCloud Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`flex-1 flex flex-col items-center mt-10 mb-16 sm:mb-10 lg:mb-0 gap-8 ${isRTL ? "lg:items-start" : "lg:items-end"}`}
                    >
                        {/* Hero Image Container */}
                        <div className="relative hero-image w-[260px] h-[260px] min-[380px]:w-[280px] min-[380px]:h-[280px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px]">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B32626] to-[#771111] rounded-full blur-3xl opacity-30 scale-110" />

                            {/* Rotating Border */}
                            <motion.div
                                animate={shouldRunOrbitMotion ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ duration: isMobile ? 32 : 20, repeat: shouldRunOrbitMotion ? Infinity : 0, ease: "linear" }}
                                className="absolute -inset-4 rounded-full"
                                style={{ background: `conic-gradient(from 0deg, #B32626, #771111, #05060A, #F8FAFC, #B32626)`, padding: "3px" }}
                            >
                                <div className="w-full h-full rounded-full bg-[var(--background)]" />
                            </motion.div>

                            {/* Image Container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--border-color)]">
                                <Image
                                    src="/assets/My-pics/My-pic-rounded.png"
                                    alt="Mohamed Alromaihi"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Orbiting Tech Icons */}
                            {mounted && (
                                <motion.div
                                    animate={shouldRunOrbitMotion ? { rotate: 340 } : { rotate: 0 }}
                                    transition={{ duration: orbitDuration, repeat: shouldRunOrbitMotion ? Infinity : 0, ease: "linear" }}
                                    className="absolute inset-0 z-20 pointer-events-none"
                                >
                                    {[
                                        { src: "/assets/tech/github-icon.svg", alt: "GitHub", needsWhiteBg: true },
                                        { src: "/assets/tech/Microsoft.svg", alt: "Windows" },
                                        { src: "/assets/tech/linux.svg", alt: "Linux", needsWhiteBg: true },
                                        { src: "/assets/tech/military.svg", alt: "Military" },
                                        { src: "/assets/tech/Android-Studio.svg", alt: "Android Studio", needsWhiteBg: true },
                                        { src: "/assets/tech/vscode.svg", alt: "VS Code" },
                                    ].map((icon, index, array) => {
                                        const angle = (index / array.length) * 2 * Math.PI;
                                        const radius = orbitRadius;
                                        const x = Math.round(Math.cos(angle) * radius);
                                        const y = Math.round(Math.sin(angle) * radius);

                                        return (
                                            <motion.div
                                                key={index}
                                                className="absolute"
                                                style={{
                                                    left: `calc(50% + ${x}px)`,
                                                    top: `calc(50% + ${y}px)`,
                                                    transform: "translate(-50%, -50%)",
                                                }}
                                            >
                                                <motion.div
                                                    animate={shouldRunOrbitMotion ? { rotate: -360 } : { rotate: 0 }}
                                                    transition={{ duration: orbitDuration, repeat: shouldRunOrbitMotion ? Infinity : 0, ease: "linear" }}
                                                    className={`${iconShellSize} rounded-full ${icon.needsWhiteBg ? "bg-white/80 " : "bg-[var(--background-glass)] border-2 "} backdrop-blur-md sm:backdrop-blur-xl border border-[var(--border-color)] shadow-[0_0_14px_rgba(255,255,255,0.08)] sm:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center hover:scale-105 transition-all duration-300 pointer-events-auto cursor-help`}
                                                    title={icon.alt}
                                                >
                                                    <div className={`relative ${iconImageSize} flex items-center justify-center`}>
                                                        <Image
                                                            src={icon.src}
                                                            alt={icon.alt}
                                                            fill
                                                            className="object-contain p-1"
                                                        />
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
                >
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-3">
                        <span className="text-sm text-[var(--foreground-subtle)]">{t("scrollDown")}</span>
                        <div className="w-6 h-10 rounded-full border-2 border-[var(--border-color)] flex items-start justify-center p-2">
                            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-[#B32626]" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
