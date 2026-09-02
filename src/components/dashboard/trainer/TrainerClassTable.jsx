"use client";

import { useState } from "react";
import {
    CalendarDays,
    Users,
    Pencil,
    Trash2,
    TriangleAlert,
} from "lucide-react";
import { toast } from "react-toastify";

import UpdateClassModal from "@/components/dashboard/trainer/UpdateClassModal";
import ViewStudentsModal from "@/components/dashboard/trainer/ViewStudentsModal";
import { deleteClass } from "@/lib/actions/classes";
import { getClassStudents } from "@/lib/api/classes";

import { AlertDialog, Button, Table } from "@heroui/react";
import Image from "next/image";

const TrainerClassTable = ({ classes = [] }) => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [studentsClass, setStudentsClass] = useState(null);

    const [loadingStudents, setLoadingStudents] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteClassItem, setDeleteClassItem] = useState(null);

    const handleViewStudents = async (classItem) => {
        try {
            setStudentsClass(classItem);
            setStudents([]);
            setLoadingStudents(true);

            const response = await getClassStudents(classItem._id);

            if (!response?.success) {
                throw new Error(
                    response?.message || "Failed to load students."
                );
            }

            setStudents(response.data || []);
        } catch (error) {
            console.error("View students error:", error);

            toast.error(
                error?.message || "Failed to load students."
            );

            setStudentsClass(null);
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleDelete = async (classItem) => {
        try {
            setDeletingId(classItem._id);

            const response = await deleteClass(classItem._id);

            if (!response?.success) {
                throw new Error(
                    response?.message || "Failed to delete class."
                );
            }

            toast.success("Class deleted successfully.");

            setDeleteClassItem(null);

            window.location.reload();
        } catch (error) {
            console.error("Delete class error:", error);

            toast.error(
                error?.message || "Failed to delete class."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const formatSchedule = (schedule) => {
        if (!schedule) {
            return "Not specified";
        }

        const days = Array.isArray(schedule.days)
            ? schedule.days
            : [];

        const time = schedule.time || "";

        if (!days.length && !time) {
            return "Not specified";
        }

        return `${days.map((day) => day.slice(0, 3)).join(", ")}${time ? ` • ${time}` : ""
            }`;
    };

    if (!classes.length) {
        return (
            <div className="rounded-2xl border border-border bg-surface px-5 py-16 text-center shadow-sm">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarDays className="size-6" />
                </div>

                <h2 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
                    No Classes Yet
                </h2>

                <p className="mx-auto mt-2 max-w-md font-body text-sm leading-6 text-muted">
                    You haven&apos;t created any classes yet. Create your first
                    fitness class and submit it for admin approval.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                <Table
                    variant="secondary"
                    className="w-full min-w-0"
                >
                    <Table.Content
                        aria-label="Trainer classes"
                        className="w-full table-fixed"
                    >
                        {/* Header */}
                        <Table.Header className="border-b border-border bg-surface-secondary">
                            <Table.Column
                                isRowHeader
                                className="w-[42%] px-3 py-4 text-left font-body text-[10px] font-bold uppercase tracking-[0.08em] text-muted sm:w-[40%] sm:px-5"
                            >
                                Class
                            </Table.Column>

                            <Table.Column
                                className="hidden w-[25%] px-5 py-4 text-left font-body text-[10px] font-bold uppercase tracking-[0.08em] text-muted sm:table-cell"
                            >
                                Schedule
                            </Table.Column>

                            <Table.Column
                                className="w-[18%] px-2 py-4 text-left font-body text-[10px] font-bold uppercase tracking-[0.08em] text-muted sm:w-[15%] sm:px-5"
                            >
                                Status
                            </Table.Column>

                            <Table.Column
                                className="w-[40%] px-2 py-4 text-right font-body text-[10px] font-bold uppercase tracking-[0.08em] text-muted sm:w-[20%] sm:px-5"
                            >
                                Actions
                            </Table.Column>
                        </Table.Header>

                        {/* Body */}
                        <Table.Body className="divide-y divide-border">
                            {classes.map((item) => {
                                const isApproved =
                                    item.status?.toLowerCase() === "approved";

                                const isDeleting =
                                    deletingId === item._id;

                                // Supports number, bookingCount, totalBookings,
                                // or bookings array.
                                const bookingCount = Array.isArray(item.bookings)
                                    ? item.bookings.length
                                    : item.bookings ??
                                    item.bookingCount ??
                                    item.totalBookings ??
                                    0;

                                return (
                                    <Table.Row
                                        key={item._id}
                                        id={item._id}
                                        className="group transition-colors hover:bg-surface-secondary/60"
                                    >
                                        {/* CLASS */}
                                        <Table.Cell className="max-w-0 px-3 py-4 sm:px-5">
                                            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
                                                {/* Image */}
                                                <Image
                                                    src={item.image}
                                                    alt={item.className}
                                                    width={48}
                                                    height={48}
                                                    className="size-10 shrink-0 rounded-xl border border-border object-cover sm:size-12"
                                                />

                                                {/* Class info */}
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-body text-xs font-bold text-foreground sm:text-sm">
                                                        {item.className}
                                                    </p>

                                                    <div className="mt-1 flex min-w-0 flex-wrap items-center gap-1.5 text-[10px] text-muted sm:text-[11px]">
                                                        <span className="whitespace-nowrap">
                                                            {item.duration} min
                                                        </span>

                                                        <span className="whitespace-nowrap">
                                                            <span className="hidden text-border sm:inline">• </span>
                                                            {bookingCount} bookings
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 font-display text-sm font-bold text-primary sm:text-base">
                                                        ${Number(item.price).toFixed(2)}
                                                    </p>

                                                    {/* Mobile schedule */}
                                                    <div className="mt-1 flex min-w-0 items-center gap-1 text-[10px] text-muted sm:hidden">
                                                        <CalendarDays className="size-3 shrink-0 text-primary" />
                                                        <span className="truncate">
                                                            {formatSchedule(item.schedule)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* SCHEDULE */}
                                        <Table.Cell className="hidden px-5 py-4 sm:table-cell">
                                            <div className="flex min-w-0 items-center gap-2">
                                                <CalendarDays className="size-4 shrink-0 text-primary" />

                                                <span className="truncate font-body text-xs leading-5 text-muted">
                                                    {formatSchedule(item.schedule)}
                                                </span>
                                            </div>
                                        </Table.Cell>


                                        {/* STATUS */}
                                        <Table.Cell className="px-2 py-4 sm:px-5">
                                            <StatusBadge status={item.status} />
                                        </Table.Cell>


                                        {/* ACTIONS */}
                                        <Table.Cell className="px-2 py-4 sm:px-5">
                                            <div className="flex items-center justify-end gap-1 sm:gap-1.5">
                                                {/* Students */}
                                                <Button
                                                    isDisabled={!isApproved}
                                                    onPress={() => handleViewStudents(item)}
                                                    size="sm"
                                                    variant="ghost"
                                                    isIconOnly
                                                    aria-label="View students"
                                                    className={`size-8 min-w-8 rounded-lg sm:size-9 sm:min-w-9 ${isApproved
                                                        ? "text-foreground hover:bg-primary/10 hover:text-primary"
                                                        : "cursor-not-allowed text-muted opacity-50"
                                                        }`}
                                                >
                                                    <Users className="size-4.5 sm:size-5" />
                                                </Button>

                                                {/* Edit */}
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="ghost"
                                                    onPress={() => setSelectedClass(item)}
                                                    aria-label="Update class"
                                                    className="size-8 min-w-8 rounded-lg text-muted hover:bg-primary/10 hover:text-primary sm:size-9 sm:min-w-9"
                                                >
                                                    <Pencil className="size-3.5 sm:size-4" />
                                                </Button>

                                                {/* Delete */}
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="ghost"
                                                    isDisabled={isDeleting}
                                                    isPending={isDeleting}
                                                    onPress={() => setDeleteClassItem(item)}
                                                    aria-label="Delete class"
                                                    className="size-8 min-w-8 rounded-lg text-danger hover:bg-danger/10 sm:size-9 sm:min-w-9"
                                                >
                                                    {!isDeleting && (
                                                        <Trash2 className="size-3.5 sm:size-4" />
                                                    )}
                                                </Button>
                                            </div>

                                            {!isApproved && (
                                                <p className="mt-1 text-right text-[9px] text-muted">
                                                    Awaiting approval
                                                </p>
                                            )}
                                        </Table.Cell>

                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table>
            </div>

            {/* Update Modal */}
            {selectedClass && (
                <UpdateClassModal
                    key={selectedClass._id}
                    classItem={selectedClass}
                    onClose={() => setSelectedClass(null)}
                />
            )}

            {/* Students Modal */}
            {studentsClass && (
                <ViewStudentsModal
                    className={studentsClass.className}
                    students={students}
                    loading={loadingStudents}
                    onClose={() => {
                        setStudentsClass(null);
                        setStudents([]);
                    }}
                />
            )}

            {deleteClassItem && (
                <AlertDialog
                    isOpen={Boolean(deleteClassItem)}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            setDeleteClassItem(null);
                        }
                    }}
                >
                    <AlertDialog.Backdrop variant="blur">
                        <AlertDialog.Container placement="center" size="sm">
                            <AlertDialog.Dialog>
                                <AlertDialog.Header>
                                    <AlertDialog.Icon status="danger">
                                        <TriangleAlert className="size-5" />
                                    </AlertDialog.Icon>

                                    <AlertDialog.Heading>
                                        Delete Class?
                                    </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body>
                                    Are you sure you want to delete{" "}
                                    <span className="font-semibold text-foreground">
                                        {deleteClassItem.className}
                                    </span>
                                    ? This action cannot be undone.
                                </AlertDialog.Body>

                                <AlertDialog.Footer>
                                    <Button
                                        variant="flat"
                                        slot="close"
                                        isDisabled={
                                            deletingId === deleteClassItem._id
                                        }
                                        className="hover:text-primary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        className="bg-primary/80 hover:bg-primary/30 text-white"
                                        color="danger"
                                        onPress={() =>
                                            handleDelete(deleteClassItem)
                                        }
                                        isDisabled={
                                            deletingId === deleteClassItem._id
                                        }
                                        isPending={
                                            deletingId === deleteClassItem._id
                                        }
                                    >
                                        {!(
                                            deletingId === deleteClassItem._id
                                        ) && (
                                                <Trash2 className="size-4" />
                                            )}

                                        Delete Class
                                    </Button>
                                </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                        </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                </AlertDialog>
            )}
        </>
    );
};

const StatusBadge = ({ status }) => {
    const normalizedStatus = status?.toLowerCase();

    const statusConfig = {
        pending: {
            label: "Pending",
            className:
                "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        },
        approved: {
            label: "Approved",
            className:
                "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
        },
        rejected: {
            label: "Rejected",
            className:
                "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
        },
    };

    const config = statusConfig[normalizedStatus] || {
        label: "Unknown",
        className:
            "border-border bg-surface-secondary text-muted",
    };

    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider ${config.className}`}
        >
            {config.label}
        </span>
    );
};

export default TrainerClassTable;
