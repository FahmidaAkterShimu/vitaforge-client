"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    CalendarCheck2,
    Dumbbell,
    Heart,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Logo from "../../shared/Logo";
import { useState } from "react";

const navigation = [
    {
        label: "Overview",
        href: "/dashboard/user",
        icon: LayoutDashboard,
    },
    {
        label: "Booked Classes",
        href: "/dashboard/user/booked-classes",
        icon: CalendarCheck2,
    },
    {
        label: "Apply as Trainer",
        href: "/dashboard/user/apply-trainer",
        icon: Dumbbell,
    },
    {
        label: "Favorite Classes",
        href: "/dashboard/user/favorites",
        icon: Heart,
    },
];

const UserDashboardSidebar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                onClick={() => setSidebarOpen(true)}
                className="fixed left-4 top-4 z-50 flex size-10 items-center justify-center rounded-lg border border-border bg-surface p-2 text-foreground lg:hidden"
                aria-label="Open dashboard menu"
            >
                <Menu className="size-5" />
            </Button>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <Button
                    aria-label="Close dashboard menu"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-surface transition-transform duration-300 lg:translate-x-0
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-border px-6">
                    <Logo />

                    <Button
                        onClick={() => setSidebarOpen(false)}
                        className="flex size-9 items-center justify-center rounded-lg bg-muted/5 border border-border text-foregrond hover:border-primary hover:text-primary lg:hidden cursor-pointer"
                        aria-label="Close dashboard menu"
                    >
                        <X className="size-4 text-foreground" />
                    </Button>
                </div>

                {/* User Mini Profile */}
                <div className="mx-4 mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-3">
                        <Avatar size="lg" variant="soft" className="border-2 border-orange-500/30 bg-orange-500/10 text-orange-600 dark:border-orange-400/30 dark:bg-orange-500/15 dark:text-orange-400 shadow-sm transition-all duration-200 hover:border-orange-500/60 dark:hover:border-orange-500/70 hover:bg-orange-500/20 hover:shadow-md">
                            <Avatar.Image referrerPolicy="no-referrer" alt={user?.name || "User"} src={user?.image || ""} />

                            <Avatar.Fallback className="font-bold tracking-wide text-orange-600 dark:text-orange-400">
                                {user?.name
                                    ? user.name.trim().slice(0, 2).toUpperCase()
                                    : "VF"}
                            </Avatar.Fallback>
                        </Avatar>

                        <div className="min-w-0">
                            <p className="truncate font-body text-sm font-bold text-foreground">
                                {user?.name}
                            </p>

                            <div className="mt-1 inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-wider text-primary">
                                User
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    <div className="space-y-1.5">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            const isActive =
                                item.href === "/dashboard/user"
                                    ? pathname === "/dashboard/user"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 font-body text-sm font-semibold transition-all
                                    ${isActive
                                            ? "bg-primary text-white shadow-sm"
                                            : "text-muted hover:bg-surface-secondary hover:text-foreground"
                                        }
                                `}
                                >
                                    <Icon
                                        className={`size-4.5 shrink-0
                                        ${isActive
                                                ? "text-white"
                                                : "text-muted group-hover:text-primary"
                                            }
                                    `}
                                    />

                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Bottom Actions */}
                <div className="border-t border-border p-4">

                    <Button
                        onClick={handleLogout}
                        className="mb-3 flex w-full items-center gap-3 rounded-xl bg-primary px-3 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                        <LogOut className="size-4.5" />
                        Logout
                    </Button>

                    <Link
                        href="/"
                        onClick={() => setSidebarOpen(false)}
                        className="block rounded-lg border border-border bg-surface-secondary px-4 py-2 text-center text-sm font-medium text-muted transition hover:text-foreground"
                    >
                        Back to Website
                    </Link>

                </div>
            </aside>
        </>
    );
}

export default UserDashboardSidebar;
