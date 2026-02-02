"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { ClipboardList, MessageCircle, Palette, Briefcase, Handshake, Puzzle, BookOpen, Zap, Settings, Target, Rocket } from "lucide-react";
import { IconCloud } from "@/components/ui/icon-cloud";

export default function SkillsSection() {
    const { t, isRTL } = useApp();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const technologies = [
        { name: "JavaScript", icon: "/assets/tech/javascript.svg", category: "Languages" },
        { name: "TypeScript", icon: "/assets/tech/typescript.svg", category: "Languages" },
        { name: "CSS", icon: "/assets/tech/css.svg", category: "Languages" },
        { name: "HTML", icon: "/assets/tech/html.svg", category: "Languages" },
        { name: "React", icon: "/assets/tech/react.svg", category: "Frameworks" },
        { name: "Next.js", icon: "/assets/tech/Nextjs.svg", category: "Frameworks", needsWhiteBg: true },
        { name: "Node.js", icon: "/assets/tech/node.js.svg", category: "Frameworks" },
        { name: "Python", icon: "/assets/tech/python.svg", category: "Languages" },
        { name: "Kotlin", icon: "/assets/tech/Kotlin.svg", category: "Languages" },
        { name: "Dart", icon: "/assets/tech/Dart.svg", category: "Languages" },
        { name: "Gradle", icon: "/assets/tech/Gradle.svg", category: "Tools" },
        { name: "Flutter", icon: "/assets/tech/flutter.svg", category: "Frameworks" },
        { name: "Flask", icon: "/assets/tech/flask.svg", category: "Frameworks", needsWhiteBg: true },
        { name: "Tailwind", icon: "/assets/tech/tailwindCSS.png", category: "Frameworks" },
        { name: "Git", icon: "/assets/tech/Git.svg", category: "Tools" },
        { name: "VS Code", icon: "/assets/tech/vscode.svg", category: "Tools" },
        { name: "Figma", icon: "/assets/tech/Figma.svg", category: "Tools" },
        { name: "Firebase", icon: "/assets/tech/firebase.svg", category: "Cloud" },
        { name: "PostgreSQL", icon: "/assets/tech/postgresql.svg", category: "Database" },
        { name: "MongoDB", icon: "/assets/tech/MongoDB.svg", category: "Database" },
        { name: "Linux", icon: "/assets/tech/linux.svg", category: "OS" },
        { name: "Android", icon: "/assets/tech/Android-Studio.svg", category: "OS" },
        { name: "iOS", icon: "/assets/tech/ios.svg", category: "OS", needsWhiteBg: true },
        { name: "Google Cloud", icon: "/assets/tech/google-cloud.svg", category: "Cloud" },
        { name: "colab", icon: "/assets/tech/colab.svg", category: "Tools" },
        { name: "Oracle", icon: "/assets/tech/Oracle.svg", category: "Database", needsWhiteBg: true },
        { name: "SQLite", icon: "/assets/tech/SQLite.svg", category: "Database", needsWhiteBg: true },
        { name: "Postman", icon: "/assets/tech/postman.svg", category: "Tools" },
        { name: "Powershell", icon: "/assets/tech/Powershell.svg", category: "Tools", needsWhiteBg: true },
        { name: "Markdown", icon: "/assets/tech/Markdown.svg", category: "Tools", needsWhiteBg: true },
        { name: "Microsoft", icon: "/assets/tech/Microsoft.svg", category: "Tools", needsWhiteBg: true },
        { name: "Vercel", icon: "/assets/tech/vercel.svg", category: "Tools", needsWhiteBg: true },
        { name: "Vite", icon: "/assets/tech/Vite.svg", category: "Tools" },
        { name: "Godot Engine", icon: "/assets/tech/Godot-Engine.svg", category: "Tools" },
        { name: "Github", icon: "/assets/tech/github.svg", category: "Tools" },
        { name: "NeonDB", icon: "/assets/tech/neon-DB.svg", category: "Tools" },
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
        { name: t("organization"), icon: ClipboardList },
        { name: t("communication"), icon: MessageCircle },
        { name: t("uiDesigner"), icon: Palette },
        { name: t("leadership"), icon: Briefcase },
        { name: t("teamwork"), icon: Handshake },
        { name: t("problemSolving"), icon: Puzzle },
        { name: t("fastLearner"), icon: BookOpen },
        { name: t("discipline"), icon: Zap },
    ];

    // Simplified animation variants for better performance
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.02 } } };
    const itemVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

    return (
        <section id="skills" className="relative py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute right-0 top-1/3 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-l from-[#764ba2]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }} className="text-center mb-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#667eea]/10 text-[#667eea] text-xs font-medium mb-3">{t("skillsAndTech")}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{t("myTechStack")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-sm sm:text-base">{t("techStackDesc")}</p>
                </motion.div>

                {/* IconCloud + Technologies Grid */}
                <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
                    {/* IconCloud - Hidden on mobile for performance, visible only on lg screens */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:flex w-full lg:w-1/3 justify-center"
                    >
                        <div className="w-[350px] h-[350px] relative">
                            <IconCloud images={technologies.map(t => t.icon)} />
                        </div>
                    </motion.div>

                    {/* Technologies Grid - Full width on mobile, 2/3 on large screens */}
                    <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full lg:w-2/3">
                        <div className="tech-grid grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-3">
                            {technologies.map((tech) => (
                                <motion.div
                                    key={tech.name}
                                    variants={itemVariants}
                                    className="group relative flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-sm hover:border-[#667eea]/50 hover:bg-[var(--background-card)] transition-colors duration-200 cursor-pointer"
                                >
                                    <div className={`relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center ${tech.needsWhiteBg ? 'bg-white/80 rounded-xl p-0.5' : ''}`}>
                                        <Image src={tech.icon} alt={tech.name} width={80} height={80} className="object-contain" />
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors text-center">{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Skills Grid */}
                <div className={`grid lg:grid-cols-2 gap-8`}>
                    {/* Technical Skills */}
                    <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.1 }} className="p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                        <h3 className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-6 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                                <Settings className="w-5 h-5 text-white" />
                            </span>
                            {t("technicalSkills")}
                        </h3>
                        <div className="space-y-5">
                            {technicalSkills.map((skill, index) => (
                                <div key={skill.name}>
                                    <div className={`flex justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span className="text-[var(--foreground)] font-medium text-sm sm:text-base">{skill.name}</span>
                                        <span className="text-[#667eea] font-semibold text-sm sm:text-base">{skill.level}%</span>
                                    </div>
                                    <div className="h-2.5 bg-[var(--background-card)] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${skill.level}%` } : {}}
                                            transition={{ duration: 0.6, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                                            className="h-full rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills */}
                    <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.2 }} className="p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                        <h3 className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-6 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#764ba2] to-[#00d9ff] flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </span>
                            {t("softSkills")}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {softSkills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className={`flex items-center gap-3 p-3 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] hover:border-[#764ba2]/50 transition-colors cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
                                >
                                    <skill.icon className="w-5 h-5 text-[#667eea]" />
                                    <span className="text-[var(--foreground)] font-medium text-xs sm:text-sm">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Expertise Areas */}
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 }} className="mt-8 p-5 sm:p-6 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl">
                    <h3 className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4 text-center flex items-center justify-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#667eea] flex items-center justify-center">
                            <Rocket className="w-5 h-5 text-white" />
                        </span>
                        {t("expertiseAreas")}
                    </h3>
                    <p className="text-[var(--foreground-muted)] text-center leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
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
