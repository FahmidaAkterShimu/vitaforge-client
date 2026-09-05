"use client";

import { useState } from "react";

import {
    Button,
} from "@heroui/react";

import {
    ShieldCheck,
    ShieldOff,
} from "lucide-react";

import {
    updateUserStatus,
    updateUserRole,
} from "@/lib/api/admin";

const UserActions = ({ user }) => {
    const [loading, setLoading] = useState(false);

    const handleBlockToggle = async () => {
        try {
            setLoading(true);

            const response = await updateUserStatus(
                user._id,
                !user.blocked
            );

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Action failed"
                );
            }

            window.location.reload();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleMakeAdmin = async () => {
        const confirmed = window.confirm(
            `Make ${user.name} an admin?`
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            const response = await updateUserRole(
                user._id,
                "admin"
            );

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                    "Action failed"
                );
            }

            window.location.reload();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (user.role === "admin") {
        return (
            <span className="text-xs font-semibold text-muted">
                Admin
            </span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                variant="flat"
                isDisabled={loading}
                onPress={handleBlockToggle}
                startContent={
                    user.blocked ? (
                        <ShieldCheck size={15} />
                    ) : (
                        <ShieldOff size={15} />
                    )
                }
            >
                {user.blocked
                    ? "Unblock"
                    : "Block"}
            </Button>

            {user.role !== "admin" && (
                <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    isDisabled={loading}
                    onPress={handleMakeAdmin}
                >
                    Make Admin
                </Button>
            )}
        </div>
    );
};

export default UserActions;