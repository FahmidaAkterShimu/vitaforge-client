import Link from "next/link";
import {
    ArrowRight,
} from "lucide-react";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { motion } from "motion/react";

const TrainerDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    return (
        <div>

            {/* Hero */}
            <section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
            >
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                    <div>
                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
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
            </section>

        </div>
    );
};

export default TrainerDashboardPage;