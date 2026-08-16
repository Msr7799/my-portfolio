"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

// ---------- Types ----------
interface WeatherData {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    descriptionAr: string;
    icon: string;
    main: string;
    weatherId: number;
    visibility: number;
    pressure: number;
}

type Severity = "green" | "yellow" | "red";

// ---------- Weather description mapping (AR) ----------
const weatherDescAr: Record<string, string> = {
    "clear sky": "سماء صافية",
    "few clouds": "غيوم قليلة",
    "scattered clouds": "غيوم متفرقة",
    "broken clouds": "غيوم متقطعة",
    "overcast clouds": "غيوم ملبدة",
    "light rain": "مطر خفيف",
    "moderate rain": "مطر معتدل",
    "heavy intensity rain": "مطر غزير",
    "very heavy rain": "مطر غزير جداً",
    "extreme rain": "مطر شديد جداً",
    "light intensity drizzle": "رذاذ خفيف",
    "drizzle": "رذاذ",
    "thunderstorm": "عاصفة رعدية",
    "thunderstorm with rain": "عاصفة رعدية مع مطر",
    "thunderstorm with heavy rain": "عاصفة رعدية مع مطر غزير",
    "mist": "ضباب خفيف",
    "fog": "ضباب",
    "haze": "ضبابية",
    "dust": "غبار",
    "sand": "عاصفة رملية",
    "tornado": "إعصار",
    "squalls": "رياح عاصفية",
    "smoke": "دخان",
};

// ---------- Bilingual weather summary ----------
function getWeatherSummary(data: WeatherData, isRTL: boolean): string {
    const severity = getSeverity(data);
    if (isRTL) {
        switch (severity) {
            case "green": return "طقس جميل ومريح ☀️";
            case "yellow": return "طقس غير مستقر ⚠️";
            case "red": return "طقس سيء - توخَّ الحذر 🔴";
        }
    } else {
        switch (severity) {
            case "green": return "Nice & comfortable weather ☀️";
            case "yellow": return "Unstable weather ⚠️";
            case "red": return "Bad weather - Be cautious 🔴";
        }
    }
}

// ---------- Severity logic ----------
function getSeverity(data: WeatherData): Severity {
    const id = data.weatherId;
    const wind = data.windSpeed;
    const vis = data.visibility;

    // Red: Thunderstorms (2xx), Heavy rain (502-504, 522), Dense fog (741 with low vis), Tornado (781)
    if (id >= 200 && id < 300) return "red";
    if ([502, 503, 504, 522].includes(id)) return "red";
    if (id === 781) return "red"; // tornado
    if (id === 741 && vis < 500) return "red"; // dense fog
    if (id === 711) return "red"; // smoke
    if (vis < 300) return "red";

    // Yellow: Drizzle (3xx), light rain (5xx not heavy), Dust (761), Sand (751), Haze (721), Fog (741 with ok vis), strong wind
    if (id >= 300 && id < 400) return "yellow";
    if (id >= 500 && id < 502) return "yellow";
    if ([520, 521].includes(id)) return "yellow";
    if ([701, 711, 721, 731, 741, 751, 761, 762].includes(id)) return "yellow";
    if (wind > 10) return "yellow"; // strong wind
    if (id === 804) return "yellow"; // overcast

    // Green: everything else (clear, partly cloudy)
    return "green";
}

// ---------- Severity color ----------
function getSeverityColor(severity: Severity): string {
    switch (severity) {
        case "green": return "#22c55e";
        case "yellow": return "#eab308";
        case "red": return "#ef4444";
    }
}

function getSeverityBg(severity: Severity): string {
    switch (severity) {
        case "green": return "rgba(34, 197, 94, 0.15)";
        case "yellow": return "rgba(234, 179, 8, 0.15)";
        case "red": return "rgba(239, 68, 68, 0.15)";
    }
}

