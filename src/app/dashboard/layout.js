"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import UserDashboardSidebar from "@/components/dashboard/UserDashboardSidebar";
import { Button } from "@heroui/react";
import Logo from "@/components/shared/Logo";

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Mobile Header */}
            <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
                <Button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-secondary text-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label="Open dashboard menu"
                >
                    <Menu className="size-5" />
                </Button>

                <Logo />

                <div className="size-10" />
            </header>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <Button
                    aria-label="Close dashboard menu"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <UserDashboardSidebar
                mobileOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="min-h-screen lg:ml-72">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}