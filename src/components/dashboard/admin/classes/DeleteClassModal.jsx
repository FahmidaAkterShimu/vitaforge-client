"use client";

import {
    Button,
    Modal,
} from "@heroui/react";

import {
    AlertTriangle,
    Trash2,
} from "lucide-react";

const DeleteClassModal = ({
    isOpen,
    onClose,
    onConfirm,
    className = "",
    loading = false,
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
            >
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                                    <AlertTriangle
                                        size={24}
                                    />
                                </div>

                                <div>
                                    <Modal.Heading className="font-display text-xl font-bold uppercase">
                                        Delete Class
                                    </Modal.Heading>

                                    <p className="mt-1 text-sm text-muted">
                                        This action cannot be
                                        undone.
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        <Modal.Body>
                            <p className="text-sm leading-6 text-foreground">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold">
                                    {className ||
                                        "this class"}
                                </span>
                                ?
                            </p>

                            <div className="mt-4 rounded-xl border border-danger/20 bg-danger/5 p-4">
                                <div className="flex gap-3">
                                    <Trash2
                                        size={18}
                                        className="mt-0.5 shrink-0 text-danger"
                                    />

                                    <p className="text-xs leading-5 text-muted">
                                        The class and its related
                                        information will be
                                        permanently removed from
                                        the platform.
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
                            className="bg-danger"
                                onPress={onConfirm}
                                isDisabled={loading}
                                startContent={
                                    !loading && (
                                        <Trash2
                                            size={17}
                                        />
                                    )
                                }
                            >
                                {loading
                                    ? "Deleting..."
                                    : "Delete Class"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteClassModal;