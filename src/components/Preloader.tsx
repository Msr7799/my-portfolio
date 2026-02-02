"use client";
import { useState, useEffect } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Progress, ProgressLabel, ProgressValue, ProgressTrack } from "@/components/ui/progress";

interface PreloaderProps {
    onComplete: () => void;
}

const images = [
    "/assets/tech/android.svg",
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
    "/assets/tech/Microsoft.svg",
    "/assets/tech/MongoDB.svg",
    "/assets/tech/neon-DB.svg",
    "/assets/tech/Nextjs.svg",
    "/assets/tech/node.js.svg",
    "/assets/tech/Oracle.svg",
    "/assets/tech/postgresql.svg",
    "/assets/tech/postman.svg",
    "/assets/tech/Powershell.svg",
    "/assets/tech/python.svg",
    "/assets/tech/react.svg",
    "/assets/tech/SQLite.svg",
    "/assets/tech/tailwindCSS.png",
    "/assets/tech/typescript.svg",
    "/assets/tech/vercel.svg",
    "/assets/tech/vscode.svg",
    "/assets/tech/Vite.svg",
    "/assets/tech/kotlin.svg",
    "/assets/tech/gradle.svg",
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
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Change facts every 2 seconds
        const factInterval = setInterval(() => {
            setCurrentFact((prev) => (prev + 1) % facts.length);
        }, 2000);

        // Progress animation - reaches 100% over 8 seconds
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + 1.25;
            });
        }, 100);

        // Hide preloader after 8 seconds
        const hideTimer = setTimeout(() => {
            setProgress(100);
            setIsVisible(false);
            setTimeout(onComplete, 500);
        }, 8000);

        return () => {
            clearInterval(factInterval);
            clearInterval(progressInterval);
            clearTimeout(hideTimer);
        };
    }, [onComplete]);

    if (!isVisible) {
        return (
            <div className="fixed inset-0 z-50 bg-black/80 transition-opacity duration-500 opacity-0 pointer-events-none" />
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center">
            {/* IconCloud - Always rendered immediately */}
            <div
                className="relative flex items-center justify-center mb-8 scale-110 sm:scale-125 md:scale-150"
                style={{ width: '300px', height: '300px' }}
            >
                <IconCloud images={images} />
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md px-8 mb-12">
                <Progress value={progress}>
                    <div className="flex items-center justify-between mb-3">
                        <ProgressLabel className="text-gray-400 text-xs uppercase tracking-wider">
                            Loading Experience
                        </ProgressLabel>
                        <ProgressValue className="text-purple-400 font-mono text-sm" />
                    </div>
                    <ProgressTrack
                        className="h-1.5 bg-gray-800/80 border border-gray-700/50"
                        indicatorClassName="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    />
                </Progress>
            </div>

            {/* Facts Area - with proper spacing from progress bar */}
            <div className="text-center max-w-md mx-auto px-4">
                <p className="text-lg font-semibold text-gray-300 mb-3">Did you know?</p>
                <div className="h-12 flex items-center justify-center">
                    <p
                        key={currentFact}
                        className="text-sm text-gray-500 leading-relaxed animate-fade-in"
                    >
                        {facts[currentFact]}
                    </p>
                </div>
            </div>
        </div>
    );
}


