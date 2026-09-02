import {
    BookOpen,
    Clock3,
} from "lucide-react";

import { getTrainerClasses } from "@/lib/api/classes";
import TrainerClassTable from "@/components/dashboard/trainer/TrainerClassTable";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const MyClassesPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const trainerId = session?.user.id;

    let classes = [];
    let errorMessage = "";

    try {
        classes = await getTrainerClasses(trainerId);
    } catch (error) {
        console.error("Get trainer classes error:", error);

        errorMessage = "Failed to load your classes.";
    }

    return (
        <div className="space-y-7">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        Class Management
                    </p>

                    <h1 className="mt-2 font-display text-4xl font-bold uppercase text-foreground sm:text-5xl">
                        My Classes
                    </h1>

                    <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-muted">
                        Manage the fitness classes you have created, view
                        enrolled students, and update or remove your classes.
                    </p>
                </div>

                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="size-5" />
                </div>
            </div>

            {/* Error */}
            {errorMessage && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="font-body text-sm text-red-500">
                        {errorMessage}
                    </p>
                </div>
            )}

            {/* Table */}
            <TrainerClassTable classes={classes} />

        </div>
    );
};

export default MyClassesPage;