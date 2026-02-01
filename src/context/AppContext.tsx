"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "ar" | "en";

interface AppContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    t: (key: string) => string;
    isRTL: boolean;
}

const translations = {
    en: {
        // Header
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        downloadCV: "Download CV",

        // Hero
        availableForWork: "Available for work",
        greeting: "Hi, I'm",
        name: "Mohamed Alromaihi",
        role1: "Full-Stack Developer",
        role2: "Cybersecurity Technician",
        role3: "Mobile App Developer",
        role4: "UI/UX Designer",
        heroDescription: "Former military officer with 11 years of experience, now a passionate developer building modern web applications, mobile apps, and secure systems. Based in Bahrain.",
        viewMyWork: "View My Work",
        contactMe: "Contact Me",
        yearsExperience: "Years Experience",
        projectsCompleted: "Projects Completed",
        technologies: "Technologies",
        scrollDown: "Scroll Down",

        // About
        aboutMe: "About Me",
        myJourney: "My Journey",
        journeyDesc: "From military leadership to software development - a journey of discipline, dedication, and continuous learning.",
        myStory: "My Story",
        storyText1: "Military Leader & Cybersecurity Technician | Full-Stack Developer. Experienced in network security and full-stack development using HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, Python, Flask, and Flutter.",
        storyText2: "Former officer with the rank of Captain, bringing strong leadership, discipline, and teamwork. Skilled in Linux, PowerShell, and database management, with a proven ability to deliver high-quality and efficient solutions.",
        languages: "Languages",
        arabic: "Arabic",
        english: "English",
        native: "Native",
        fluent: "Fluent",
        workExperience: "Work Experience",
        education: "Education",

        // Skills
        skillsAndTech: "Skills & Technologies",
        myTechStack: "My Tech Stack",
        techStackDesc: "Technologies and tools I use to bring ideas to life. From frontend to backend, mobile to cloud - I build complete solutions.",
        technicalSkills: "Technical Skills",
        softSkills: "Soft Skills",
        expertiseAreas: "Expertise Areas",
        fullStackDev: "Full-Stack Development",
        mobileAppDev: "Mobile App Development",
        cybersecurity: "Cybersecurity",
        databaseMgmt: "Database Management",
        apiDev: "API Development",
        uiuxDesign: "UI/UX Design",
        organization: "Organization",
        communication: "Communication",
        uiDesigner: "UI Designer",
        leadership: "Leadership",
        teamwork: "Teamwork",
        problemSolving: "Problem Solving",
        fastLearner: "Fast Learner",
        discipline: "Discipline",

        // Projects
        myPortfolio: "My Portfolio",
        featuredProjects: "Featured Projects",
        projectsDesc: "A showcase of my best work - from web applications to mobile apps and APIs. Each project represents creativity, problem-solving, and attention to detail.",
        all: "All",
        webApps: "Web Apps",
        mobile: "Mobile",
        api: "API",
        viewMoreGithub: "View More on GitHub",
        liveDemo: "Live Demo",
        featured: "Featured",

        // Contact
        getInTouch: "Get In Touch",
        letsWorkTogether: "Let's Work Together",
        contactDesc: "Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.",
        email: "Email",
        phone: "Phone",
        location: "Location",
        downloadMyCv: "Download My CV",
        cvDesc: "Get a detailed overview of my experience, skills, and qualifications.",
        sendMessage: "Send Me a Message",
        yourName: "Your Name",
        emailAddress: "Email Address",
        yourMessage: "Your Message",
        messagePlaceholder: "Tell me about your project...",
        sending: "Sending...",
        sendBtn: "Send Message",

        // Footer
        allRightsReserved: "All rights reserved.",
        builtWith: "Built with Next.js, TypeScript & Tailwind CSS",
    },
    ar: {
        // Header
        home: "الرئيسية",
        about: "عني",
        skills: "المهارات",
        projects: "المشاريع",
        contact: "التواصل",
        downloadCV: "تحميل السيرة",

        // Hero
        availableForWork: "متاح للعمل",
        greeting: "مرحباً، أنا",
        name: "محمد سعود الرميحي",
        role1: "مطور Full-Stack",
        role2: "تقني أمن سيبراني",
        role3: "مطور تطبيقات الجوال",
        role4: "مصمم UI/UX",
        heroDescription: "ضابط عسكري سابق بخبرة 11 عامًا، الآن مطور متحمس لبناء تطبيقات الويب الحديثة وتطبيقات الجوال والأنظمة الآمنة. مقيم في البحرين.",
        viewMyWork: "شاهد أعمالي",
        contactMe: "تواصل معي",
        yearsExperience: "سنوات الخبرة",
        projectsCompleted: "مشاريع منجزة",
        technologies: "تقنيات",
        scrollDown: "اسحب للأسفل",

        // About
        aboutMe: "نبذة عني",
        myJourney: "رحلتي",
        journeyDesc: "من القيادة العسكرية إلى تطوير البرمجيات - رحلة من الانضباط والتفاني والتعلم المستمر.",
        myStory: "قصتي",
        storyText1: "قائد عسكري وتقني أمن سيبراني | مطور Full-Stack. خبرة في أمن الشبكات وتطوير Full-Stack باستخدام HTML و CSS و JavaScript و React و Next.js و TypeScript و Tailwind CSS و Python و Flask و Flutter.",
        storyText2: "ضابط سابق برتبة نقيب، أجلب قيادة قوية وانضباطًا وعملًا جماعيًا. ماهر في Linux و PowerShell وإدارة قواعد البيانات.",
        languages: "اللغات",
        arabic: "العربية",
        english: "الإنجليزية",
        native: "لغة أم",
        fluent: "بطلاقة",
        workExperience: "الخبرات العملية",
        education: "التعليم",

        // Skills
        skillsAndTech: "المهارات والتقنيات",
        myTechStack: "مجموعتي التقنية",
        techStackDesc: "التقنيات والأدوات التي أستخدمها لتحويل الأفكار إلى واقع. من الواجهة الأمامية إلى الخلفية، من الجوال إلى السحابة.",
        technicalSkills: "المهارات التقنية",
        softSkills: "المهارات الشخصية",
        expertiseAreas: "مجالات الخبرة",
        fullStackDev: "تطوير Full-Stack",
        mobileAppDev: "تطوير تطبيقات الجوال",
        cybersecurity: "الأمن السيبراني",
        databaseMgmt: "إدارة قواعد البيانات",
        apiDev: "تطوير API",
        uiuxDesign: "تصميم UI/UX",
        organization: "التنظيم",
        communication: "التواصل",
        uiDesigner: "مصمم واجهات",
        leadership: "القيادة",
        teamwork: "العمل الجماعي",
        problemSolving: "حل المشكلات",
        fastLearner: "سريع التعلم",
        discipline: "الانضباط",

        // Projects
        myPortfolio: "معرض أعمالي",
        featuredProjects: "المشاريع المميزة",
        projectsDesc: "عرض لأفضل أعمالي - من تطبيقات الويب إلى تطبيقات الجوال والـ APIs. كل مشروع يمثل الإبداع وحل المشكلات والاهتمام بالتفاصيل.",
        all: "الكل",
        webApps: "تطبيقات ويب",
        mobile: "جوال",
        api: "API",
        viewMoreGithub: "المزيد على GitHub",
        liveDemo: "معاينة مباشرة",
        featured: "مميز",

        // Contact
        getInTouch: "تواصل معي",
        letsWorkTogether: "لنعمل معًا",
        contactDesc: "هل لديك مشروع في ذهنك أو تريد التعاون؟ لا تتردد في التواصل. أنا دائمًا منفتح لمناقشة الفرص الجديدة.",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        location: "الموقع",
        downloadMyCv: "تحميل السيرة الذاتية",
        cvDesc: "احصل على نظرة تفصيلية على خبرتي ومهاراتي ومؤهلاتي.",
        sendMessage: "أرسل لي رسالة",
        yourName: "اسمك",
        emailAddress: "البريد الإلكتروني",
        yourMessage: "رسالتك",
        messagePlaceholder: "أخبرني عن مشروعك...",
        sending: "جاري الإرسال...",
        sendBtn: "إرسال الرسالة",

        // Footer
        allRightsReserved: "جميع الحقوق محفوظة.",
        builtWith: "بُني بـ Next.js و TypeScript و Tailwind CSS",
    },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedTheme) setTheme(savedTheme);
        if (savedLanguage) setLanguage(savedLanguage);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
        document.documentElement.setAttribute("lang", language);
        localStorage.setItem("language", language);
    }, [language]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
    const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key;
    };

    const isRTL = language === "ar";

    return (
        <AppContext.Provider value={{ theme, setTheme, toggleTheme, language, setLanguage, toggleLanguage, t, isRTL }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within AppProvider");
    return context;
}
