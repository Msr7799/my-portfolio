"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook to detect if device is mobile or has reduced motion preference
 * Returns optimized animation settings based on device capabilities
 */
export function useOptimizedAnimations() {
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

    useEffect(() => {
        // Check for mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };

        // Check for reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        // Check for low power device (heuristic: mobile + low memory)
        const checkLowPower = () => {
            const nav = navigator as Navigator & { deviceMemory?: number };
            const lowMemory = nav.deviceMemory ? nav.deviceMemory < 4 : false;
            const mobileDevice = window.innerWidth < 768;
            setIsLowPowerDevice(lowMemory || (mobileDevice && window.innerWidth < 480));
        };

        checkMobile();
        checkLowPower();

        // Listen for resize
        window.addEventListener("resize", checkMobile);
        mediaQuery.addEventListener("change", (e) => setPrefersReducedMotion(e.matches));

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // Optimized animation settings
    const getAnimationSettings = useCallback(() => {
        if (prefersReducedMotion) {
            return {
                duration: 0,
                staggerChildren: 0,
                shouldAnimate: false,
                transition: { duration: 0 },
            };
        }

        if (isLowPowerDevice) {
            return {
                duration: 0.2,
                staggerChildren: 0.02,
                shouldAnimate: true,
                transition: { duration: 0.2, ease: "easeOut" },
            };
        }

        if (isMobile) {
            return {
                duration: 0.3,
                staggerChildren: 0.03,
                shouldAnimate: true,
                transition: { duration: 0.3, ease: "easeOut" },
            };
        }

        // Desktop - full animations
        return {
            duration: 0.6,
            staggerChildren: 0.05,
            shouldAnimate: true,
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
        };
    }, [isMobile, prefersReducedMotion, isLowPowerDevice]);

    return {
        isMobile,
        prefersReducedMotion,
        isLowPowerDevice,
        ...getAnimationSettings(),
    };
}

/**
 * Hook to lazy load heavy components when they come into view
 */
export function useLazyLoad(threshold = 0.1) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [ref, setRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: "100px" }
        );

        observer.observe(ref);

        return () => observer.disconnect();
    }, [ref, threshold]);

    return { shouldLoad, setRef };
}

/**
 * Optimized spring configurations for different device types
 */
export const optimizedSpringConfigs = {
    // Desktop - smooth and elegant
    desktop: {
        stiffness: 100,
        damping: 30,
        mass: 1,
    },
    // Mobile - faster and snappier
    mobile: {
        stiffness: 200,
        damping: 40,
        mass: 0.8,
    },
    // Low power - minimal spring
    lowPower: {
        stiffness: 300,
        damping: 50,
        mass: 0.5,
    },
};

/**
 * Will-change optimization helper
 * Use sparingly - too many will-change can hurt performance
 */
export const performanceStyles = {
    // For elements that will transform
    willTransform: {
        willChange: "transform",
        transform: "translateZ(0)", // Force GPU layer
    } as React.CSSProperties,
    
    // For elements that will change opacity
    willOpacity: {
        willChange: "opacity",
    } as React.CSSProperties,
    
    // For scroll containers
    smoothScroll: {
        scrollBehavior: "smooth" as const,
        WebkitOverflowScrolling: "touch" as const,
    } as React.CSSProperties,
    
    // Hardware acceleration
    gpuAccelerated: {
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden" as const,
    } as React.CSSProperties,
};

/**
 * Debounce hook for scroll/resize handlers
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Throttle function for high-frequency events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
): T {
    let inThrottle: boolean;
    return ((...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    }) as T;
}
