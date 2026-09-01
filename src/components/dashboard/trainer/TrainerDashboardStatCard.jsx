"use client";

import { motion } from "motion/react";

const TrainerDashboardStatCard = ({
    title,
    value,
    description,
    icon: Icon,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-primary/30"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="mb-4 font-display text-base font-semibold uppercase tracking-wider text-muted">
                        {title}
                    </p>

                    <p className="font-display text-4xl font-bold text-foreground">
                        {value}
                    </p>

                    <p className="mt-1 font-body text-xs text-muted">
                        {description}
                    </p>
                </div>

                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                </div>
            </div>
        </motion.div>
    );
};

export default TrainerDashboardStatCard;