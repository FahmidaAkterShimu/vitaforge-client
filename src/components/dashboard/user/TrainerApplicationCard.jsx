"use client";

import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

const TrainerApplicationCard = ({
    status = "not_applied",
    feedback = "",
}) => {
    const statusConfig = {
        not_applied: {
            label: "Not Applied",
            icon: Clock3,
            description:
                "You haven't submitted a trainer application yet.",
        },

        Pending: {
            label: "Pending",
            icon: Clock3,
            description:
                "Your application is currently under review.",
        },

        Approved: {
            label: "Approved",
            icon: CheckCircle2,
            description:
                "Congratulations! Your trainer application has been approved.",
        },

        Rejected: {
            label: "Rejected",
            icon: XCircle,
            description:
                "Your trainer application was rejected.",
        },
    };

    const current =
        statusConfig[status] ||
        statusConfig.not_applied;

    const Icon = current.icon;

    return (
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        Trainer Application
                    </p>

                    <h2 className="mt-2 font-display text-2xl font-bold uppercase text-foreground">
                        {current.label}
                    </h2>
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                </div>
            </div>

            <p className="mt-4 font-body text-sm leading-6 text-muted">
                {current.description}
            </p>

            {feedback && status === "Rejected" && (
                <div className="mt-4 rounded-xl bg-surface-secondary p-4">
                    <p className="font-body text-xs font-bold uppercase tracking-wider text-foreground">
                        Admin Feedback
                    </p>

                    <p className="mt-2 font-body text-sm leading-6 text-muted">
                        {feedback}
                    </p>
                </div>
            )}

            {status === "not_applied" && (
                <Link
                    href="/dashboard/user/apply-trainer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                    Apply as Trainer
                    <ArrowRight className="size-4" />
                </Link>
            )}

            {status === "Rejected" && (
                <Link
                    href="/dashboard/user/apply-trainer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                    Apply Again
                    <ArrowRight className="size-4" />
                </Link>
            )}
        </div>
    );
};

export default TrainerApplicationCard;