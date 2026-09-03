'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Dumbbell,
    ArrowRight,
    CalendarCheck2,
} from "lucide-react";

import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";

import TrainerDashboardStatCard from "@/components/dashboard/trainer/TrainerDashboardStatCard";
import TrainerProfileCard from "@/components/dashboard/trainer/TrainerProfileCard";
import { getTrainerClasses } from "@/lib/api/classes";

const TrainerDashboardPage = () => {
    const { data: session, isPending } = authClient.useSession();

    const [totalClasses, setTotalClasses] = useState(0);
    const [classesLoading, setClassesLoading] = useState(true);

    const user = session?.user;

    useEffect(() => {
        if (!user?.id) return;

        const loadClasses = async () => {
            try {
                const classes = await getTrainerClasses(user.id);

                setTotalClasses(classes.length);
            } catch (error) {
                console.error("Failed to load trainer classes:", error);
            } finally {
                setClassesLoading(false);
            }
        };

        loadClasses();
    }, [user?.id]);

    if (isPending || classesLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="space-y-7">

            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
            >
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Overview
                        </p>

                        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl">
                            Welcome Back
                        </h1>

                        <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-muted">
                            Manage your classes, your posts and track your students from one place.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/trainer/classes"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        Manage Classes
                        <ArrowRight className="size-4" />
                    </Link>

                </div>
            </motion.section>

            {/* Statistics */}
            <section className="grid gap-4 sm:grid-cols-2 xl:w-2/3">

                <TrainerDashboardStatCard
                    title="Total Classes"
                    value={totalClasses}
                    description="Classes you've created"
                    icon={Dumbbell}
                />

                <TrainerDashboardStatCard
                    title="Total Students"
                    value={0}
                    description="Students enrolled in your classes"
                    icon={CalendarCheck2}
                />

            </section>

            {/* Main Content */}
            <section className="grid gap-5 xl:grid-cols-2">

                <TrainerProfileCard user={user} />

            </section>

        </div>
    );
};

function DashboardSkeleton() {
    return (
        <div className="space-y-7">
            <div className="space-y-3">
                <div className="h-6 w-40 animate-pulse rounded-lg bg-surface-secondary" />

                <div className="h-12 w-72 animate-pulse rounded-lg bg-surface-secondary" />

                <div className="h-4 w-full max-w-xl animate-pulse rounded-lg bg-surface-secondary" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-32 animate-pulse rounded-2xl bg-surface-secondary" />
                <div className="h-32 animate-pulse rounded-2xl bg-surface-secondary" />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
                <div className="h-64 animate-pulse rounded-2xl bg-surface-secondary" />
            </div>
        </div>
    );
}

export default TrainerDashboardPage;