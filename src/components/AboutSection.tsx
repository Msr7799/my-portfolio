"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Award, MapPin, BookOpen, Globe, Briefcase, GraduationCap } from "lucide-react";

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
        <section id="about" className="relative py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-[#667eea]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#667eea]/10 text-[#667eea] text-xs font-medium mb-3">{t("aboutMe")}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{t("myJourney")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-sm sm:text-base">{t("journeyDesc")}</p>
                </motion.div>

                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-10 items-start`}>
                    {/* Left Column */}
                    <motion.div initial={{ opacity: 0, x: isRTL ? 50 : -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
                        {/* Profile Card */}
                        <div className="relative p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <div className={`flex flex-col sm:flex-row gap-6 sm:gap-8 items-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                                <div className="relative shrink-0">
                                    {/* Image Container */}
                                    <div className="w-32 h-[220px] rounded-xl overflow-hidden border-2 border-[#667eea]/30 shadow-xl shadow-[#667eea]/10">
                                        <Image src="/assets/My-pics/1.png" alt="Mohamed Alromaihi" fill className="object-cover" />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center border-4 border-[var(--background)] shadow-lg">
                                        <Award className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <div className={`flex-1 text-center ${isRTL ? "sm:text-right" : "sm:text-left"} self-center`}>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2 leading-tight">{t("name")}</h3>

                                    <div className={`inline-block px-3 py-1 rounded-full bg-[#667eea]/10 border border-[#667eea]/20 text-[#667eea] font-medium text-sm mb-4`}>
                                        {isRTL ? "قائد عسكري | مطور" : "Military Leader | Developer"}
                                    </div>

                                    <div className={`flex items-center gap-2 justify-center ${isRTL ? "sm:justify-start" : "sm:justify-start"}`}>
                                        <MapPin className="w-5 h-5 text-[#667eea]" />
                                        <p className="text-[var(--foreground-muted)] text-base font-medium">{isRTL ? "البحرين" : "Bahrain"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Story */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-8 h-8 rounded-lg bg-[#667eea]/20 flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-[#667eea]" />
                                </span>
                                {t("myStory")}
                            </h3>
                            <div className="space-y-3">
                                <p className="text-[var(--foreground-muted)] leading-relaxed text-xs sm:text-sm">{t("storyText1")}</p>
                                <p className="text-[var(--foreground-muted)] leading-relaxed text-xs sm:text-sm">{t("storyText2")}</p>
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-8 h-8 rounded-lg bg-[#667eea]/20 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-[#667eea]" />
                                </span>
                                {t("languages")}
                            </h3>
                            <div className="flex gap-4">
                                <div className="flex-1 p-3 sm:p-4 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] text-center">
                                    <span className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm">AR</span>
                                    <span className="text-[var(--foreground)] font-medium text-sm sm:text-base block mb-0.5">{t("arabic")}</span>
                                    <span className="text-[var(--foreground-subtle)] text-xs">{t("native")}</span>
                                </div>
                                <div className="flex-1 p-3 sm:p-4 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] text-center">
                                    <span className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-[#764ba2] to-[#00d9ff] flex items-center justify-center text-white font-bold text-sm">EN</span>
                                    <span className="text-[var(--foreground)] font-medium text-sm sm:text-base block mb-0.5">{t("english")}</span>
                                    <span className="text-[var(--foreground-subtle)] text-xs">{t("fluent")}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Timeline */}
                    <motion.div initial={{ opacity: 0, x: isRTL ? -50 : 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-6">
                        {/* Experience */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-6 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-8 h-8 rounded-lg bg-[#667eea]/20 flex items-center justify-center">
                                    <Briefcase className="w-4 h-4 text-[#667eea]" />
                                </span>
                                {t("workExperience")}
                            </h3>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + index * 0.1 }} className={`relative ${isRTL ? "pr-6 border-r-2" : "pl-6 border-l-2"} border-[#667eea]/30`}>
                                        <div className={`absolute ${isRTL ? "-right-[9px]" : "-left-[9px]"} top-0 w-4 h-4 rounded-full bg-[#667eea] border-4 border-[var(--background)]`} />
                                        <span className="text-[#667eea] text-xs font-medium">{exp.year}</span>
                                        <h4 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mt-1 mb-0.5">{exp.title}</h4>
                                        <p className="text-[var(--foreground-subtle)] text-xs mb-2">{exp.company}</p>
                                        <p className="text-[var(--foreground-muted)] text-xs leading-relaxed">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                            <h3 className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-6 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-8 h-8 rounded-lg bg-[#764ba2]/20 flex items-center justify-center">
                                    <GraduationCap className="w-4 h-4 text-[#764ba2]" />
                                </span>
                                {t("education")}
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 + index * 0.1 }} className={`relative ${isRTL ? "pr-6 border-r-2" : "pl-6 border-l-2"} border-[#764ba2]/30`}>
                                        <div className={`absolute ${isRTL ? "-right-[9px]" : "-left-[9px]"} top-0 w-4 h-4 rounded-full bg-[#764ba2] border-4 border-[var(--background)]`} />
                                        <span className="text-[#764ba2] text-xs font-medium">{edu.year}</span>
                                        <h4 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mt-1 mb-0.5">{edu.title}</h4>
                                        <p className="text-[var(--foreground-subtle)] text-xs">{edu.institution}</p>
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
