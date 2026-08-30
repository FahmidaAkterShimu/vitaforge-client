"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    BarChart3,
    CalendarCheck2,
    Dumbbell,
    Heart,
    LogOut,
    UserRound,
    X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Logo from "../shared/Logo";

const navigation = [
    {
        label: "Overview",
        href: "/dashboard/user",
        icon: BarChart3,
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

const UserDashboardSidebar = ({
    mobileOpen,
    onClose,
}) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const pathname = usePathname();
    const router = useRouter();

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
        <aside
            className={`
                fixed
                inset-y-0
                left-0
                z-50
                flex
                w-72
                flex-col
                border-r
                border-border
                bg-surface
                transition-transform
                duration-300
                lg:translate-x-0
                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            {/* Logo */}
            <div className="flex h-20 items-center justify-between border-b border-border px-6">
                <Logo />

                <Button
                    onClick={onClose}
                    className="flex size-9 items-center justify-center rounded-lg bg-muted/5 border border-border text-foregrond hover:border-primary hover:text-primary lg:hidden cursor-pointer"
                    aria-label="Close dashboard menu"
                >
                    <X className="size-4 text-foreground" />
                </Button>
            </div>

            {/* User Mini Profile */}
            <div className="mx-4 mt-5 rounded-xl border border-border bg-surface-secondary p-4">
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
                <p className="mb-3 px-3 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                    Dashboard
                </p>

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
                                onClick={onClose}
                                className={`
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    font-body
                                    text-sm
                                    font-semibold
                                    transition-all
                                    ${isActive
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-muted hover:bg-surface-secondary hover:text-foreground"
                                    }
                                `}
                            >
                                <Icon
                                    className={`
                                        size-4.5
                                        shrink-0
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

                {/* Account */}
                <div className="mt-8">
                    <p className="mb-3 px-3 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                        Account
                    </p>

                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 font-body text-sm font-semibold text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
                    >
                        <UserRound className="size-4.5" />
                        Back to Website
                    </Link>
                </div>
            </nav>

            {/* Logout */}
            <div className="border-t border-border p-4">
                <Button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 font-body text-sm font-semibold text-white bg-primary transition-colors hover:bg-primary/10 hover:text-primary"
                >
                    <LogOut className="size-4.5" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}

export default UserDashboardSidebar;
