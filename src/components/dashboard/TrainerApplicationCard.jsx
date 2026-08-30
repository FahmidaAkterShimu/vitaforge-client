import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    Dumbbell,
} from "lucide-react";

const TrainerApplicationCard = ({
    status = "not_applied",
    feedback = "",
}) => {
    const statusConfig = {
        pending: {
            label: "Pending Review",
            icon: Clock3,
            className:
                "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
            description:
                "Your trainer application is currently being reviewed by the admin.",
        },

        rejected: {
            label: "Application Rejected",
            icon: AlertCircle,
            className:
                "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
            description:
                "Your application was not approved at this time.",
        },

        not_applied: {
            label: "Not Applied",
            icon: Dumbbell,
            className:
                "border-border bg-surface-secondary text-muted",
            description:
                "You haven't submitted a trainer application yet.",
        },
    };

    const config = statusConfig[status] || statusConfig.not_applied;
    const Icon = config.icon;

    return (
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        Trainer Journey
                    </p>

                    <h2 className="mt-1 font-display text-2xl font-bold uppercase text-foreground">
                        Application Status
                    </h2>
                </div>

                <Icon className="size-5 shrink-0 text-primary" />
            </div>

            <div className={`mt-5 rounded-xl border p-4 ${config.className}`}>
                <div className="flex items-center gap-2">
                    <Icon className="size-4" />

                    <span className="font-body text-xs font-bold uppercase tracking-wider">
                        {config.label}
                    </span>
                </div>

                <p className="mt-2 font-body text-sm leading-6">
                    {config.description}
                </p>
            </div>

            {status === "rejected" && feedback && (
                <div className="mt-4 rounded-xl border border-border bg-surface-secondary p-4">
                    <p className="font-body text-[10px] font-bold uppercase tracking-wider text-muted">
                        Admin Feedback
                    </p>

                    <p className="mt-2 font-body text-sm leading-6 text-foreground">
                        {feedback}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TrainerApplicationCard;
