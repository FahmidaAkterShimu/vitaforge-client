"use client";

import Link from "next/link";
import {
    ArrowRight,
    CalendarCheck2,
    Dumbbell,
    Heart
} from "lucide-react";
import { motion } from "motion/react";

import UserDashboardStatCard from "@/components/dashboard/user/UserDashboardStatCard";
import UserProfileCard from "@/components/dashboard/user/UserProfileCard";
import TrainerApplicationCard from "@/components/dashboard/user/TrainerApplicationCard";
import { authClient } from "@/lib/auth-client";

const dashboardData = {
    bookedClasses: 0,
    favorites: 0,
    trainerApplication: {
        status: "not_applied",
        feedback: "",
    },
};

const UserDashboardPage = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <DashboardSkeleton />;
    }

    const user = session?.user;

    return (
        <div className="space-y-7">
            {/* =========================
                Header
            ========================== */}
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
            >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
                            <span className="size-1.5 rounded-full bg-primary" />

                            <span className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                                User Dashboard
                            </span>
                        </div>

                        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl">
                            Welcome Back
                        </h1>

                        <p className="mt-3 max-w-xl font-body text-sm leading-6 text-muted">
                            Track your classes, manage your favorites, and
                            continue building your fitness journey with
                            VitaForge.
                        </p>
                    </div>

                    <Link
                        href="/classes"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        Explore Classes
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </motion.section>

            {/* =========================
                Stats
            ========================== */}
            <section className="grid gap-4 sm:grid-cols-2">
                <UserDashboardStatCard
                    title="Booked Classes"
                    value={dashboardData.bookedClasses}
                    description="Classes you've registered for"
                    icon={CalendarCheck2}
                />

                <UserDashboardStatCard
                    title="Favorite Classes"
                    value={dashboardData.favorites}
                    description="Classes saved to your favorites"
                    icon={Heart}
                />
            </section>

            {/* =========================
                Main Grid
            ========================== */}
            <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <UserProfileCard user={user} />

                <TrainerApplicationCard
                    status={dashboardData.trainerApplication.status}
                    feedback={dashboardData.trainerApplication.feedback}
                />
            </section>

            {/* =========================
                Quick Actions
            ========================== */}
            <section>
                <div className="mb-4">
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        Quick Access
                    </p>

                    <h2 className="mt-1 font-display text-2xl font-bold uppercase text-foreground">
                        Manage Your Journey
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <QuickAction
                        href="/dashboard/user/booked-classes"
                        title="Booked Classes"
                        description="View your registered classes and schedules."
                        icon={CalendarCheck2}
                    />

                    <QuickAction
                        href="/dashboard/user/favorites"
                        title="Favorite Classes"
                        description="Manage the classes you've saved."
                        icon={Heart}
                    />

                    <QuickAction
                        href="/dashboard/user/apply-trainer"
                        title="Become a Trainer"
                        description="Apply to join VitaForge as a trainer."
                        icon={Dumbbell}
                    />
                </div>
            </section>
        </div>
    );
}

function QuickAction({
    href,
    title,
    description,
    icon: Icon,
}) {
    return (
        <Link
            href={href}
            className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                </div>

                <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>

            <h3 className="mt-5 font-display text-xl font-bold uppercase text-foreground">
                {title}
            </h3>

            <p className="mt-2 font-body text-sm leading-6 text-muted">
                {description}
            </p>
        </Link>
    );
}

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
                <div className="h-64 animate-pulse rounded-2xl bg-surface-secondary" />
            </div>
        </div>
    );
}

export default UserDashboardPage;