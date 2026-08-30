"use client";

import Link from "next/link";
import { ArrowRight, Dumbbell } from "lucide-react";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";

const ReadyToTransform = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <section className="relative overflow-hidden bg-neutral-950 py-20 sm:py-24 lg:py-28">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--primary)_10%,transparent)_0%,transparent_55%)]" />

            {/* Subtle Background Shape */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />

            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                {/* Small Label */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    className="mb-3"
                >
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
                        Start Your Journey
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.05,
                        ease: "easeOut",
                    }}
                    className="font-display text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl"
                >
                    Ready to
                    <br />
                    <span className="font-body text-primary">Transform?</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.15,
                    }}
                    className="mt-6 font-body text-base leading-6 text-neutral-400 sm:text-lg"
                >
                    Join thousands of members who choose VitaForge to reshape
                    their bodies and minds.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.25,
                    }}
                    className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                >
                    {!user && (
                        <Link
                            href="/register"
                            className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-body text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-primary/30"
                        >
                            <Dumbbell className="size-4" />

                            Start Your Journey

                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    )}

                    <Link
                        href="/classes"
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 font-body text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                        Browse Classes
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ReadyToTransform;