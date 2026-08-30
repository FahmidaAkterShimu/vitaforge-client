"use client";

import { motion } from "motion/react";
import {
    Target,
    HeartHandshake,
    ChartNoAxesCombined,
    Globe2,
    Smartphone,
    LockKeyhole,
} from "lucide-react";

const features = [
    {
        icon: Target,
        title: "Precision Training",
        description:
            "AI-matched classes based on your fitness level and goals for maximum results.",
    },
    {
        icon: HeartHandshake,
        title: "Elite Trainers",
        description:
            "All trainers are certified professionals with proven track records in their specialties.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Progress Tracking",
        description:
            "Visual dashboards to monitor your bookings, favorites, and fitness journey over time.",
    },
    {
        icon: Globe2,
        title: "Community Forum",
        description:
            "Connect with thousands of fitness enthusiasts, share tips, and stay motivated together.",
    },
    {
        icon: Smartphone,
        title: "Fully Responsive",
        description:
            "Seamless experience on any device — book classes from your phone, tablet, or desktop.",
    },
    {
        icon: LockKeyhole,
        title: "Secure Payments",
        description:
            "Stripe-powered checkout with bank-level security for every class booking.",
    },
];

const WhyVitaForge = () => {
    return (
        <section className="py-18 sm:py-20 bg-white dark:bg-neutral-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                    className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
                >
                    <span className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-2">
                        Why VitaForge
                    </span>

                    <h2 className="font-display font-black text-5xl text-neutral-900 dark:text-white uppercase">
                        Built Different
                    </h2>

                    <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                        We combine cutting-edge technology with world-class
                        fitness expertise to create a platform unlike anything
                        else.
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                }}
                                whileHover={{
                                    y: -4,
                                }}
                                className="group p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-orange-400 dark:hover:border-orange-500 group transition-colors duration-300"
                            >
                                {/* Icon */}
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="mb-5 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
                                >
                                    <Icon
                                        className="size-5"
                                        strokeWidth={2}
                                    />
                                </motion.div>

                                {/* Content */}
                                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-orange-500">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 font-body text-xs leading-5 text-muted sm:text-sm sm:leading-6">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyVitaForge;