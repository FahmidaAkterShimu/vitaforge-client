import AdminProfileCard from "@/components/dashboard/admin/AdminProfileCard";
import { auth } from "@/lib/auth";
import {
    Users,
    Dumbbell,
    CalendarCheck,
    ArrowUpRight,
} from "lucide-react";
import { headers } from "next/headers";

const stats = [
    {
        title: "Total Users",
        value: "1,248",
        icon: Users,
    },
    {
        title: "Total Classes",
        value: "86",
        icon: Dumbbell,
    },
    {
        title: "Booked Classes",
        value: "3,492",
        icon: CalendarCheck,
    },
];

const AdminDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session.user;

    return (
        <div className="space-y-8">

            {/* Heading */}
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Overview
                </p>

                <h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">
                    Platform Overview
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    Monitor users, trainers, classes, bookings and community
                    activity from one place.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between">

                                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={23} />
                                </div>

                                <ArrowUpRight
                                    size={18}
                                    className="text-muted transition group-hover:text-primary"
                                />

                            </div>

                            <p className="mt-7 text-sm text-muted">
                                {stat.title}
                            </p>

                            <div className="mt-1 flex items-end gap-3">
                                <h3 className="font-display text-4xl font-bold">
                                    {stat.value}
                                </h3>
                            </div>

                        </div>
                    );
                })}
            </div>


            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                {/* Profile */}
                <AdminProfileCard user={user} />

                {/* Activity */}
                <div className="rounded-2xl border border-border bg-surface p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                Platform Activity
                            </p>

                            <h3 className="mt-1 font-display text-2xl font-bold uppercase">
                                Recent Overview
                            </h3>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">

                        <ActivityItem
                            label="Pending Trainers"
                            value="12"
                        />

                        <ActivityItem
                            label="Pending Classes"
                            value="18"
                        />

                        <ActivityItem
                            label="New Users"
                            value="64"
                        />

                    </div>
                </div>

            </div>

        </div>
    );
}

function ActivityItem({ label, value }) {
    return (
        <div className="rounded-xl bg-surface-secondary p-5">
            <p className="text-xs text-muted">
                {label}
            </p>

            <p className="mt-2 font-display text-3xl font-bold">
                {value}
            </p>
        </div>
    );
}

export default AdminDashboardPage;
