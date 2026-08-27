"use client";

import { motion } from "motion/react";
import {
    Users,
    CalendarDays,
    Star,
    Award,
} from "lucide-react";

const stats = [
    {
        icon: Users,
        value: "12,000+",
        label: "Active Members",
    },
    {
        icon: Award,
        value: "48",
        label: "Expert Trainers",
    },
    {
        icon: CalendarDays,
        value: "200+",
        label: "Weekly Classes",
    },
    {
        icon: Star,
        value: "98%",
        label: "Satisfaction Rate",
    },
];

const Stats = () => {
    return (
        <section className="bg-primary py-12 sm:py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{
                                    once: true,
                                    amount: 0.3,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                                className="flex flex-col items-center text-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1 + 0.1,
                                    }}
                                    className="mb-2 flex size-10 items-center justify-center rounded-full bg-white/10"
                                >
                                    <Icon
                                        className="size-5 text-background"
                                        strokeWidth={2}
                                    />
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1 + 0.15,
                                    }}
                                    className="font-display text-3xl font-black leading-none text-background sm:text-5xl"
                                >
                                    {stat.value}
                                </motion.h3>

                                <p className="mt-1 font-body text-xs font-medium text-orange-100 dark:text-gray-700 sm:text-sm">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;