// ---------- Map OWM icon code to local animated SVG ----------
function getWeatherIcon(data: WeatherData): string {
    const id = data.weatherId;
    const isNight = data.icon.endsWith("n");
    const base = "/animated-wather-icons/";

    // Tornado
    if (id === 781) return base + "tornado.svg";

    // Thunderstorm group (2xx)
    if (id >= 200 && id < 300) {
        if (id >= 230 || (id >= 200 && id <= 202)) {
            return base + (isNight ? "thunderstorms-night-rain.svg" : "thunderstorms-day-rain.svg");
        }
        return base + (isNight ? "thunderstorms-night.svg" : "thunderstorms-day.svg");
    }

    // Drizzle (3xx)
    if (id >= 300 && id < 400) {
        return base + (isNight ? "partly-cloudy-night-drizzle.svg" : "partly-cloudy-day-drizzle.svg");
    }

    // Rain (5xx)
    if (id >= 500 && id < 600) {
        if (id >= 502) return base + "rain.svg";
        return base + (isNight ? "partly-cloudy-night-rain.svg" : "partly-cloudy-day-rain.svg");
    }

    // Atmosphere (7xx)
    if (id === 701) return base + "mist.svg"; // mist
    if (id === 711) return base + "mist.svg"; // smoke
    if (id === 721) return base + (isNight ? "partly-cloudy-night-fog.svg" : "partly-cloudy-day-fog.svg"); // haze
    if (id === 731 || id === 751 || id === 761) return base + (isNight ? "dust-night.svg" : "dust-day.svg"); // dust/sand
    if (id === 741) return base + (isNight ? "fog-night.svg" : "fog-day.svg"); // fog
    if (id === 762) return base + "dust.svg"; // volcanic ash
    if (id === 771) return base + "very-strong-wind.svg"; // squalls

    // Clear (800)
    if (id === 800) return base + (isNight ? "clear-night.svg" : "clear-day.svg");

    // Clouds
    if (id === 801) return base + (isNight ? "partly-cloudy-night.svg" : "partly-cloudy-day.svg");
    if (id === 802) return base + (isNight ? "partly-cloudy-night.svg" : "partly-cloudy-day.svg");
    if (id === 803) return base + (isNight ? "overcast-night.svg" : "overcast-day.svg");
    if (id === 804) return base + "overcast.svg";

    return base + "not-available.svg";
}

