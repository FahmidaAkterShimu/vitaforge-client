"use client";

import { useState } from "react";

import { Button } from "@heroui/react";

import {
    Eye,
    RefreshCw,
    ClipboardList,
} from "lucide-react";

import {
    getTrainerApplications,
    approveTrainerApplication,
    rejectTrainerApplication,
} from "@/lib/api/admin";

import TrainerApplicationModal from "./TrainerApplicationModal";

const TrainerApplicationTable = ({
    initialApplications = [],
}) => {
    const [applications, setApplications] =
        useState(initialApplications);

    const [selectedApplication, setSelectedApplication] =
        useState(null);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [feedback, setFeedback] = useState("");

    const [loading, setLoading] = useState(false);

    const [refreshing, setRefreshing] =
        useState(false);

    // -----------------------------------------
    // Refresh applications
    // -----------------------------------------

    const loadApplications = async () => {
        try {
            setRefreshing(true);

            const response =
                await getTrainerApplications();

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Failed to load applications"
                );
            }

            setApplications(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );
        } catch (error) {
            alert(
                error?.message ||
                "Failed to load applications"
            );
        } finally {
            setRefreshing(false);
        }
    };

    // -----------------------------------------
    // Open details modal
    // -----------------------------------------

    const openApplication = (application) => {
        setSelectedApplication(application);

        setFeedback(
            application?.feedback || ""
        );

        setIsModalOpen(true);
    };

    // -----------------------------------------
    // Close modal
    // -----------------------------------------

    const closeModal = () => {
        if (loading) return;

        setIsModalOpen(false);
        setSelectedApplication(null);
        setFeedback("");
    };

    // -----------------------------------------
    // Approve trainer
    // -----------------------------------------

    const handleApprove = async () => {
        if (!selectedApplication?._id) {
            return;
        }

        try {
            setLoading(true);

            const response =
                await approveTrainerApplication(
                    selectedApplication._id
                );

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Failed to approve application"
                );
            }

            // Update UI immediately
            setApplications((current) =>
                current.map((application) =>
                    application._id ===
                        selectedApplication._id
                        ? {
                            ...application,
                            status: "Approved",
                            reviewedAt:
                                new Date().toISOString(),
                        }
                        : application
                )
            );

            closeModal();
        } catch (error) {
            alert(
                error?.message ||
                "Failed to approve application"
            );
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------
    // Reject trainer
    // -----------------------------------------

    const handleReject = async () => {
        if (!selectedApplication?._id) {
            return;
        }

        if (!feedback.trim()) {
            alert(
                "Please provide feedback before rejecting the application."
            );

            return;
        }

        try {
            setLoading(true);

            const response =
                await rejectTrainerApplication(
                    selectedApplication._id,
                    feedback.trim()
                );

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Failed to reject application"
                );
            }

            // Update UI immediately
            setApplications((current) =>
                current.map((application) =>
                    application._id ===
                        selectedApplication._id
                        ? {
                            ...application,
                            status: "Rejected",
                            feedback:
                                feedback.trim(),
                            reviewedAt:
                                new Date().toISOString(),
                        }
                        : application
                )
            );

            closeModal();
        } catch (error) {
            alert(
                error?.message ||
                "Failed to reject application"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Administration
                    </p>

                    <h1 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">
                        Applied Trainers
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                        Review trainer applications and
                        approve or reject applicants.
                    </p>
                </div>

                <Button
                    variant="flat"
                    startContent={
                        <RefreshCw size={17} />
                    }
                    onPress={loadApplications}
                    isLoading={refreshing}
                >
                    Refresh
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead className="border-b border-border bg-surface-secondary">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Applicant
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Specialty
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Experience
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
                            {applications.map(
                                (application) => {
                                    const name =
                                        application?.name ||
                                        application?.user
                                            ?.name ||
                                        "Unknown";

                                    const email =
                                        application?.email ||
                                        application?.user
                                            ?.email ||
                                        "No email";

                                    const status =
                                        application?.status ||
                                        "Pending";

                                    return (
                                        <tr
                                            key={
                                                application._id
                                            }
                                            className="transition hover:bg-surface-secondary/50"
                                        >
                                            {/* Applicant */}
                                            <td className="px-6 py-5">
                                                <p className="font-semibold">
                                                    {name}
                                                </p>

                                                <p className="mt-1 text-xs text-muted">
                                                    {email}
                                                </p>
                                            </td>

                                            {/* Specialty */}
                                            <td className="px-6 py-5 text-sm">
                                                {application?.specialty ||
                                                    "N/A"}
                                            </td>

                                            {/* Experience */}
                                            <td className="px-6 py-5 text-sm">
                                                {application?.experience ||
                                                    "N/A"}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">
                                                <StatusBadge
                                                    status={
                                                        status
                                                    }
                                                />
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-5 text-right">
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    startContent={
                                                        <Eye
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    }
                                                    onPress={() =>
                                                        openApplication(
                                                            application
                                                        )
                                                    }
                                                >
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}

                            {/* Empty State */}
                            {!applications.length && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-20 text-center"
                                    >
                                        <div className="mx-auto flex max-w-sm flex-col items-center">
                                            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <ClipboardList
                                                    size={
                                                        25
                                                    }
                                                />
                                            </div>

                                            <h3 className="mt-4 font-display text-xl font-bold uppercase">
                                                No Applications
                                            </h3>

                                            <p className="mt-1 text-sm text-muted">
                                                There are
                                                currently no
                                                trainer
                                                applications.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            <TrainerApplicationModal
                application={
                    selectedApplication
                }
                isOpen={isModalOpen}
                onClose={closeModal}
                onApprove={handleApprove}
                onReject={handleReject}
                feedback={feedback}
                setFeedback={setFeedback}
                loading={loading}
            />
        </div>
    );
};

function StatusBadge({ status }) {
    const statusClasses = {
        Pending:
            "bg-yellow-500/10 text-yellow-600",
        Approved:
            "bg-green-500/10 text-green-600",
        Rejected:
            "bg-red-500/10 text-red-600",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClasses[status] ||
                statusClasses.Pending
                }`}
        >
            {status}
        </span>
    );
}

export default TrainerApplicationTable;