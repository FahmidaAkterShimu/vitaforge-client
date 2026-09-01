'use client'

import Link from "next/link";
import {
    ArrowRight,
    CalendarCheck2,
    CalendarDays,
    DollarSign,
    BookOpen
} from "lucide-react"

import { motion } from "motion/react";
import TrainerDashboardStatCard from "@/components/dashboard/trainer/TrainerDashboardStatCard";
import { authClient } from "@/lib/auth-client";

const dashboardData = {
    totalClasses: 0,
    upcomingClasses: 0,
    totalBookings: 0,
    totalEarnings: 0,

    upcoming: [],
    recentBookings: [],
};

const TrainerDashboardPage = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <DashboardSkeleton />;
    }

    const user = session?.user;

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
                            Manage your classes, schedules, bookings, and
                            earnings from one place.
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

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <TrainerDashboardStatCard
                    title="Total Classes"
                    value={dashboardData.totalClasses}
                    description="Classes you've created"
                    icon={BookOpen}
                />

                <TrainerDashboardStatCard
                    title="Upcoming"
                    value={dashboardData.upcomingClasses}
                    description="Classes scheduled ahead"
                    icon={CalendarDays}
                />

                <TrainerDashboardStatCard
                    title="Bookings"
                    value={dashboardData.totalBookings}
                    description="Total member bookings"
                    icon={CalendarCheck2}
                />

                <TrainerDashboardStatCard
                    title="Earnings"
                    value={`$${dashboardData.totalEarnings}`}
                    description="Total earnings"
                    icon={DollarSign}
                />

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

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="h-32 animate-pulse rounded-2xl bg-surface-secondary" />
                <div className="h-32 animate-pulse rounded-2xl bg-surface-secondary" />
                <div className="h-32 animate-pulse rounded-2xl bg-surface-secondary" /><div className="h-32 animate-pulse rounded-2xl bg-surface-secondary" />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
                <div className="h-64 animate-pulse rounded-2xl bg-surface-secondary" />
                <div className="h-64 animate-pulse rounded-2xl bg-surface-secondary" />
            </div>
        </div>
    );
}

export default TrainerDashboardPage;