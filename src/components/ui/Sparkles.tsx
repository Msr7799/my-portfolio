"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SparklesProps {
    id?: string;
    className?: string;
    particleColor?: string;
    particleSize?: number;
    particleDensity?: number;
    speed?: number;
    minSize?: number;
    maxSize?: number;
}

export default function Sparkles({
    id = "sparkles",
    className = "",
    particleColor = "#667eea",
    particleSize = 2,
    particleDensity = 100,
    speed = 1,
    minSize = 0.5,
    maxSize = 1.5,
}: SparklesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            opacitySpeed: number;
        }> = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / (10000 / particleDensity));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: minSize + Math.random() * (maxSize - minSize),
                    speedX: (Math.random() - 0.5) * speed * 0.5,
                    speedY: (Math.random() - 0.5) * speed * 0.5,
                    opacity: Math.random(),
                    opacitySpeed: (Math.random() * 0.02 + 0.005) * speed,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Update opacity (twinkle effect)
                particle.opacity += particle.opacitySpeed;
                if (particle.opacity >= 1 || particle.opacity <= 0) {
                    particle.opacitySpeed *= -1;
                }

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * particleSize, 0, Math.PI * 2);
                ctx.fillStyle = particleColor.includes("rgb")
                    ? particleColor.replace(")", `, ${particle.opacity})`)
                    : hexToRgba(particleColor, particle.opacity);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        const hexToRgba = (hex: string, alpha: number) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        resize();
        animate();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [particleColor, particleSize, particleDensity, speed, minSize, maxSize]);

    return (
        <canvas
            ref={canvasRef}
            id={id}
            className={`absolute inset-0 pointer-events-none ${className}`}
        />
    );
}

// Shimmer Button Component inspired by Magic UI
export function ShimmerButton({
    children,
    className = "",
    shimmerColor = "#ffffff",
    shimmerSize = "0.1em",
    borderRadius = "100px",
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    onClick?: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] ${className}`}
            style={{ borderRadius }}
        >
            {/* Shimmer overlay */}
            <div
                className="absolute inset-0 animate-shimmer"
                style={{
                    background: `linear-gradient(90deg, transparent, ${shimmerColor}30, transparent)`,
                    backgroundSize: "200% 100%",
                }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

// Animated Shiny Text inspired by Magic UI
export function AnimatedShinyText({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`inline-block animate-shimmer bg-gradient-to-r from-[--foreground] via-[#667eea] to-[--foreground] bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
        >
            {children}
        </span>
    );
}

// Border Beam effect inspired by Magic UI
export function BorderBeam({
    size = 200,
    duration = 12,
    borderWidth = 1.5,
    colorFrom = "#667eea",
    colorTo = "#764ba2",
    className = "",
}: {
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
    className?: string;
}) {
    return (
        <div
            className={`absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
            style={{ padding: `${borderWidth}px` }}
        >
            <motion.div
                className="absolute"
                style={{
                    width: size,
                    height: size,
                    background: `radial-gradient(circle, ${colorFrom}, ${colorTo}50, transparent 70%)`,
                }}
                animate={{
                    offsetDistance: ["0%", "100%"],
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
}
