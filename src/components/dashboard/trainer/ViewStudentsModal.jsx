"use client";

import {
    Loader2,
    Mail,
    UserRound,
    Users,
    X,
} from "lucide-react";

const ViewStudentsModal = ({
    className,
    students = [],
    loading = false,
    onClose,
}) => {
    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
                    <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Users className="size-5" />
                        </div>

                        <div>
                            <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                                Enrolled Students
                            </p>

                            <h2 className="mt-1 max-w-70 truncate font-display text-xl font-bold uppercase text-foreground">
                                {className}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-5 sm:p-6">

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="size-7 animate-spin text-primary" />

                            <p className="mt-3 font-body text-sm text-muted">
                                Loading students...
                            </p>
                        </div>
                    ) : students.length > 0 ? (
                        <div className="space-y-2">
                            {students.map((student, index) => (
                                <div
                                    key={
                                        student._id ||
                                        student.userId ||
                                        index
                                    }
                                    className="rounded-xl border border-border bg-surface-secondary p-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <UserRound className="size-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-body text-sm font-bold text-foreground">
                                                {student.name ||
                                                    "VitaForge User"}
                                            </p>

                                            <div className="mt-1 flex items-center gap-1.5">
                                                <Mail className="size-3.5 text-muted" />

                                                <p className="truncate font-body text-xs text-muted">
                                                    {student.email ||
                                                        "No email"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Users className="size-6" />
                            </div>

                            <h3 className="mt-4 font-display text-xl font-bold uppercase text-foreground">
                                No Students Yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm font-body text-sm leading-6 text-muted">
                                No users have booked this class yet.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-5 py-4 sm:px-6">
                    <p className="font-body text-xs text-muted">
                        Total students:{" "}
                        <span className="font-bold text-foreground">
                            {students.length}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewStudentsModal;