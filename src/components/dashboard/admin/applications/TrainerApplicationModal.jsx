"use client";

import {
    Button,
    Modal,
    TextArea,
} from "@heroui/react";

import {
    UserRound,
    Mail,
    BriefcaseBusiness,
    Clock3,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const TrainerApplicationModal = ({
    application,
    isOpen,
    onClose,
    onApprove,
    onReject,
    feedback,
    setFeedback,
    loading,
}) => {
    if (!application) {
        return null;
    }

    const name =
        application?.name ||
        application?.user?.name ||
        "Unknown";

    const email =
        application?.email ||
        application?.user?.email ||
        "N/A";

    const specialty =
        application?.specialty || "N/A";

    const experience =
        application?.experience || "N/A";

    const createdAt = application?.createdAt
        ? new Date(
            application.createdAt
        ).toLocaleString()
        : "N/A";

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
                                    Trainer Application
                                </p>

                                <h2 className="mt-1 font-display text-2xl font-bold uppercase">
                                    Application Details
                                </h2>

                                <p className="mt-1 text-sm text-muted">
                                    Review the applicant
                                    before making a
                                    decision.
                                </p>
                            </div>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="space-y-6">
                                {/* Applicant Information */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <InfoItem
                                        icon={
                                            UserRound
                                        }
                                        label="Name"
                                        value={name}
                                    />

                                    <InfoItem
                                        icon={Mail}
                                        label="Email"
                                        value={email}
                                    />

                                    <InfoItem
                                        icon={
                                            BriefcaseBusiness
                                        }
                                        label="Specialty"
                                        value={
                                            specialty
                                        }
                                    />

                                    <InfoItem
                                        icon={Clock3}
                                        label="Experience"
                                        value={
                                            experience
                                        }
                                    />
                                </div>

                                {/* Application Date */}
                                <div className="rounded-xl border border-border bg-surface-secondary p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                                        Applied At
                                    </p>

                                    <p className="mt-2 text-sm font-semibold">
                                        {createdAt}
                                    </p>
                                </div>

                                {/* Feedback */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Feedback
                                    </label>

                                    <TextArea
                                        value={
                                            feedback
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setFeedback(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Write feedback for the applicant..."
                                        rows={5}
                                        className="w-full"
                                    />

                                    <p className="mt-2 text-xs text-muted">
                                        Feedback is
                                        required when
                                        rejecting an
                                        application.
                                    </p>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant="flat"
                                onPress={onClose}
                                isDisabled={loading}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="flat"
                                className="text-danger"
                                startContent={
                                    <XCircle
                                        size={17}
                                    />
                                }
                                onPress={onReject}
                                isDisabled={loading}
                            >
                                Reject
                            </Button>

                            <Button
                                color="primary"
                                startContent={
                                    <CheckCircle2
                                        size={17}
                                    />
                                }
                                onPress={onApprove}
                                isDisabled={loading}
                            >
                                {loading
                                    ? "Processing..."
                                    : "Approve"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

function InfoItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="rounded-xl border border-border bg-surface-secondary p-4">
            <div className="flex items-center gap-2 text-primary">
                <Icon size={17} />

                <span className="text-xs font-bold uppercase tracking-wider">
                    {label}
                </span>
            </div>

            <p className="mt-3 wrap-break-words text-sm font-semibold">
                {value}
            </p>
        </div>
    );
}

export default TrainerApplicationModal;