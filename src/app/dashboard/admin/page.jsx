import AdminProfileCard from "@/components/dashboard/admin/AdminProfileCard";
import getUserSession from "@/lib/core/session";
import { getAdminStats } from "@/lib/api/admin";

import {
    Users,
    CalendarCheck2,
    BookOpen,
    UserRoundCheck,
    Clock3,
} from "lucide-react";

const AdminDashboardPage = async () => {
    const user = await getUserSession();

    const response = await getAdminStats();

    const stats = response?.data || {};

    const statCards = [
        {
            title: "Total Users",
            value: stats.totalUsers || 0,
            icon: Users,
        },
        {
            title: "Total Classes",
            value: stats.totalClasses || 0,
            icon: BookOpen,
        },
        {
            title: "Booked Classes",
            value: stats.totalBookedClasses || 0,
            icon: CalendarCheck2,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Overview
                </p>

                <h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">
                    Platform Overview
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    Monitor users, trainers, classes, bookings
                    and community activity from one place.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {statCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="group rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={23} />
                                </div>
                            </div>

                            <p className="mt-7 text-sm text-muted">
                                {stat.title}
                            </p>

                            <h3 className="mt-1 font-display text-4xl font-bold">
                                {stat.value.toLocaleString()}
                            </h3>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                <AdminProfileCard user={user} />

                <div className="rounded-2xl border border-border bg-surface p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Platform Activity
                    </p>

                    <h3 className="mt-1 font-display text-2xl font-bold uppercase">
                        Recent Overview
                    </h3>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <ActivityItem
                            icon={UserRoundCheck}
                            label="Pending Trainers"
                            value={stats.pendingApplications || 0}
                        />

                        <ActivityItem
                            icon={Clock3}
                            label="Pending Classes"
                            value={stats.pendingClasses || 0}
                        />

                        <ActivityItem
                            icon={Users}
                            label="Total Trainers"
                            value={stats.totalTrainers || 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

function ActivityItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="rounded-xl bg-surface-secondary p-5">
            <Icon
                size={20}
                className="text-primary"
            />

            <p className="mt-4 text-xs text-muted">
                {label}
            </p>

            <p className="mt-2 font-display text-3xl font-bold">
                {value}
            </p>
        </div>
    );
}

export default AdminDashboardPage;