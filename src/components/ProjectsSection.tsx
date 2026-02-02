"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
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
    githubUrl?: string;
    featured?: boolean;
}

export default function ProjectsSection() {
    const { t, isRTL } = useApp();
    const ref = useRef(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeSlide, setActiveSlide] = useState(0);

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
            image: "/assets/PROJECTS/Quran-API.png",
            tags: ["Node.js", "API", "MongoDB", "Authentication"],
            category: "API",
            liveUrl: "https://quran-api-msr.vercel.app",
            featured: false
        },
        {
            id: 7,
            title: "Chat App (Kotlin)",
            titleAr: "تطبيق المحادثة (Kotlin)",
            description: "A native Android chat application built with Kotlin featuring modern UI and smooth interactions.",
            descriptionAr: "تطبيق دردشة أصلي لنظام أندرويد مبني باستخدام Kotlin يتميز بواجهة عصرية وتفاعلات سلسة.",
            image: "/assets/PROJECTS/ChatUI-App.png",
            tags: ["Kotlin", "Android", "Mobile", "XML"],
            category: "Mobile",
            liveUrl: "https://github.com/Msr7799/chat-ui-kotlin/blob/main/README.md",
            featured: true
        },
        {
            id: 8,
            title: "Almuadhin (Kotlin , SwiftUI)",
            titleAr: "المؤذن (Kotlin , SwiftUI)",
            description: "A native Android chat application built with Kotlin featuring modern UI and smooth interactions.",
            descriptionAr: "تطبيق دردشة أصلي لنظام أندرويد مبني باستخدام Kotlin يتميز بواجهة عصرية وتفاعلات سلسة.",
            image: "/assets/PROJECTS/ALmuadhin-App.png",
            tags: ["Kotlin", "SwiftUI", "Mobile", "iOS , Android"],
            category: "Mobile",
            liveUrl: "https://github.com/Msr7799/Almuadhin",
            featured: true
        }
    ];

    const categories = [t("all"), t("webApps"), t("mobile"), t("api")];
    const categoryMap: { [key: string]: string } = { [t("all")]: "All", [t("webApps")]: "Web Apps", [t("mobile")]: "Mobile", [t("api")]: "API" };

    const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

    // Reset active slide when filter changes
    useEffect(() => {
        setActiveSlide(0);
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [activeFilter]);

    // Handle scroll to update active slide indicator
    const handleScroll = useCallback(() => {
        if (carouselRef.current) {
            const scrollLeft = carouselRef.current.scrollLeft;
            const cardWidth = carouselRef.current.offsetWidth * 0.85;
            const newActiveSlide = Math.round(scrollLeft / cardWidth);
            setActiveSlide(Math.min(newActiveSlide, filteredProjects.length - 1));
        }
    }, [filteredProjects.length]);

    // Scroll to specific slide
    const scrollToSlide = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.offsetWidth * 0.85;
            carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        }
    };

    // Project Card Component
    const ProjectCard = ({ project, isMobile = false }: { project: Project; isMobile?: boolean }) => (
        <div className={`relative rounded-2xl overflow-hidden bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl transition-all duration-300 hover:border-[#667eea]/50 h-full flex flex-col ${isMobile ? 'min-w-[85%] snap-center' : ''}`}>
            {/* Featured Badge */}
            {project.featured && (
                <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} z-10 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-[10px] font-medium shadow-lg`}>
                    ⭐ {t("featured")}
                </div>
            )}

            {/* Image Container */}
            <div className="relative h-44 sm:h-52 overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className={`text-lg font-bold text-[var(--foreground)] mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                    {isRTL ? project.titleAr : project.title}
                </h3>
                <p className={`text-[var(--foreground-muted)] text-xs sm:text-sm mb-4 line-clamp-2 flex-grow ${isRTL ? "text-right" : "text-left"}`}>
                    {isRTL ? project.descriptionAr : project.description}
                </p>
                <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? "justify-end" : "justify-start"}`}>
                    {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-[#667eea]/10 text-[#667eea] text-[10px] font-medium">{tag}</span>
                    ))}
                </div>

                {/* View Demo Button */}
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-shadow ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {t("liveDemo")}
                    </a>
                )}
            </div>
        </div>
    );

    return (
        <section id="projects" className="relative py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-gradient-to-tr from-[#667eea]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }} className="text-center mb-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#667eea]/10 text-[#667eea] text-xs font-medium mb-3">{t("myPortfolio")}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{t("featuredProjects")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-sm sm:text-base">{t("projectsDesc")}</p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.1 }} className={`flex flex-wrap justify-center gap-3 mb-10 ${isRTL ? "flex-row-reverse" : ""}`}>
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

                {/* Mobile Carousel - Only visible on small screens */}
                <div className="sm:hidden">
                    <div
                        ref={carouselRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="min-w-[85%] snap-center">
                                <ProjectCard project={project} isMobile={true} />
                            </div>
                        ))}
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-4">
                        {filteredProjects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${activeSlide === index
                                    ? 'w-6 bg-gradient-to-r from-[#667eea] to-[#764ba2]'
                                    : 'bg-[var(--border-color)] hover:bg-[#667eea]/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Swipe Hint */}
                    <p className="text-center text-[var(--foreground-subtle)] text-xs mt-3 flex items-center justify-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        {isRTL ? "اسحب لرؤية المزيد" : "Swipe to see more"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </p>
                </div>

                {/* Desktop Grid - Hidden on mobile */}
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.2 }} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </motion.div>

                {/* View More */}
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 }} className="text-center mt-12">
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
        </section>
    );
}
