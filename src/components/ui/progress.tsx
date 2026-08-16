"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, useSpring, useTransform, type SpringOptions } from "framer-motion";

// Context for Progress value
interface ProgressContextType {
    value: number;
    min: number;
    max: number;
}

const ProgressContext = createContext<ProgressContextType>({
    value: 0,
    min: 0,
    max: 100,
});

// Main Progress Component
interface ProgressProps {
    value?: number;
    min?: number;
    max?: number;
    className?: string;
    children: React.ReactNode;
}

export function Progress({
    value = 0,
    min = 0,
    max = 100,
    className = "",
    children,
}: ProgressProps) {
    return (
        <ProgressContext.Provider value={{ value, min, max }}>
            <div
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                className={`flex flex-col gap-2 w-full ${className}`}
            >
                {children}
            </div>
        </ProgressContext.Provider>
    );
}

// Progress Label Component
interface ProgressLabelProps {
    className?: string;
    children: React.ReactNode;
}

export function ProgressLabel({ className = "", children }: ProgressLabelProps) {
    return (
        <span className={`text-sm font-medium text-[var(--foreground-muted)] ${className}`}>
            {children}
        </span>
    );
}

// Progress Value Component with animated counting
interface ProgressValueProps {
    className?: string;
    transition?: SpringOptions;
    suffix?: string;
}

export function ProgressValue({
    className = "",
    transition = { stiffness: 80, damping: 20 },
    suffix = "%",
}: ProgressValueProps) {
    const { value, min, max } = useContext(ProgressContext);
    const percentage = ((value - min) / (max - min)) * 100;

    const springValue = useSpring(0, transition);
    const displayValue = useTransform(springValue, (latest) => Math.round(latest));
    const [displayNumber, setDisplayNumber] = useState(0);

    useEffect(() => {
        springValue.set(percentage);
    }, [percentage, springValue]);

    useEffect(() => {
        const unsubscribe = displayValue.on("change", (latest) => {
            setDisplayNumber(latest);
        });
        return () => unsubscribe();
    }, [displayValue]);

    return (
        <span className={`text-sm font-semibold text-[var(--foreground)] tabular-nums ${className}`}>
            {displayNumber}{suffix}
        </span>
    );
}

// Progress Track Component with animated indicator
interface ProgressTrackProps {
    className?: string;
    indicatorClassName?: string;
    transition?: SpringOptions;
}

export function ProgressTrack({
    className = "",
    indicatorClassName = "",
    transition = { stiffness: 100, damping: 30 },
}: ProgressTrackProps) {
    const { value, min, max } = useContext(ProgressContext);
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div
            className={`relative h-2 w-full overflow-hidden rounded-full bg-[var(--background-card)] backdrop-blur-sm ${className}`}
        >
            <motion.div
                className={`h-full rounded-full bg-gradient-to-r from-[#B32626] via-[#771111] to-[#F8FAFC] ${indicatorClassName}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{
                    type: "spring",
                    ...transition,
                }}
                style={{
                    boxShadow: "0 0 20px rgba(179, 38, 38, 0.4), 0 0 40px rgba(119, 17, 17, 0.24)",
                }}
            />
        </div>
    );
}

// Combined Progress Bar for simple usage
interface SimpleProgressProps {
    value?: number;
    label?: string;
    showValue?: boolean;
    className?: string;
}

export function SimpleProgress({
    value = 0,
    label,
    showValue = true,
    className = "",
}: SimpleProgressProps) {
    return (
        <Progress value={value} className={className}>
            <div className="flex items-center justify-between">
                {label && <ProgressLabel>{label}</ProgressLabel>}
                {showValue && <ProgressValue />}
            </div>
            <ProgressTrack />
        </Progress>
    );
}
