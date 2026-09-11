"use client";

import { useState } from "react";
import {
    Button,
    Input,
    ListBox,
    Select,
} from "@heroui/react";

import {
    Search,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Trash2,
    Eye,
    BookOpen,
    UserRound,
    CalendarDays,
} from "lucide-react";

import {
    getAdminClasses,
    updateAdminClassStatus,
    deleteAdminClass,
} from "@/lib/api/admin";

import ClassDetailsModal from "./ClassDetailsModal";
import DeleteClassModal from "./DeleteClassModal";

const ManageClassesTable = ({
    initialClasses = [],
    initialPagination = {},
}) => {
    const [classes, setClasses] = useState(initialClasses);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [selectedClass, setSelectedClass] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [deleteClass, setDeleteClass] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [page, setPage] = useState(initialPagination?.page || 1);
    const [pagination, setPagination] = useState(initialPagination);

    const [loading, setLoading] = useState(false);
    const [actionId, setActionId] = useState(null);

    const loadClasses = async (
        nextPage = page,
        nextSearch = search,
        nextStatus = status
    ) => {
        try {
            setLoading(true);

            const response = await getAdminClasses({
                page: nextPage,
                limit: 10,
                search: nextSearch,
                status: nextStatus,
            });

            if (response?.success) {
                setClasses(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

                setPagination(response.pagination || {});
                setPage(response.pagination?.page || nextPage);
            }
        } catch (error) {
            console.error("Failed to load classes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        loadClasses(1, search, status);
    };

    const handleStatusFilter = (value) => {
        const nextStatus = value;

        setStatus(nextStatus);
        loadClasses(1, search, nextStatus);
    };

    const handleRefresh = () => {
        loadClasses(page, search, status);
    };

    const handleStatusChange = async (id, nextStatus) => {
        try {
            setActionId(id);

            const response = await updateAdminClassStatus(
                id,
                nextStatus
            );

            if (response?.success) {
                setClasses((current) =>
                    current.map((item) =>
                        item._id === id
                            ? {
                                ...item,
                                status: nextStatus,
                            }
                            : item
                    )
                );
            } else {
                alert(
                    response?.message ||
                    "Failed to update class status"
                );
            }
        } catch (error) {
            console.error(
                "Class status update error:",
                error
            );

            alert("Something went wrong.");
        } finally {
            setActionId(null);
        }
    };

    const handleDelete = async (id) => {
        const selected = classes.find(
            (item) => item._id === id
        );

        if (!selected) return;

        setDeleteClass(selected);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteClass?._id) return;

        const id = deleteClass._id;

        try {
            setActionId(id);

            const response = await deleteAdminClass(id);

            if (response?.success) {
                setClasses((current) =>
                    current.filter(
                        (item) => item._id !== id
                    )
                );

                setPagination((current) => ({
                    ...current,
                    total: Math.max(
                        (current.total || 1) - 1,
                        0
                    ),
                }));

                setIsDeleteOpen(false);
                setDeleteClass(null);
            } else {
                alert(
                    response?.message ||
                    "Failed to delete class"
                );
            }
        } catch (error) {
            console.error(
                "Delete class error:",
                error
            );

            alert("Something went wrong.");
        } finally {
            setActionId(null);
        }
    };

    const handleCloseDelete = () => {
        if (actionId) return;

        setIsDeleteOpen(false);
        setDeleteClass(null);
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    const getStatusClass = (value) => {
        switch (value) {
            case "Approved":
                return "bg-success/10 text-success border-success/20";

            case "Rejected":
                return "bg-danger/10 text-danger border-danger/20";

            case "Pending":
            default:
                return "bg-warning/10 text-warning border-warning/20";
        }
    };

    const handleViewDetails = (classData) => {
        setSelectedClass(classData);
        setIsDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
        setSelectedClass(null);
    };

    return (
        <section className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Admin Management
                    </p>

                    <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight">
                        Manage Classes
                    </h1>

                    <p className="mt-2 text-sm text-muted">
                        Review, approve, reject and manage all
                        fitness classes.
                    </p>
                </div>

                <Button
                    variant="flat"
                    onPress={handleRefresh}
                    isDisabled={loading}
                    startContent={undefined}
                >
                    <RefreshCw
                        size={17}
                        className={
                            loading
                                ? "animate-spin"
                                : ""
                        }
                    />
                    Refresh
                </Button>
            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        placeholder="Search classes..."
                        aria-label="Search classes"
                    />

                    <Select
                        value={status}
                        onChange={(value) => {
                            handleStatusFilter(value || "all");
                        }}
                        placeholder="All Status"
                        aria-label="Filter by status"
                        variant="secondary"
                    >
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="all" textValue="All Status">
                                    All Status
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>

                                <ListBox.Item id="Pending" textValue="Pending">
                                    Pending
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>

                                <ListBox.Item id="Approved" textValue="Approved">
                                    Approved
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>

                                <ListBox.Item id="Rejected" textValue="Rejected">
                                    Rejected
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <Button
                        className="bg-primary"
                        onPress={handleSearch}
                        isDisabled={loading}
                        startContent={
                            <Search size={17} />
                        }
                    >
                        Search
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MiniStat
                    icon={BookOpen}
                    label="Total"
                    value={pagination?.total || 0}
                />

                <MiniStat
                    icon={CalendarDays}
                    label="Pending"
                    value={classes.filter(
                        (item) =>
                            item.status === "Pending"
                    ).length}
                />

                <MiniStat
                    icon={CheckCircle2}
                    label="Approved"
                    value={classes.filter(
                        (item) =>
                            item.status === "Approved"
                    ).length}
                />

                <MiniStat
                    icon={XCircle}
                    label="Rejected"
                    value={classes.filter(
                        (item) =>
                            item.status === "Rejected"
                    ).length}
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead>
                            <tr className="border-b border-border bg-surface-secondary">
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                    Class
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                    Trainer
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                    Schedule
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                    Price
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-5 py-14 text-center text-sm text-muted"
                                    >
                                        Loading classes...
                                    </td>
                                </tr>
                            ) : classes.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-5 py-14 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-secondary">
                                                <BookOpen
                                                    size={24}
                                                    className="text-muted"
                                                />
                                            </div>

                                            <h3 className="mt-4 font-display text-lg font-bold uppercase">
                                                No Classes Found
                                            </h3>

                                            <p className="mt-1 text-sm text-muted">
                                                No classes match
                                                your current
                                                filters.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                classes.map((item) => {
                                    const trainer =
                                        item.trainer ||
                                        {};

                                    const trainerName =
                                        item.trainerName ||
                                        trainer.name ||
                                        "Unknown Trainer";

                                    return (
                                        <tr
                                            key={item._id}
                                            className="border-b border-border last:border-b-0 hover:bg-surface-secondary/50"
                                        >
                                            {/* Class */}
                                            <td className="px-5 py-4">
                                                <div>
                                                    <p className="font-semibold">
                                                        {item.className ||
                                                            "Untitled Class"}
                                                    </p>

                                                    <p className="mt-1 max-w-65 truncate text-xs text-muted">
                                                        {item.description ||
                                                            "No description"}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Trainer */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                        <UserRound
                                                            size={16}
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            {
                                                                trainerName
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Schedule */}
                                            <td className="px-5 py-4">
                                                <div className="text-sm">
                                                    <div className="text-sm">
                                                        {item.schedule && typeof item.schedule === "object" ? (
                                                            <>
                                                                <p className="font-medium">
                                                                    {Array.isArray(item.schedule.days)
                                                                        ? item.schedule.days.join(", ")
                                                                        : item.schedule.days || "N/A"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-muted">
                                                                    {item.schedule.time || "Time not set"}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <p className="font-medium">
                                                                {item.schedule || item.date || "N/A"}
                                                            </p>
                                                        )}

                                                        {item.createdAt && (
                                                            <p className="mt-1 text-xs text-muted">
                                                                Created {formatDate(item.createdAt)}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {item.createdAt && (
                                                        <p className="mt-1 text-xs text-muted">
                                                            Created{" "}
                                                            {formatDate(
                                                                item.createdAt
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Price */}
                                            <td className="px-5 py-4">
                                                <span className="font-semibold">
                                                    $
                                                    {item.price ??
                                                        0}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClass(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status ||
                                                        "Pending"}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {item.status !==
                                                        "Approved" && (
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                color="success"
                                                                aria-label="Approve class"
                                                                title="Approve"
                                                                isDisabled={
                                                                    actionId ===
                                                                    item._id
                                                                }
                                                                onPress={() =>
                                                                    handleStatusChange(
                                                                        item._id,
                                                                        "Approved"
                                                                    )
                                                                }
                                                            >
                                                                <CheckCircle2
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </Button>
                                                        )}

                                                    {item.status !==
                                                        "Rejected" && (
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                color="danger"
                                                                aria-label="Reject class"
                                                                title="Reject"
                                                                isDisabled={
                                                                    actionId ===
                                                                    item._id
                                                                }
                                                                onPress={() =>
                                                                    handleStatusChange(
                                                                        item._id,
                                                                        "Rejected"
                                                                    )
                                                                }
                                                            >
                                                                <XCircle
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </Button>
                                                        )}

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="flat"
                                                        aria-label="View class"
                                                        title="View details"
                                                        onPress={() => handleViewDetails(item)}
                                                    >
                                                        <Eye size={17} />
                                                    </Button>

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="flat"
                                                        color="danger"
                                                        aria-label="Delete class"
                                                        title="Delete"
                                                        isDisabled={
                                                            actionId ===
                                                            item._id
                                                        }
                                                        onPress={() =>
                                                            handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination?.totalPages > 1 && (
                    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted">
                            Page{" "}
                            <span className="font-semibold text-foreground">
                                {pagination.page}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-foreground">
                                {pagination.totalPages}
                            </span>
                        </p>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="flat"
                                isDisabled={
                                    loading ||
                                    page <= 1
                                }
                                onPress={() =>
                                    loadClasses(
                                        page - 1,
                                        search,
                                        status
                                    )
                                }
                            >
                                Previous
                            </Button>

                            <Button
                                size="sm"
                                variant="flat"
                                isDisabled={
                                    loading ||
                                    page >=
                                    pagination.totalPages
                                }
                                onPress={() =>
                                    loadClasses(
                                        page + 1,
                                        search,
                                        status
                                    )
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <ClassDetailsModal
                classData={selectedClass}
                isOpen={isDetailsOpen}
                onClose={handleCloseDetails}
            />
            
            <DeleteClassModal
                isOpen={isDeleteOpen}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                className={deleteClass?.className}
                loading={
                    deleteClass?._id === actionId
                }
            />

        </section>
    );
};

const MiniStat = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {label}
                    </p>

                    <p className="mt-2 font-display text-3xl font-bold">
                        {value}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={21} />
                </div>
            </div>
        </div>
    );
};

export default ManageClassesTable;