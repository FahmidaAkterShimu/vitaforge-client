"use client";

import {
    Button,
    Modal,
} from "@heroui/react";

import {
    Mail,
    ShieldOff,
    UserRound,
} from "lucide-react";

const DemoteTrainerModal = ({
    isOpen,
    onClose,
    trainer,
    onConfirm,
    isLoading = false,
}) => {
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
                    size="md"
                    scroll="inside"
                >
                    <Modal.Dialog>
                        <Modal.CloseTrigger />

                        {/* Header */}
                        <Modal.Header>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-danger">
                                    Trainer Privilege
                                </p>

                                <h2 className="mt-1 font-display text-2xl font-bold uppercase">
                                    Demote Trainer
                                </h2>

                                <p className="mt-1 text-sm text-muted">
                                    Confirm changing this trainer&apos;s
                                    role back to User.
                                </p>
                            </div>
                        </Modal.Header>

                        {/* Body */}
                        <Modal.Body>
                            {trainer && (
                                <div className="space-y-5">
                                    {/* Trainer Info */}
                                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-secondary p-5">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <UserRound
                                                size={21}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-semibold">
                                                {trainer.name ||
                                                    "Unknown"}
                                            </p>

                                            <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                                                <Mail
                                                    size={14}
                                                />

                                                <span className="truncate">
                                                    {
                                                        trainer.email
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Warning */}
                                    <div className="rounded-2xl border border-danger/20 bg-danger/5 p-5">
                                        <div className="flex gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                                                <ShieldOff
                                                    size={19}
                                                />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-danger">
                                                    Are you sure?
                                                </p>

                                                <p className="mt-1 text-sm leading-6 text-muted">
                                                    This will remove the trainer role from{" "}
                                                    <span className="font-semibold text-foreground">
                                                        {trainer.name ||
                                                            "this trainer"}
                                                    </span>
                                                    . They will become a regular User and will no longer have access to trainer features.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Modal.Body>

                        {/* Footer */}
                        <Modal.Footer>
                            <Button
                                variant="flat"
                                onPress={onClose}
                                isDisabled={isLoading}
                            >
                                Cancel
                            </Button>

                            <Button
                                className='bg-danger'
                                onPress={onConfirm}
                                isLoading={isLoading}
                                startContent={
                                    !isLoading && (
                                        <ShieldOff
                                            size={16}
                                        />
                                    )
                                }
                            >
                                Demote to User
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DemoteTrainerModal;