"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

export default function SkillsSection() {
    const { t, isRTL } = useApp();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const technologies = [
        { name: "JavaScript", icon: "/assets/tech/javascript.svg", category: "Languages" },
        { name: "TypeScript", icon: "/assets/tech/typescript.svg", category: "Languages" },
        { name: "Python", icon: "/assets/tech/python.svg", category: "Languages" },
        { name: "HTML", icon: "/assets/tech/html.svg", category: "Languages" },
        { name: "CSS", icon: "/assets/tech/css.svg", category: "Languages" },
        { name: "React", icon: "/assets/tech/react.svg", category: "Frameworks" },
        { name: "Next.js", icon: "/assets/tech/nextjs.svg", category: "Frameworks" },
        { name: "Node.js", icon: "/assets/tech/nodejs.svg", category: "Frameworks" },
        { name: "Flutter", icon: "/assets/tech/flutter.svg", category: "Frameworks" },
        { name: "Flask", icon: "/assets/tech/flask.svg", category: "Frameworks" },
        { name: "Tailwind", icon: "/assets/tech/tailwind.svg", category: "Frameworks" },
        { name: "Git", icon: "/assets/tech/git.svg", category: "Tools" },
        { name: "VS Code", icon: "/assets/tech/vscode.svg", category: "Tools" },
        { name: "Figma", icon: "/assets/tech/figma.svg", category: "Tools" },
        { name: "Firebase", icon: "/assets/tech/firebase.svg", category: "Cloud" },
        { name: "PostgreSQL", icon: "/assets/tech/postgresql.svg", category: "Database" },
        { name: "MongoDB", icon: "/assets/tech/mongodb.svg", category: "Database" },
        { name: "Linux", icon: "/assets/tech/linux.svg", category: "OS" },
    ];

    const technicalSkills = [
        { name: t("fullStackDev"), level: 90 },
        { name: t("mobileAppDev"), level: 85 },
        { name: t("cybersecurity"), level: 80 },
        { name: t("databaseMgmt"), level: 85 },
        { name: t("apiDev"), level: 88 },
        { name: t("uiuxDesign"), level: 75 },
    ];

    const softSkills = [
        { name: t("organization"), icon: "📋" },
        { name: t("communication"), icon: "💬" },
        { name: t("uiDesigner"), icon: "🎨" },
        { name: t("leadership"), icon: "👔" },
        { name: t("teamwork"), icon: "🤝" },
        { name: t("problemSolving"), icon: "🧩" },
        { name: t("fastLearner"), icon: "📚" },
        { name: t("discipline"), icon: "⚡" },
    ];

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

    return (
        <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute right-0 top-1/3 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-l from-[#764ba2]/10 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
                {/* Section Header - mb-16 للمسافة تحته */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <span className="inline-block px-5 py-2.5 rounded-full bg-[#667eea]/10 text-[#667eea] text-sm font-medium mb-5">{t("skillsAndTech")}</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-5">
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{t("myTechStack")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-base sm:text-lg">{t("techStackDesc")}</p>
                </motion.div>

                {/* Technologies Grid - mb-14 للمسافة تحته, gap-4 بين العناصر, p-4 داخل كل عنصر */}
                <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-14">
                    <div className="tech-grid grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-4">
                        {technologies.map((tech) => (
                            <motion.div
                                key={tech.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-sm hover:border-[#667eea]/50 hover:bg-[var(--background-card)] transition-all duration-300 cursor-pointer"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                                    <Image src={tech.icon} alt={tech.name} fill className="object-contain" />
                                </div>
                                <span className="text-xs sm:text-sm text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors text-center">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills Grid - gap-10 بين العمودين */}
                <div className={`grid lg:grid-cols-2 gap-10`}>
                    {/* Technical Skills - p-6 sm:p-8 للـ padding */}
                    <motion.div initial={{ opacity: 0, x: isRTL ? 50 : -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="p-6 sm:p-8 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                        <h3 className={`text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-xl">⚙️</span>
                            {t("technicalSkills")}
                        </h3>
                        {/* space-y-6 بين عناصر المهارات */}
                        <div className="space-y-6">
                            {technicalSkills.map((skill, index) => (
                                <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + index * 0.1 }}>
                                    <div className={`flex justify-between mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span className="text-[var(--foreground)] font-medium text-base">{skill.name}</span>
                                        <span className="text-[#667eea] font-semibold text-base">{skill.level}%</span>
                                    </div>
                                    <div className="h-3 bg-[var(--background-card)] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${skill.level}%` } : {}}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                                            className="h-full rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills - p-6 sm:p-8 للـ padding */}
                    <motion.div initial={{ opacity: 0, x: isRTL ? -50 : 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="p-6 sm:p-8 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                        <h3 className={`text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#764ba2] to-[#00d9ff] flex items-center justify-center text-xl">🎯</span>
                            {t("softSkills")}
                        </h3>
                        {/* grid gap-4 بين العناصر, p-4 داخل كل عنصر */}
                        <div className="grid grid-cols-2 gap-4">
                            {softSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.5 + index * 0.08 }}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    className={`flex items-center gap-3 p-4 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] hover:border-[#764ba2]/50 transition-all cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
                                >
                                    <span className="text-2xl">{skill.icon}</span>
                                    <span className="text-[var(--foreground)] font-medium text-sm sm:text-base">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Expertise Areas - mt-10 للمسافة فوقه, p-6 sm:p-8 للـ padding */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="mt-10 p-6 sm:p-8 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                    <h3 className={`text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-6 text-center flex items-center justify-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#667eea] flex items-center justify-center text-xl">🚀</span>
                        {t("expertiseAreas")}
                    </h3>
                    <p className="text-[var(--foreground-muted)] text-center leading-relaxed max-w-4xl mx-auto text-base sm:text-lg">
                        {isRTL ? (
                            <>الأمن السيبراني وأمن الشبكات، بناء برامج ومواقع Full-Stack باستخدام <span className="text-[#667eea] font-medium">React، TypeScript، Next.js</span>، المتحررة في Python، JavaScript، React، Flask، و Flutter. متقن على <span className="text-[#764ba2] font-medium">Linux و PowerShell</span>. إدارة النظم، أتمتة العمليات، تطوير الويب، و<span className="text-[#00d9ff] font-medium">هندسة البرمجيات</span>.</>
                        ) : (
                            <>Cybersecurity & Network Security. Building modern Full-Stack websites and apps using <span className="text-[#667eea] font-medium">React, TypeScript, Next.js</span>. Proficient in Python, JavaScript, React, Flask, and Flutter. Fluency in <span className="text-[#764ba2] font-medium">Linux & PowerShell</span>. System administration and process automation. Web development using smart algorithms, and <span className="text-[#00d9ff] font-medium">prompt engineering</span>.</>
                        )}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
