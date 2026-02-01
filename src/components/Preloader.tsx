"use client";
import { useState, useEffect } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";

interface PreloaderProps {
    onComplete: () => void;
}

const images = [
    "/assets/tech/android-log.svg",
    "/assets/tech/bootstrap.svg",
    "/assets/tech/cloudinary.png",
    "/assets/tech/colab.svg",
    "/assets/tech/css.svg",
    "/assets/tech/Dart.svg",
    "/assets/tech/dj.svg",
    "/assets/tech/docker.svg",
    "/assets/tech/Figma.svg",
    "/assets/tech/firebase.svg",
    "/assets/tech/flask.svg",
    "/assets/tech/flutter.svg",
    "/assets/tech/Git.svg",
    "/assets/tech/github.svg",
    "/assets/tech/Godot-Engine.svg",
    "/assets/tech/google-cloud.svg",
    "/assets/tech/google-play.svg",
    "/assets/tech/html.png",
    "/assets/tech/ios.svg",
    "/assets/tech/javascript.svg",
    "/assets/tech/linux.svg",
    "/assets/tech/Markdown.svg",
    "/assets/tech/MongoDB.svg",
    "/assets/tech/neon-DB.svg",
    "/assets/tech/Nextjs.svg",
    "/assets/tech/node.js.svg",
    "/assets/tech/openrouter.svg",
    "/assets/tech/Oracle.svg",
    "/assets/tech/postgresql.svg",
    "/assets/tech/postman.svg",
    "/assets/tech/Powershell.svg",
    "/assets/tech/python.svg",
    "/assets/tech/react.svg",
    "/assets/tech/SQLite.svg",
    "/assets/tech/tailwindCSS.svg",
    "/assets/tech/typescript.svg",
    "/assets/tech/vercel.svg",
    "/assets/tech/visual-studio.svg",
    "/assets/tech/Vite.svg",
    "/assets/tech/window.svg",
    "/assets/tech/windows11.svg"
];

const facts = [
    "Developers spend 80% thinking, 20% coding.",
    "Average developer drinks 4 cups of coffee daily.",
    "Even top devs write 15-50 bugs per 1000 lines.",
    "65% of developers prefer coding at night.",
    "Developers learn new tech every 2-5 years."
];

export default function Preloader({ onComplete }: PreloaderProps) {
    const [currentFact, setCurrentFact] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Change facts every 2 seconds
        const factInterval = setInterval(() => {
            setCurrentFact((prev) => (prev + 1) % facts.length);
        }, 2000);

        // Hide preloader after 8 seconds
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade animation
        }, 8000);

        return () => {
            clearInterval(factInterval);
            clearTimeout(hideTimer);
        };
    }, [onComplete]);

    if (!isVisible) {
        return (
            <div className="fixed inset-0 z-50 bg-white transition-opacity duration-500 opacity-0 pointer-events-none">
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
            {/* IconCloud */}
            <div className="relative flex items-center justify-center mb-8 scale-75 md:scale-100">
                <IconCloud images={images} />
            </div>

            {/* Facts Area */}
            <div className="text-center max-w-md mx-auto px-4 absolute bottom-20">
                <p className="text-lg font-semibold text-gray-800 mb-4">Did you know?</p>
                <div className="h-16 flex items-center justify-center">
                    <p
                        key={currentFact}
                        className="text-sm text-gray-600 leading-relaxed animate-fade-in"
                    >
                        {facts[currentFact]}
                    </p>
                </div>
            </div>


        </div>
    );
}
