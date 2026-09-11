"use client";

import { Button, Modal } from "@heroui/react";

import {
    BookOpen,
    UserRound,
    Tag,
    Gauge,
    Clock3,
    CalendarDays,
    CircleDollarSign,
    Users,
} from "lucide-react";

const ClassDetailsModal = ({
    classData,
    isOpen,
    onClose,
}) => {
    if (!classData) return null;

    const schedule = classData.schedule || {};

    const days = Array.isArray(schedule.days)
        ? schedule.days.join(", ")
        : schedule.days || "N/A";

    const time = schedule.time || "N/A";

    const className =
        classData.className ||
        classData.name ||
        classData.title ||
        "Untitled Class";

    const trainerName =
        classData.trainerName ||
        classData.trainer?.name ||
        "Unknown Trainer";

    const description =
        classData.description ||
        "No description available.";

    return (
        <Modal>
            <Modal.Backdrop
                isOpen={isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        onClose();
                    }
                }}
                variant="blur"
            >
                <Modal.Container
                    size="lg"
                    scroll="inside"
                >
                    <Modal.Dialog>
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                    Class Details
                                </p>

                                <h2 className="mt-1 font-display text-2xl font-bold uppercase">
                                    {className}
                                </h2>

                                <p className="mt-1 text-sm text-muted">
                                    Complete information about this
                                    fitness class.
                                </p>
                            </div>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="space-y-6">
                                {/* Description */}
                                <div className="rounded-2xl border border-border bg-surface-secondary p-5">
                                    <div className="flex items-center gap-2 text-primary">
                                        <BookOpen size={18} />

                                        <p className="text-xs font-bold uppercase tracking-wider">
                                            Description
                                        </p>
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-foreground">
                                        {description}
                                    </p>
                                </div>

                                {/* Information Grid */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <InfoItem
                                        icon={UserRound}
                                        label="Trainer"
                                        value={trainerName}
                                    />

                                    <InfoItem
                                        icon={Tag}
                                        label="Category"
                                        value={
                                            classData.category ||
                                            "N/A"
                                        }
                                    />

                                    <InfoItem
                                        icon={Gauge}
                                        label="Difficulty"
                                        value={
                                            classData.difficulty ||
                                            "N/A"
                                        }
                                    />

                                    <InfoItem
                                        icon={Clock3}
                                        label="Duration"
                                        value={
                                            classData.duration
                                                ? `${classData.duration} minutes`
                                                : "N/A"
                                        }
                                    />

                                    <InfoItem
                                        icon={CalendarDays}
                                        label="Days"
                                        value={days}
                                    />

                                    <InfoItem
                                        icon={Clock3}
                                        label="Time"
                                        value={time}
                                    />

                                    <InfoItem
                                        icon={CircleDollarSign}
                                        label="Price"
                                        value={`$${classData.price ?? 0
                                            }`}
                                    />

                                    <InfoItem
                                        icon={Users}
                                        label="Students"
                                        value={
                                            classData.studentsCount ??
                                            0
                                        }
                                    />
                                </div>

                                {/* Status */}
                                <div className="rounded-2xl border border-border bg-surface-secondary p-5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                                        Status
                                    </p>

                                    <span
                                        className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${classData.status ===
                                            "Approved"
                                            ? "border-success/20 bg-success/10 text-success"
                                            : classData.status ===
                                                "Rejected"
                                                ? "border-danger/20 bg-danger/10 text-danger"
                                                : "border-warning/20 bg-warning/10 text-warning"
                                            }`}
                                    >
                                        {classData.status ||
                                            "Pending"}
                                    </span>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant="flat"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

const InfoItem = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-primary">
                <Icon size={17} />

                <span className="text-xs font-bold uppercase tracking-wider">
                    {label}
                </span>
            </div>

            <p className="mt-3 wrap-break-word text-sm font-semibold">
                {value}
            </p>
        </div>
    );
};

export default ClassDetailsModal;