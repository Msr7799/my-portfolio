"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";

export default function ContactSection() {
    const { t, isRTL } = useApp();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const contactInfo = [
        { icon: <IoMailOutline className="w-5 h-5" />, label: t("email"), value: "ALROMAIHI2224@GMAIL.COM", link: "mailto:ALROMAIHI2224@GMAIL.COM" },
        { icon: <IoCallOutline className="w-5 h-5" />, label: t("phone"), value: "+973 37925259", link: "tel:+97337925259" },
        { icon: <FaWhatsapp className="w-5 h-5" />, label: t("Whatsapp"), value: "+973 37925259", link: "https://wa.me/97337925259" },
        { icon: <IoLocationOutline className="w-5 h-5" />, label: t("location"), value: isRTL ? "البحرين 🇧🇭" : "Bahrain 🇧🇭", link: "#" },
    ];

    const socialLinks = [
        { name: "GitHub", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>, url: "https://github.com/code4alromaihi" },
        { name: "LinkedIn", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, url: "https://linkedin.com/in/alromaihi" },
    ];

    return (
        <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute right-0 top-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-bl from-[#667eea]/10 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 sm:px-8" ref={ref}>
                {/* Section Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14 sm:mb-20">
                    <span className="inline-block px-6 py-2.5 rounded-full bg-[#667eea]/10 text-[#667eea] text-sm font-medium mb-6">{t("getInTouch")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{t("letsWorkTogether")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-sm sm:text-base px-4">{t("contactDesc")}</p>
                </motion.div>

                <div className={`grid lg:grid-cols-2 gap-10 sm:gap-16 ${isRTL ? "" : ""}`}>
                    {/* Left Column - Contact Info */}
                    <motion.div initial={{ opacity: 0, x: isRTL ? 50 : -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-8">
                        {/* Contact Cards */}
                        <div className="space-y-5">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.label}
                                    href={info.link}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: isRTL ? -5 : 5 }}
                                    className={`flex items-center gap-5 p-6 sm:p-7 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl hover:border-[#667eea]/50 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-2xl">{info.icon}</div>
                                    <div className={`${isRTL ? "text-right" : "text-left"}`}>
                                        <p className="text-[var(--foreground-subtle)] text-sm">{info.label}</p>
                                        <p className="text-[var(--foreground)] font-medium">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* CV Download */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
                            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 border border-[#667eea]/30 backdrop-blur-xl"
                        >
                            <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-3xl">📄</div>
                                <div className={`${isRTL ? "text-right" : "text-left"}`}>
                                    <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">{t("downloadMyCv")}</h3>
                                    <p className="text-[var(--foreground-muted)] text-sm">{t("cvDesc")}</p>
                                </div>
                            </div>
                            <motion.a
                                href="/assets/MOHAMED SAUD ALROMAIHI.pdf"
                                download
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                {t("downloadCV")}
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }} className={`flex gap-4 ${isRTL ? "justify-end" : "justify-start"}`}>
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-14 h-14 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[#667eea] hover:border-[#667eea]/50 transition-all"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="p-7 sm:p-10 rounded-2xl bg-[var(--background-glass)] border border-[var(--border-color)] backdrop-blur-xl"
                    >
                        <h3 className={`text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-xl">✉️</span>
                            {t("sendMessage")}
                        </h3>

                        {isSubmitted && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center">
                                ✓ {isRTL ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!"}
                            </motion.div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className={`block text-[var(--foreground)] font-medium mb-3 ${isRTL ? "text-right" : "text-left"}`}>{t("yourName")}</label>
                                <input
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className={`w-full px-6 py-4 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[#667eea] transition-all ${isRTL ? "text-right" : "text-left"}`}
                                    placeholder={isRTL ? "محمد الأحمد" : "John Doe"}
                                />
                            </div>
                            <div>
                                <label className={`block text-[var(--foreground)] font-medium mb-3 ${isRTL ? "text-right" : "text-left"}`}>{t("emailAddress")}</label>
                                <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className={`w-full px-6 py-4 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[#667eea] transition-all ${isRTL ? "text-right" : "text-left"}`}
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div>
                                <label className={`block text-[var(--foreground)] font-medium mb-3 ${isRTL ? "text-right" : "text-left"}`}>{t("yourMessage")}</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className={`w-full px-6 py-4 rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[#667eea] transition-all resize-none ${isRTL ? "text-right" : "text-left"}`}
                                    placeholder={t("messagePlaceholder")}
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold disabled:opacity-70 hover:shadow-lg hover:shadow-[#667eea]/30 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                        {t("sending")}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                        {t("sendBtn")}
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
