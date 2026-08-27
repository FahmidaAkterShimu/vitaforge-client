"use client";

import Image from "next/image";
import { Users, Award, CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@heroui/react";
import Link from "next/link";

const Banner = () => {
    const stats = [
        {
            icon: Users,
            number: "12,000+",
            label: "Active Members",
        },
        {
            icon: Award,
            number: "48+",
            label: "Expert Trainers",
        },
        {
            icon: CalendarDays,
            number: "200+",
            label: "Classes Weekly",
        },
    ];

    return (
        <section className="relative min-h-[93vh] overflow-hidden bg-neutral-950">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/banner.avif"
                    alt="Fitness training"
                    fill
                    priority
                    className="object-cover object-center opacity-30"
                />
                {/* Left Dark Gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/80 to-transparent" />

                {/* Bottom Fade */}
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent" />
            </div>


            {/* Orange Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.45, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/3 left-1/2 w-96 h-96 bg-orange-500/40 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 mx-auto flex min-h-162.5 max-w-7xl items-center px-5 py-28 sm:px-8 lg:min-h-175 lg:px-10">
                <div className="max-w-2xl">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />

                        <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-orange-400 sm:text-xs">
                            Premium Fitness Platform
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.1,
                            ease: "easeOut",
                        }}
                        className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-none mb-6 uppercase"
                    >
                        Forge Your
                        <br />
                        <span className="font-body text-orange-500">
                            Best Self.
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.25,
                        }}
                        className="text-neutral-300 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
                    >
                        Discover elite fitness classes, connect with world-class
                        trainers, and join a community that pushes limits together.
                        Your transformation starts now.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.35,
                        }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Link href={'/classes'}>
                            <Button
                                className="font-body font group flex items-center px-8 py-6.5 bg-orange-500 text-white font-bold text-lg rounded-2xl hover:bg-orange-600 transition-all duration-200 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
                            >
                                Explore Classes
                            </Button>
                        </Link>

                        <Link href={'/register'}>
                            <Button
                                type="button"
                                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-6 text-lg font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-orange-500/50 hover:bg-white/20"
                            >
                                Join Free
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.5,
                        }}
                        className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 sm:gap-x-14"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.55 + index * 0.1,
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className="size-5 text-orange-500" />

                                        <span className="font-display text-xl font-black text-orange-500 sm:text-3xl">
                                            {stat.number}
                                        </span>
                                    </div>

                                    <p className="mt-0.5 text-[9px] tracking-wide text-neutral-400 sm:text-xs">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Banner;