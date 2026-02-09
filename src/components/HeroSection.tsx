"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { Medal, Shield } from "lucide-react";

export default function HeroSection() {
    const { t, isRTL, language } = useApp();
    const roles = [t("role1"), t("role2"), t("role3"), t("role4")];
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [orbitRadius, setOrbitRadius] = useState(210);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setOrbitRadius(150);
            else if (window.innerWidth < 1024) setOrbitRadius(220);
            else setOrbitRadius(175);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
        setDisplayText("");
        setCurrentRole(0);
        setIsDeleting(false);
    }, [language]);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[600px] bg-gradient-to-br from-[#667eea]/20 via-[#764ba2]/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tl from-[#00d9ff]/10 to-transparent blur-3xl pointer-events-none" />

            {/* Floating Orbs */}
            <motion.div animate={{ y: [0, -30, 0], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-32 left-10 sm:left-20 w-3 h-3 rounded-full bg-[#667eea] blur-sm pointer-events-none" />
            <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-48 right-16 sm:right-32 w-4 h-4 rounded-full bg-[#764ba2] blur-sm pointer-events-none" />
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-48 left-1/4 w-2 h-2 rounded-full bg-[#00d9ff] blur-sm pointer-events-none" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className={`flex flex-col ${isRTL ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between gap-12 lg:gap-16`}>
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`flex-1 text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}
                    >
                        {/* Available Badge - mb-6 للمسافة تحته */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--background-glass)] border border-[var(--border-color)] mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-[var(--foreground-muted)]">{t("availableForWork")}</span>
                        </motion.div>

                        {/* Main Heading - mb-4 للمسافة تحته */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 "
                        >
                            <span className="text-[var(--foreground)]">{t("greeting")}</span>
                            <br />
                            <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#00d9ff] bg-clip-text text-transparent">
                                {t("name")}
                            </span>
                        </motion.h1>

                        {/* Typing Text - mb-6 للمسافة تحته */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl sm:text-2xl md:text-3xl text-[var(--foreground-muted)] mb-6 h-10"
                        >
                            <span className="text-[#667eea]">&lt;</span>
                            <span className="text-[var(--foreground)]">{displayText}</span>
                            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-[#667eea]">|</motion.span>
                            <span className="text-[#667eea]"> /&gt;</span>
                        </motion.div>

                        {/* Description - mb-8 للمسافة الأكبر تحته */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-[var(--foreground-muted)] text-base sm:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
                        >
                            {t("heroDescription")}
                        </motion.p>

                        {/* CTA Buttons - gap-4 بين الأزرار, px-8 py-4 داخل الأزرار, mb-12 للمسافة تحتها */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className={`flex flex-wrap gap-4 justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} mb-12`}
                        >
                            <a href="#projects" className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-[#667eea]/30 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="relative z-10">{t("viewMyWork")}</span>
                                <svg className={`w-5 h-5 relative z-10 transition-transform ${isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a href="#contact" className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[var(--border-color)] text-[var(--foreground)] font-semibold transition-all hover:border-[#667eea] hover:bg-[#667eea]/10 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span>{t("contactMe")}</span>
                            </a>
                        </motion.div>

                        {/* Stats - gap-10 بين الإحصائيات */}
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
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-1">{stat.number}</div>
                                    <div className="text-sm text-[var(--foreground-subtle)]">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Hero Image + IconCloud Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`flex-1 flex flex-col items-center mt-10 gap-8 ${isRTL ? "lg:items-start" : "lg:items-end"}`}
                    >
                        {/* Hero Image Container */}
                        <div className="relative hero-image w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px]">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full blur-3xl opacity-30 scale-110" />

                            {/* Rotating Border */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 rounded-full"
                                style={{ background: `conic-gradient(from 0deg, #667eea, #764ba2, #00d9ff, #667eea)`, padding: "3px" }}
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
                            <motion.div
                                animate={{ rotate: 340 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 z-20 pointer-events-none "
                            >
                                {[
                                    { src: "/assets/tech/github-icon.svg", alt: "GitHub", needsWhiteBg: true },
                                    { src: "/assets/tech/Microsoft.svg", alt: "Windows" },
                                    { src: "/assets/tech/linux.svg", alt: "Linux", needsWhiteBg: true },
                                    { src: "/assets/tech/military.svg", alt: "Military" },
                                    { src: "/assets/tech/Android-Studio.svg", alt: "Android Studio", needsWhiteBg: true },
                                    { src: "/assets/tech/vscode.svg", alt: "VS Code" }
                                ].map((icon, index, array) => {
                                    const angle = (index / array.length) * 2 * Math.PI;
                                    const radius = orbitRadius;
                                    const x = Math.cos(angle) * radius;
                                    const y = Math.sin(angle) * radius;

                                    return (
                                        <motion.div
                                            key={index}
                                            className="absolute"
                                            style={{
                                                left: `calc(50% + ${x}px)`,
                                                top: `calc(50% + ${y}px)`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <motion.div
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                                className={` p-3 rounded-full ${icon.needsWhiteBg ? 'bg-white/80 ' : 'bg-[var(--background-glass)] border-2 '} backdrop-blur-xl border border-[var(--border-color)] shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center hover:scale-105 transition-all duration-300 pointer-events-auto cursor-help w-16 h-16`}
                                                title={icon.alt}
                                            >
                                                <div className="relative w-10 h-10 flex items-center justify-center">
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
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator - mt-16 للمسافة فوقه */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-3">
                        <span className="text-sm text-[var(--foreground-subtle)]">{t("scrollDown")}</span>
                        <div className="w-6 h-10 rounded-full border-2 border-[var(--border-color)] flex items-start justify-center p-2">
                            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-[#667eea]" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
