"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

export default function AboutSection() {
    const { t, isRTL } = useApp();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const experiences = [
        { year: "2019 - Present", title: isRTL ? "مطور Full-Stack" : "Full-Stack Developer", company: isRTL ? "عمل حر" : "Freelance", description: isRTL ? "بناء مواقع TypeScript متقدمة وتطبيقات ويب حديثة. تطوير تطبيق Atlas AI Flutter، وإنشاء Quran API وموقع القرآن، ومنصة تجارة إلكترونية." : "Built advanced TypeScript websites and modern web apps. Developed Atlas AI Flutter app, Created Quran API and Quran website, e-commerce platform with secure integration." },
        { year: "Aug 2007 - Feb 2019", title: isRTL ? "ضابط في قوة دفاع البحرين" : "Officer in Bahrain Defense Force", company: isRTL ? "نقيب، البحرين" : "Captain, Bahrain", description: isRTL ? "قائد مع تعليم رائد ومستعد للقيادة. مدير صيانة ودعم تقني (3 سنوات). مدير مستودعات الملابس والمعدات العسكرية (سنتان)." : "Commander with leading education and prepared to lead. Manager of Maintenance and Technical Support (3 years). Manager of warehouses for military clothes and equipment (2 years)." },
    ];

    const education = [
        { year: "2024", title: isRTL ? "تقني أمن سيبراني (CCT)" : "Cybersecurity Technician (CCT)", institution: isRTL ? "معهد Procloud للأمن السيبراني، المنامة" : "Cybersecurity Technical Procloud institute, Manama" },
        { year: "2020 - Present", title: isRTL ? "معسكر هندسة البرمجيات" : "Software Engineer Bootcamp", institution: isRTL ? "مدرج ونشط كمطور على GitHub" : "Listed and active as a developer on GitHub" },
        { year: "2007 - 2010", title: isRTL ? "دبلوم في العلوم العسكرية" : "Diploma in Military Sciences", institution: isRTL ? "كلية عيسى العسكرية الملكية" : "Royal Military College of Isa" },
    ];

    return (
        <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-[#667eea]/10 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
                {/* Section Header - mb-16 للمسافة تحته */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <span className="inline-block px-5 py-2.5 rounded-full bg-[#667eea]/10 text-[#667eea] text-sm font-medium mb-5">{t("aboutMe")}</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-5">
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{t("myJourney")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-base sm:text-lg">{t("journeyDesc")}</p>
                </motion.div>

                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-start`}>
                    {/* Left Column - space-y-8 للمسافات بين البطاقات */}
                    <motion.div initial={{ opacity: 0, x: isRTL ? 50 : -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-8">
                        {/* Profile Card - p-6 sm:p-8 للـ padding الداخلي */}
                        <div className="relative p-6 sm:p-10 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <div className={`flex flex-col sm:flex-row gap-8 sm:gap-10 items-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                                <div className="relative shrink-0">
                                    {/* Image Container 9:16 Ratio */}
                                    <div className="w-40 h-[280px] sm:w-48 sm:h-[340px] rounded-2xl overflow-hidden border-2 border-[#667eea]/30 shadow-2xl shadow-[#667eea]/10">
                                        <Image src="/assets/My-pics/1.png" alt="Mohamed Alromaihi" fill className="object-cover" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center border-4 border-[var(--background)] shadow-lg">
                                        <span className="text-xl">🎖️</span>
                                    </div>
                                </div>

                                <div className={`flex-1 text-center ${isRTL ? "sm:text-right" : "sm:text-left"} self-center`}>
                                    <h3 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4 leading-tight">{t("name")}</h3>

                                    <div className={`inline-block px-4 py-1.5 rounded-full bg-[#667eea]/10 border border-[#667eea]/20 text-[#667eea] font-medium text-base mb-6`}>
                                        {isRTL ? "قائد عسكري | مطور" : "Military Leader | Developer"}
                                    </div>

                                    <div className={`flex items-center gap-2 justify-center ${isRTL ? "sm:justify-start" : "sm:justify-start"}`}>
                                        <span className="text-xl">📍</span>
                                        <p className="text-[var(--foreground-muted)] text-lg font-medium">{isRTL ? "البحرين 🇧🇭" : "Bahrain 🇧🇭"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Story - p-6 sm:p-8 للـ padding, space-y-4 للمسافات بين الفقرات */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-5 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-10 h-10 rounded-xl bg-[#667eea]/20 flex items-center justify-center text-lg">📖</span>
                                {t("myStory")}
                            </h3>
                            <div className="space-y-4">
                                <p className="text-[var(--foreground-muted)] leading-relaxed text-sm sm:text-base">{t("storyText1")}</p>
                                <p className="text-[var(--foreground-muted)] leading-relaxed text-sm sm:text-base">{t("storyText2")}</p>
                            </div>
                        </div>

                        {/* Languages - p-6 sm:p-8 للـ padding, gap-5 بين الكروت */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-5 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-10 h-10 rounded-xl bg-[#667eea]/20 flex items-center justify-center text-lg">🌍</span>
                                {t("languages")}
                            </h3>
                            <div className="flex gap-5">
                                <div className="flex-1 p-4 sm:p-5 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] text-center">
                                    <span className="text-2xl sm:text-3xl mb-3 block">🇸🇦</span>
                                    <span className="text-[var(--foreground)] font-medium text-base sm:text-lg block mb-1">{t("arabic")}</span>
                                    <span className="text-[var(--foreground-subtle)] text-sm">{t("native")}</span>
                                </div>
                                <div className="flex-1 p-4 sm:p-5 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] text-center">
                                    <span className="text-2xl sm:text-3xl mb-3 block">🇬🇧</span>
                                    <span className="text-[var(--foreground)] font-medium text-base sm:text-lg block mb-1">{t("english")}</span>
                                    <span className="text-[var(--foreground-subtle)] text-sm">{t("fluent")}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Timeline - space-y-8 بين الأقسام */}
                    <motion.div initial={{ opacity: 0, x: isRTL ? -50 : 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-8">
                        {/* Experience - p-6 sm:p-8 للـ padding */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-10 h-10 rounded-xl bg-[#667eea]/20 flex items-center justify-center text-lg">💼</span>
                                {t("workExperience")}
                            </h3>
                            {/* space-y-8 بين عناصر التايملاين */}
                            <div className="space-y-8">
                                {experiences.map((exp, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + index * 0.1 }} className={`relative ${isRTL ? "pr-8 border-r-2" : "pl-8 border-l-2"} border-[#667eea]/30`}>
                                        <div className={`absolute ${isRTL ? "-right-[9px]" : "-left-[9px]"} top-0 w-4 h-4 rounded-full bg-[#667eea] border-4 border-[var(--background)]`} />
                                        <span className="text-[#667eea] text-sm font-medium">{exp.year}</span>
                                        <h4 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mt-2 mb-1">{exp.title}</h4>
                                        <p className="text-[var(--foreground-subtle)] text-sm mb-3">{exp.company}</p>
                                        <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Education - p-6 sm:p-8 للـ padding */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-10 h-10 rounded-xl bg-[#764ba2]/20 flex items-center justify-center text-lg">🎓</span>
                                {t("education")}
                            </h3>
                            {/* space-y-6 بين عناصر التعليم */}
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 + index * 0.1 }} className={`relative ${isRTL ? "pr-8 border-r-2" : "pl-8 border-l-2"} border-[#764ba2]/30`}>
                                        <div className={`absolute ${isRTL ? "-right-[9px]" : "-left-[9px]"} top-0 w-4 h-4 rounded-full bg-[#764ba2] border-4 border-[var(--background)]`} />
                                        <span className="text-[#764ba2] text-sm font-medium">{edu.year}</span>
                                        <h4 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mt-2 mb-1">{edu.title}</h4>
                                        <p className="text-[var(--foreground-subtle)] text-sm">{edu.institution}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
