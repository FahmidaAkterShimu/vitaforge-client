"use client";

import { useState } from "react";

import {
    Button,
    Input,
} from "@heroui/react";

import {
    Search,
    RefreshCw,
    UserRound,
    Mail,
    ShieldOff,
    UsersRound,
} from "lucide-react";

import {
    getAdminTrainers,
    demoteTrainer,
} from "@/lib/api/admin";

const TrainerTable = ({
    initialTrainers = [],
    initialSearch = "",
}) => {
    const [trainers, setTrainers] =
        useState(initialTrainers);

    const [search, setSearch] =
        useState(initialSearch);

    const [loading, setLoading] =
        useState(false);

    const [refreshing, setRefreshing] =
        useState(false);

    const [demotingId, setDemotingId] =
        useState(null);

    // -----------------------------------------
    // Search
    // -----------------------------------------

    const handleSearch = async () => {
        try {
            setLoading(true);

            const response =
                await getAdminTrainers(search);

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Failed to load trainers"
                );
            }

            setTrainers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

            const url = search.trim()
                ? `/dashboard/admin/trainers?search=${encodeURIComponent(
                    search.trim()
                )}`
                : "/dashboard/admin/trainers";

            window.history.replaceState(
                null,
                "",
                url
            );
        } catch (error) {
            alert(
                error?.message ||
                "Failed to search trainers"
            );
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------
    // Refresh
    // -----------------------------------------

    const handleRefresh = async () => {
        try {
            setRefreshing(true);

            const response =
                await getAdminTrainers(search);

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Failed to load trainers"
                );
            }

            setTrainers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );
        } catch (error) {
            alert(
                error?.message ||
                "Failed to refresh trainers"
            );
        } finally {
            setRefreshing(false);
        }
    };

    // -----------------------------------------
    // Demote
    // -----------------------------------------

    const handleDemote = async (trainer) => {
        const confirmed = window.confirm(
            `Are you sure you want to demote ${trainer.name || "this trainer"} to User?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDemotingId(trainer._id);

            const response =
                await demoteTrainer(
                    trainer._id
                );

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Failed to demote trainer"
                );
            }

            // Remove immediately from trainer list
            setTrainers((current) =>
                current.filter(
                    (item) =>
                        item._id !== trainer._id
                )
            );
        } catch (error) {
            alert(
                error?.message ||
                "Failed to demote trainer"
            );
        } finally {
            setDemotingId(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Administration
                </p>

                <h1 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">
                    Manage Trainers
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    View active trainers and manage
                    their trainer privileges.
                </p>
            </div>

            {/* Search / Actions */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row">
                <Input
                    value={search}
                    onValueChange={setSearch}
                    onKeyDown={(event) => {
                        if (
                            event.key ===
                            "Enter"
                        ) {
                            handleSearch();
                        }
                    }}
                    placeholder="Search by name or email..."
                    variant="bordered"
                    startContent={
                        <Search
                            size={18}
                            className="text-muted"
                        />
                    }
                    className="flex-1"
                />

                <div className="flex gap-2">
                    <Button
                        color="primary"
                        onPress={handleSearch}
                        isLoading={loading}
                        startContent={
                            !loading && (
                                <Search
                                    size={17}
                                />
                            )
                        }
                    >
                        Search
                    </Button>

                    <Button
                        variant="flat"
                        onPress={handleRefresh}
                        isLoading={refreshing}
                        startContent={
                            !refreshing && (
                                <RefreshCw
                                    size={17}
                                />
                            )
                        }
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-surface p-5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <UsersRound
                            size={21}
                        />
                    </div>

                    <p className="mt-5 text-sm text-muted">
                        Active Trainers
                    </p>

                    <p className="mt-1 font-display text-3xl font-bold">
                        {trainers.length}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead className="border-b border-border bg-surface-secondary">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Trainer
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {trainers.map(
                                (trainer) => (
                                    <tr
                                        key={
                                            trainer._id
                                        }
                                        className="transition hover:bg-surface-secondary/50"
                                    >
                                        {/* Trainer */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <UserRound
                                                        size={
                                                            18
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <p className="font-semibold">
                                                        {trainer.name ||
                                                            "Unknown"}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-muted">
                                                        Trainer
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-muted">
                                                <Mail
                                                    size={
                                                        15
                                                    }
                                                />

                                                {
                                                    trainer.email
                                                }
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                                                {
                                                    trainer.role
                                                }
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5">
                                            {trainer.blocked ? (
                                                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-500">
                                                    Blocked
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-600">
                                                    Active
                                                </span>
                                            )}
                                        </td>

                                        {/* Action */}
                                        <td className="px-6 py-5 text-right">
                                            <Button
                                                size="sm"
                                                color="danger"
                                                variant="flat"
                                                startContent={
                                                    <ShieldOff
                                                        size={
                                                            16
                                                        }
                                                    />
                                                }
                                                onPress={() =>
                                                    handleDemote(
                                                        trainer
                                                    )
                                                }
                                                isLoading={
                                                    demotingId ===
                                                    trainer._id
                                                }
                                                isDisabled={
                                                    demotingId !==
                                                    null &&
                                                    demotingId !==
                                                    trainer._id
                                                }
                                            >
                                                Demote
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            )}

                            {/* Empty */}
                            {!trainers.length && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-20 text-center"
                                    >
                                        <div className="mx-auto flex max-w-sm flex-col items-center">
                                            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <UsersRound
                                                    size={
                                                        26
                                                    }
                                                />
                                            </div>

                                            <h3 className="mt-4 font-display text-xl font-bold uppercase">
                                                No Trainers Found
                                            </h3>

                                            <p className="mt-1 text-sm text-muted">
                                                {search
                                                    ? "No trainers match your search."
                                                    : "There are currently no active trainers."}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrainerTable;