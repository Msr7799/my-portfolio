"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

interface Project {
    id: number;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    image: string;
    fullImage?: string;
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
    const fullImageLookupRef = useRef<number | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeSlide, setActiveSlide] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [resolvedFullImage, setResolvedFullImage] = useState<string | null>(null);

    const projects: Project[] = [
        {
            id: 2,
            title: "Quran Website",
            titleAr: "موقع القرآن الكريم",
            description: "An interactive Quran reading and listening platform with Arabic typography, surah navigation, and audio recitation features.",
            descriptionAr: "منصة تفاعلية لقراءة واستماع القرآن مع طباعة عربية مميزة، وتصفح للسور، وميزات تلاوة صوتية.",
            image: "/assets/PROJECTS/quran-websit.png",
            fullImage: "/assets/PROJECTS/quran-websit-full.png",
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
            fullImage: "/assets/PROJECTS/Quran-API-full.png",
            tags: ["Node.js", "API", "MongoDB", "Authentication"],
            category: "API",
            liveUrl: "https://quran-api-msr.vercel.app",
            featured: false
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
        },
        {
            id: 9,
            title: "All Weather",
            titleAr: "تطبيق شركة all weather",
            description: "A weather application built with modern web technologies providing comprehensive weather information and forecasts.",
            descriptionAr: "تطبيق طقس مبني بتقنيات الويب الحديثة يوفر معلومات وتوقعات جوية شاملة.",
            image: "/assets/PROJECTS/all-weather.png",
            fullImage: "/assets/PROJECTS/all-weather-full.png",
            tags: ["TypeScript", "React", "Next.js", "API", "Database"],
            category: "Web Apps",
            liveUrl: "https://all-weather-bh.vercel.app",
            featured: true
        },
        {
            id: 10,
            title: "world map 3D",
            titleAr: "خريطة العالم 3D",
            description: "A 3D world map application built with modern web technologies providing an immersive experience, and offers address and place maps from Google.",
            descriptionAr: "تطبيق خريطة عالم 3D مبني بتقنيات الويب الحديثة يوفر تجربة غامرة ,و ويوفر خرائط العناوين والأماكن من قوقل ",
            image: "/assets/PROJECTS/earth3d.png",
            tags: ["Three.js", "React","Next.js", "TypeScript", "WebGL"],
            category: "Web Apps",
            liveUrl: "https://world-map-3-d.vercel.app",
            featured: true
        },
        {
            id: 11,
            title: "Dalily Bahrain Website",
            titleAr: "دليلي البحرين",   
            description: "A website that enables you to find any location, place, or any shop or in Bahrain, based on the open data and data of the government of Bahrain.",
            descriptionAr: "موقع دليلي البحرين يمكنك من خلالة إيجاد أي موقع أو مكان أو أي متجر أ في البحرين يعتمد على بيانات و API الداتا المفتوحة لحكومة البحرين.",
            image: "/assets/PROJECTS/dalilybh.png",
            fullImage: "/assets/PROJECTS/dalilybh-full.png",
            tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "API"],
            category: "Web Apps",
            liveUrl: "https://dalilybh.vercel.app",
            featured: true
        },
            {
            id:12,
            title: "Media Detector Pro - chrom extension",
            titleAr: "اكستنشن متصفح كروم لستكشاف ولتحميل جميع أنواع الوسائط من الصفحات",
            description: "Media Detector Pro is a powerful browser extension designed to detect and organize media files found on web pages, including videos, audio, images, and streaming sources. It helps users quickly inspect, preview, and download media assets from supported websites without manually inspecting page source or developer tools.",
            descriptionAr: "اكستنشن متصفح كروم لستكشاف ولتحميل جميع أنواع الوسائط من الصفحات , هو أداة قوية مصممة لاكتشاف وتنظيم ملفات الوسائط الموجودة على صفحات الويب، بما في ذلك مقاطع الفيديو والصوت والصور ومصادر البث. يساعد المستخدمين على فحص معاينة وتنزيل أصول الوسائط بسرعة من المواقع المدعومة دون الحاجة إلى فحص مصادر الصفحة يدويًا أو أدوات المطور. ",
            image: "/assets/PROJECTS/download-extantion.png",
            tags: ["Chrome Extension", "JavaScript", "Vite", "Background Logic", "PopupUI", "React", "Downloads Manager"],
            category: "Web Apps",
            liveUrl: "https://github.com/Msr7799/media-downloder-pro",
            featured: true
        },
            {
                id: 13,
                title: "Marbella Tan",
                titleAr: "ماربيلا تان",
                description: "Luxury tanning products website powered by Next.js, Tailwind CSS and modern React tooling. Curated tanning products for all skin types and multiple tanning shades; an elegant alternative to sunscreen cosmetics.",
                descriptionAr: "منتجات تسمير فاخرة مصنوعة بعناية لجميع انواع البشرات وبدرجات تسمير مختلفة، وتغني عن مستحضرات الوقاية من الشمس.",
                image: "/assets/PROJECTS/Merbella-Tan.png",
                fullImage: "/assets/PROJECTS/Merbella-Tan-full.png",
                tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Zustand", "React Query", "Sonner", "Three.js", "motion", "E-commerce"],
                category: "Web Apps",
                liveUrl: "https://marbella-tan.vercel.app",
                featured: true
            },
        {
            id: 14,
            title: "Dream Interpretation RAG System",
            titleAr: "نظام تفسير الأحلام الذكي",
            description: "An Arabic dream interpretation platform that searches trusted Islamic sources and uses AI to generate answers grounded in retrieved excerpts.",
            descriptionAr: "منصة عربية لتفسير الأحلام تبحث في مصادر إسلامية موثوقة وتستخدم الذكاء الاصطناعي لصياغة إجابات مستندة إلى النصوص المسترجعة.",
            image: "/assets/PROJECTS/tafseer-ala7lam.png",
            tags: ["Next.js", "TypeScript", "Firebase", "AI", "RAG"],
            category: "Web Apps",
            liveUrl: "https://tafseer-ala7lam.vercel.app/",
            featured: true
        },
        {
            id: 15,
            title: "Brick Breaker Ball",
            titleAr: "لعبة تحطيم الطوب",
            description: "A native Android brick-breaker game built with Kotlin and LibGDX, featuring sprite-based gameplay, paddle controls, and progressive levels.",
            descriptionAr: "لعبة أندرويد أصلية لتحطيم الطوب مبنية باستخدام Kotlin وLibGDX، وتتميز برسومات متحركة وتحكم سلس ومستويات متدرجة.",
            image: "/assets/PROJECTS/BrickBreakerBall.png",
            tags: ["Kotlin", "LibGDX", "Android", "Game"],
            category: "Mobile",
            githubUrl: "https://github.com/Msr7799/Brick_Breaker_GAME",
            featured: true
        },
        {
            id: 16,
            title: "Advanced Casio-Style Calculator",
            titleAr: "آلة حاسبة علمية متقدمة",
            description: "An interactive graphing and scientific calculator with tools for equations, matrices, statistics, tables, and in-browser Python execution.",
            descriptionAr: "آلة حاسبة علمية ورسومية تفاعلية تضم أدوات للمعادلات والمصفوفات والإحصاء والجداول وتشغيل Python داخل المتصفح.",
            image: "/assets/PROJECTS/advanced-calculator.png",
            tags: ["Next.js", "React", "TypeScript", "Pyodide"],
            category: "Web Apps",
            liveUrl: "https://advanced-calculator-casio.vercel.app/",
            featured: true
        },
        {
            id: 17,
            title: "World Clock",
            titleAr: "الساعة العالمية",
            description: "A responsive time-zone dashboard for tracking live clocks across countries and capital cities, with light and dark themes.",
            descriptionAr: "لوحة متجاوبة للمناطق الزمنية تتيح متابعة الساعات الحية في الدول والعواصم، مع الوضعين الفاتح والداكن.",
            image: "/assets/PROJECTS/World-Clock.png",
            tags: ["React", "Vite", "Tailwind CSS", "Time Zones"],
            category: "Web Apps",
            liveUrl: "https://world-clock-real-time.vercel.app/",
            featured: true
        },
    ];
    const categories = [t("all"), t("webApps"), t("mobile"), t("api")];
    const categoryMap: Record<string, string> = {
        [t("all")]: "All",
        [t("webApps")]: "Web Apps",
        [t("mobile")]: "Mobile",
        [t("api")]: "API"
    };

    const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);
    const selectedImage = resolvedFullImage ?? selectedProject?.fullImage ?? selectedProject?.image;
    const isFullPageImage = selectedImage?.toLowerCase().includes("-full.") ?? false;

    // Reset active slide when filter changes
    useEffect(() => {
        const resetTimer = window.setTimeout(() => {
            setActiveSlide(0);
            if (carouselRef.current) {
                carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            }
        }, 0);

        return () => window.clearTimeout(resetTimer);
    }, [activeFilter]);

    const closeProjectPreview = useCallback(() => {
        fullImageLookupRef.current = null;
        setResolvedFullImage(null);
        setSelectedProject(null);
    }, []);

    useEffect(() => {
        if (!selectedProject) return;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeProjectPreview();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedProject, closeProjectPreview]);

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

    const openProjectPreview = useCallback((project: Project) => {
        fullImageLookupRef.current = project.id;
        setSelectedProject(project);

        if (project.fullImage) {
            setResolvedFullImage(project.fullImage);
            return;
        }

        if (project.image.toLowerCase().includes("-full.")) {
            setResolvedFullImage(project.image);
            return;
        }

        setResolvedFullImage(null);
        const fullImageCandidate = project.image.replace(/(\.[^./]+)$/, "-full$1");
        if (fullImageCandidate === project.image) return;

        void fetch(fullImageCandidate, { method: "HEAD", cache: "force-cache" })
            .then((response) => {
                if (response.ok && fullImageLookupRef.current === project.id) {
                    setResolvedFullImage(fullImageCandidate);
                }
            })
            .catch(() => {
                // A full-page companion image is optional; keep the standard preview when it is absent.
            });
    }, []);

    // Project Card Component
    const ProjectCard = ({ project, isMobile = false }: { project: Project; isMobile?: boolean }) => (
        <div className={`relative rounded-2xl overflow-hidden bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl transition-all duration-300 hover:border-[#B32626]/50 h-full flex flex-col ${isMobile ? 'min-w-[85%] snap-center' : ''}`}>
            {/* Featured Badge */}
            {project.featured && (
                <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} z-10 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#B32626] to-[#771111] text-white text-[10px] font-medium shadow-lg`}>
                    ⭐ {t("featured")}
                </div>
            )}

            {/* Image Container */}
            <button
                type="button"
                onClick={() => openProjectPreview(project)}
                className="group/image relative block h-44 sm:h-52 w-full overflow-hidden p-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B93232]"
                aria-label={`${isRTL ? "تكبير صورة" : "Enlarge image for"} ${isRTL ? project.titleAr : project.title}`}
            >
                <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover/image:scale-105" unoptimized={project.image.endsWith('.gif')} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity group-hover/image:opacity-100 group-focus-visible/image:opacity-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0zm-7-3v6m-3-3h6" />
                    </svg>
                </span>
            </button>

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
                        <span key={tag} className="theme-accent-label px-3 py-1 rounded-full bg-[#B32626]/10 text-[10px] font-medium">{tag}</span>
                    ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-2">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#771111] via-[#922020] to-[#B93232] text-white text-sm font-semibold shadow-lg shadow-[#771111]/20 hover:shadow-[#B93232]/35 transition-shadow ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {t("liveDemo")}
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#B32626]/50 text-[var(--foreground)] text-sm font-semibold hover:bg-[#B32626]/10 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 6.84c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.57A12 12 0 0012 0z" />
                            </svg>
                            {isRTL ? "الكود المصدري" : "Source Code"}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <section id="projects" className="relative py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-gradient-to-tr from-[#B32626]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }} className="text-center mb-10">
                    <span className="theme-accent-label inline-block px-4 py-2 rounded-full bg-[#B32626]/10 text-xs font-medium mb-3">{t("myPortfolio")}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="section-heading-text">{t("featuredProjects")}</span>
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
                                ? "bg-gradient-to-r from-[#771111] via-[#922020] to-[#B93232] text-white shadow-lg shadow-[#771111]/30"
                                : "bg-[var(--background-glass)] text-[var(--foreground-muted)] border border-[var(--border-color)] hover:border-[#B32626]/50"
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
                                    ? 'w-6 bg-gradient-to-r from-[#B32626] to-[#771111]'
                                    : 'bg-[var(--border-color)] hover:bg-[#B32626]/50'
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
                        className={`inline-flex items-center cursor-pointer gap-2 px-6 py-3 rounded-full border-2 border-[var(--border-color)] text-[var(--foreground)] font-medium hover:border-[#B32626] hover:bg-[#B32626]/10 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        {t("viewMoreGithub")}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                </motion.div>
            </div>

            {typeof document !== "undefined" && createPortal(
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={closeProjectPreview}
                        role="dialog"
                        aria-modal="true"
                        aria-label={isRTL ? `صورة مشروع ${selectedProject.titleAr}` : `${selectedProject.title} project image`}
                    >
                        <motion.div
                            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[var(--background-secondary)] shadow-2xl"
                            initial={{ opacity: 0, scale: 0.94, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.22 }}
                            onMouseDown={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={closeProjectPreview}
                                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 p-0 text-white backdrop-blur-md transition-colors hover:bg-[#771111]"
                                aria-label={isRTL ? "إغلاق الصورة" : "Close image"}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {isFullPageImage && selectedImage ? (
                                <div className="relative max-h-[72vh] flex-1 overflow-y-auto overscroll-contain bg-black/35">
                                    <div className="sticky top-3 z-10 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/65 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                                        <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-5-5m5 5l5-5" />
                                        </svg>
                                        {isRTL ? "مرّر لعرض الصفحة كاملة" : "Scroll to view the full page"}
                                    </div>
                                    {/* Full-page screenshots use their natural aspect ratio so any future *-full image can scroll correctly. */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={selectedImage}
                                        alt={selectedProject.title}
                                        className="block h-auto w-full"
                                    />
                                </div>
                            ) : (
                                <div className="relative min-h-[260px] flex-1 bg-black/35 sm:min-h-[480px]">
                                    <Image
                                        src={selectedImage ?? selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 1100px"
                                        unoptimized={(selectedImage ?? selectedProject.image).endsWith('.gif')}
                                        priority
                                    />
                                </div>
                            )}

                            <div className={`flex flex-col gap-4 border-t border-[var(--border-color)] bg-[var(--background-glass)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                                <h3 className={`text-lg font-bold text-[var(--foreground)] sm:text-xl ${isRTL ? "text-right" : "text-left"}`}>
                                    {isRTL ? selectedProject.titleAr : selectedProject.title}
                                </h3>
                                <div className={`flex flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#771111] via-[#922020] to-[#B93232] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#771111]/25"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            {t("liveDemo")}
                                        </a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[#B32626] hover:bg-[#B32626]/10"
                                        >
                                            {isRTL ? "الكود المصدري" : "Source Code"}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
            )}
        </section>
    );
}