// ---------- Component ----------
export default function WeatherWidget() {
    const { isRTL } = useApp();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fetchWeather = useCallback(async () => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            if (!apiKey) {
                console.error("WeatherWidget: No API key found");
                setError(true);
                return;
            }

            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=Bahrain&appid=${apiKey}&units=metric`
            );
            if (!res.ok) {
                console.error("WeatherWidget: API returned", res.status);
                throw new Error("API error");
            }

            const data = await res.json();
            const desc = (data.weather[0].description as string).toLowerCase();
            setWeather({
                temp: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                description: data.weather[0].description,
                descriptionAr: weatherDescAr[desc] || desc,
                icon: data.weather[0].icon,
                main: data.weather[0].main,
                weatherId: data.weather[0].id,
                visibility: data.visibility,
                pressure: data.main.pressure,
            });
        } catch (err) {
            console.error("WeatherWidget: Fetch failed", err);
            setError(true);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            fetchWeather();
            const interval = setInterval(fetchWeather, 10 * 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [mounted, fetchWeather]);

    // Don't render on server
    if (!mounted) return null;
    // Don't render on error
    if (error) return null;
    // Show nothing while loading (no flash)
    if (!weather) return null;

    const severity = getSeverity(weather);
    const severityColor = getSeverityColor(severity);
    const severityBg = getSeverityBg(severity);
    const iconPath = getWeatherIcon(weather);

    return (
        <div className="relative">
            {/* Collapsed Badge */}
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl hover:border-[#B32626]/50 transition-all cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
                style={{ borderColor: `${severityColor}40` }}
            >
                {/* Weather icon */}
                <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                    <Image src={iconPath} alt="weather" fill className="object-contain" />
                </div>

                {/* Temp */}
                <span className="text-[var(--foreground)] font-bold text-xs sm:text-sm">
                    {weather.temp}°
                </span>

                {/* Location with flag */}
                <span className="hidden sm:inline text-[var(--foreground-muted)] text-[10px] sm:text-xs">
                    🇧🇭
                </span>

                {/* Severity dot */}
                <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: severityColor }}
                />
            </motion.button>

            {/* Expanded Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsExpanded(false)}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-full mt-2 z-50 w-[280px] sm:w-[320px] p-4 sm:p-5 rounded-2xl bg-[var(--background)]/95 border border-[var(--border-color)] backdrop-blur-xl shadow-2xl shadow-black/20 ${isRTL ? "right-0" : "left-0"}`}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} w-6 h-6 rounded-full bg-[var(--background-glass)] border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-xs`}
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="relative w-16 h-16">
                                    <Image src={iconPath} alt="weather" fill className="object-contain" />
                                </div>
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span className="text-2xl font-bold text-[var(--foreground)]">{weather.temp}°C</span>
                                        <span className="text-sm text-[var(--foreground-muted)]">🇧🇭 {isRTL ? "البحرين" : "Bahrain"}</span>
                                    </div>
                                    <p className="text-xs text-[var(--foreground-muted)] capitalize">
                                        {isRTL ? weather.descriptionAr : weather.description}
                                    </p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {/* Wind Speed */}
                                <div className={`p-3 rounded-xl bg-[var(--background-glass)] border border-[var(--border-color)] ${isRTL ? "text-right" : "text-left"}`}>
                                    <div className={`flex items-center gap-1.5 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <Image src="/animated-wather-icons/wind.svg" alt="wind" width={32} height={32} />
                                        <span className="text-[10px] text-[var(--foreground-subtle)]">{isRTL ? "الرياح" : "Wind"}</span>
                                    </div>
                                    <span className="text-sm font-bold text-[var(--foreground)]">
                                        {weather.windSpeed} <span className="text-[10px] font-normal">{isRTL ? "م/ث" : "m/s"}</span>
                                    </span>
                                </div>

                                {/* Humidity */}
                                <div className={`p-3 rounded-xl bg-[var(--background-glass)] border border-[var(--border-color)] ${isRTL ? "text-right" : "text-left"}`}>
                                    <div className={`flex items-center gap-1.5 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <Image src="/animated-wather-icons/raindrop.svg" alt="humidity" width={32} height={32} />
                                        <span className="text-[10px] text-[var(--foreground-subtle)]">{isRTL ? "الرطوبة" : "Humidity"}</span>
                                    </div>
                                    <span className="text-sm font-bold text-[var(--foreground)]">
                                        {weather.humidity}%
                                    </span>
                                </div>

                                {/* Feels Like */}
                                <div className={`p-3 rounded-xl bg-[var(--background-glass)] border border-[var(--border-color)] ${isRTL ? "text-right" : "text-left"}`}>
                                    <div className={`flex items-center gap-1.5 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <Image src="/animated-wather-icons/thermometer.svg" alt="feels like" width={32} height={32} />
                                        <span className="text-[10px] text-[var(--foreground-subtle)]">{isRTL ? "الإحساس" : "Feels Like"}</span>
                                    </div>
                                    <span className="text-sm font-bold text-[var(--foreground)]">
                                        {weather.feelsLike}°C
                                    </span>
                                </div>

                                {/* Visibility */}
                                <div className={`p-3 rounded-xl bg-[var(--background-glass)] border border-[var(--border-color)] ${isRTL ? "text-right" : "text-left"}`}>
                                    <div className={`flex items-center gap-1.5 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <Image src="/animated-wather-icons/mist.svg" alt="visibility" width={32} height={32} />
                                        <span className="text-[10px] text-[var(--foreground-subtle)]">{isRTL ? "الرؤية" : "Visibility"}</span>
                                    </div>
                                    <span className="text-sm font-bold text-[var(--foreground)]">
                                        {(weather.visibility / 1000).toFixed(1)} <span className="text-[10px] font-normal">{isRTL ? "كم" : "km"}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Weather Summary - Color Coded */}
                            <div
                                className={`flex items-center gap-2 p-3 rounded-xl border ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}
                                style={{
                                    backgroundColor: severityBg,
                                    borderColor: `${severityColor}30`,
                                }}
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: severityColor }}
                                />
                                <span className="text-xs font-medium" style={{ color: severityColor }}>
                                    {getWeatherSummary(weather, isRTL)}
                                </span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
