"use client";

import { Button } from "@heroui/react";
import { AlertTriangle, ShieldCheck, X } from "lucide-react";

const MakeAdminModal = ({
    isOpen,
    onClose,
    onConfirm,
    userName,
    loading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !loading) {
                    onClose();
                }
            }}
        >
            <div
                className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="make-admin-title"
            >
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <ShieldCheck size={23} />
                        </div>

                        <div>
                            <h2
                                id="make-admin-title"
                                className="font-display text-xl font-bold uppercase text-foreground"
                            >
                                Make Admin
                            </h2>

                            <p className="text-sm text-muted">
                                Change user role
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-full p-2 text-muted transition hover:bg-surface-secondary hover:text-foreground disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="mt-6">
                    <p className="text-sm leading-6 text-foreground">
                        Are you sure you want to make{" "}
                        <span className="font-semibold">
                            {userName || "this user"}
                        </span>{" "}
                        an admin?
                    </p>

                    <div className="mt-4 flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <AlertTriangle
                            size={18}
                            className="mt-0.5 shrink-0 text-primary"
                        />

                        <p className="text-xs leading-5 text-muted">
                            Admin users can manage users, trainers, classes,
                            forum posts, and other administrative features.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="flat"
                        onPress={onClose}
                        isDisabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="bg-primary"
                        onPress={onConfirm}
                        isDisabled={loading}
                    >
                        {loading ? "Updating..." : "Make Admin"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MakeAdminModal;