"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

interface Project {
    id: number;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    image: string;
    tags: string[];
    category: string;
    liveUrl?: string;
    githubUrl?: string; // Kept optional as user provided null for some
    featured?: boolean;
}

export default function ProjectsSection() {
    const { t, isRTL } = useApp();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeFilter, setActiveFilter] = useState("All");

    const projects: Project[] = [

        {
            id: 2,
            title: "Quran Website",
            titleAr: "موقع القرآن الكريم",
            description: "An interactive Quran reading and listening platform with Arabic typography, surah navigation, and audio recitation features.",
            descriptionAr: "منصة تفاعلية لقراءة واستماع القرآن مع طباعة عربية مميزة، وتصفح للسور، وميزات تلاوة صوتية.",
            image: "/assets/PROJECTS/quran-websit.png",
            tags: ["React", "API", "CSS", "Audio"],
            category: "Web Apps",
            liveUrl: "https://msr-quran-app.vercel.app/",
            featured: true
        },
        {
            id: 3,
            title: "Mero E-Commerce",
            titleAr: "متجر ميرو الإلكتروني",
            description: "Full-featured e-commerce platform with cart, checkout, payment integration, and admin dashboard for product management.",
            descriptionAr: "منصة تجارة إلكترونية متكاملة مع سلة تسوق، ودفع إلكتروني، ودمج Stripe، ولوحة تحكم للمنتجات.",
            image: "/assets/PROJECTS/mero_e-commerce.png",
            tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
            category: "Web Apps",
            liveUrl: "https://mero-closet.vercel.app",
            featured: true
        },
        {
            id: 4,
            title: "Chat UI",
            titleAr: "واجهة الدردشة الذكية",
            description: "Modern chat interface with real-time messaging, AI integration, and beautiful glassmorphism design. Responsive and accessible.",
            descriptionAr: "واجهة دردشة حديثة مع رسائل فورية، ودمج للذكاء الاصطناعي، وتصميم زجاجي جميل. متجاوبة وسهلة الوصول.",
            image: "/assets/PROJECTS/ChatUI.png",
            tags: ["SvelteKit", "WebSocket", "AI", "TailwindCSS"],
            category: "Web Apps",
            liveUrl: "https://chat-ui-nine-sooty.vercel.app/",
            featured: false
        },
        {
            id: 5,
            title: "Collactions Platform",
            titleAr: "منصة Collactions",
            description: "A collaborative platform for collecting and sharing resources, featuring animated interactions and team workflows.",
            descriptionAr: "منصة تعاونية لجمع ومشاركة الموارد، تتميز بتفاعلات متحركة وسير عمل جماعي.",
            image: "/assets/PROJECTS/collactions.gif",
            tags: ["React", "Animation", "Firebase", "Team"],
            category: "Web Apps",
            liveUrl: "https://collactions.vercel.app",
            featured: false
        },
        {
            id: 1,
            title: "Amwaj Resorts",
            titleAr: "منتجعات أمواج",
            description: "A modern resort booking website with stunning UI, interactive galleries, and smooth animations. Built with Next.js and Tailwind CSS.",
            descriptionAr: "موقع حجز منتجعات عصري بواجهة مستخدم مذهلة، ومعارض تفاعلية، ورسوم متحركة سلسة. مبني بـ Next.js و Tailwind CSS.",
            image: "/assets/PROJECTS/amwaj-resorts.png",
            tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
            category: "Web Apps",
            liveUrl: "https://amwaj-resorts-bh.vercel.app/",
            featured: true
        },
        {
            id: 6,
            title: "Quran API",
            titleAr: "واجهة برمجة تطبيقات القرآن الكريم",
            description: "A comprehensive Quran API with Surah navigation, verse retrieval, and audio recitation features.",
            descriptionAr: "واجهة برمجة تطبيقات شاملة للقرآن الكريم مع تصفح للسور، واسترجاع الآيات، وميزات تلاوة صوتية.",
            image: "/assets/PROJECTS/quran-api.png",
            tags: ["Node.js", "API", "MongoDB", "Authentication"],
            category: "API",
            liveUrl: "https://quran-api-msr.vercel.app",
            featured: false
        }
    ];

    const categories = [t("all"), t("webApps"), t("mobile"), t("api")];
    const categoryMap: { [key: string]: string } = { [t("all")]: "All", [t("webApps")]: "Web Apps", [t("mobile")]: "Mobile", [t("api")]: "API" };

    const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className="relative py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-gradient-to-tr from-[#667eea]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#667eea]/10 text-[#667eea] text-xs font-medium mb-3">{t("myPortfolio")}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{t("featuredProjects")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-sm sm:text-base">{t("projectsDesc")}</p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className={`flex flex-wrap justify-center gap-3 mb-10 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(categoryMap[category] || category)}
                            className={`px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all ${activeFilter === (categoryMap[category] || category)
                                ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-[#667eea]/30"
                                : "bg-[var(--background-glass)] text-[var(--foreground-muted)] border border-[var(--border-color)] hover:border-[#667eea]/50"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                onClick={() => setSelectedProject(project)}
                                className="group relative cursor-pointer"
                            >
                                <div className="relative rounded-2xl overflow-hidden bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl transition-all duration-500 hover:border-[#667eea]/50 hover:shadow-2xl hover:shadow-[#667eea]/10 h-full flex flex-col">
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} z-10 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-[10px] font-medium shadow-lg`}>
                                            ⭐ {t("featured")}
                                        </div>
                                    )}

                                    {/* Image Container */}
                                    <div className="relative h-44 sm:h-52 overflow-hidden">
                                        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#667eea]/90 to-[#764ba2]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                            <motion.div initial={{ scale: 0, rotate: -180 }} whileHover={{ scale: 1.1 }} animate={{ scale: 1, rotate: 0 }} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                        <h3 className={`text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[#667eea] transition-colors ${isRTL ? "text-right" : "text-left"}`}>
                                            {isRTL ? project.titleAr : project.title}
                                        </h3>
                                        <p className={`text-[var(--foreground-muted)] text-xs sm:text-sm mb-4 line-clamp-3 flex-grow ${isRTL ? "text-right" : "text-left"}`}>
                                            {isRTL ? project.descriptionAr : project.description}
                                        </p>
                                        <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : "justify-start"}`}>
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-[#667eea]/10 text-[#667eea] text-[10px] font-medium">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View More */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="text-center mt-12">
                    <a
                        href="https://github.com/MSR7799"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center cursor-pointer gap-2 px-6 py-3 rounded-full border-2 border-[var(--border-color)] text-[var(--foreground)] font-medium hover:border-[#667eea] hover:bg-[#667eea]/10 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        {t("viewMoreGithub")}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--background)] border border-[var(--border-color)] shadow-2xl"
                        >
                            {/* Close Button */}
                            <button onClick={() => setSelectedProject(null)} className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-20 w-10 h-10 p-0 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-500 transition-all backdrop-blur-sm`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            {/* Modal Image */}
                            <div className="relative h-64 sm:h-96 w-full">
                                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-80" />
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 sm:p-10 -mt-20 relative">
                                <div className="mb-6">
                                    <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? "justify-end" : "justify-start"}`}>
                                        {selectedProject.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-[#667eea]/20 text-[#667eea] text-sm font-medium border border-[#667eea]/20">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className={`text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        {isRTL ? selectedProject.titleAr : selectedProject.title}
                                    </h3>
                                    <p className={`text-[var(--foreground-muted)] text-lg leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                        {isRTL ? selectedProject.descriptionAr : selectedProject.description}
                                    </p>
                                </div>

                                {/* Links */}
                                <div className={`flex gap-4 pt-6 border-t border-[var(--border-color)] ${isRTL ? "flex-row-reverse" : ""}`}>
                                    {selectedProject.liveUrl && (
                                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            {t("liveDemo")}
                                        </a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-[var(--border-color)] text-[var(--foreground)] font-semibold hover:border-[#667eea] hover:bg-[#667eea]/5 transition-all">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
