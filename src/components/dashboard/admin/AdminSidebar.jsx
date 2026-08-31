"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    Dumbbell,
    BookOpen,
    FileText,
    CreditCard,
    Plus,
    X,
    Menu,
} from "lucide-react";
import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import Logo from "@/components/shared/Logo";

const adminLinks = [
    {
        title: "Overview",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Manage Users",
        href: "/dashboard/admin/users",
        icon: Users,
    },
    {
        title: "Trainer Applications",
        href: "/dashboard/admin/trainer-applications",
        icon: UserCheck,
    },
    {
        title: "Manage Trainers",
        href: "/dashboard/admin/trainers",
        icon: Dumbbell,
    },
    {
        title: "Manage Classes",
        href: "/dashboard/admin/classes",
        icon: BookOpen,
    },
    {
        title: "Forum Posts",
        href: "/dashboard/admin/forum",
        icon: FileText,
    },
    {
        title: "Add Forum Post",
        href: "/dashboard/admin/add-post",
        icon: Plus,
    },
    {
        title: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: CreditCard,
    },
];

export default function AdminSidebar() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    return (
        <>
            {/* Mobile Button */}
            <Button
                onClick={() => setOpen(true)}
                className="fixed left-4 top-4 z-50 rounded-lg border border-border bg-surface p-2 text-foreground lg:hidden"
            >
                <Menu size={20} />
            </Button>

            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-72
                    border-r border-border bg-surface 
                    transition-transform duration-300
                    lg:translate-x-0 
                    ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex h-full flex-col">

                    {/* Logo */}
                    <div className="flex h-20 items-center justify-between border-b border-border px-6">
                        <Logo />

                        <Button
                            onClick={() => setOpen(false)}
                            className="flex size-9 items-center justify-center rounded-lg bg-muted/5 border border-border text-foregrond hover:border-primary hover:text-primary lg:hidden cursor-pointer"
                        >
                            <X className="size-4 text-foreground" />
                        </Button>
                    </div>

                    {/* Admin Badge */}
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
                                    Admin
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-6 flex-1 space-y-1 px-3">
                        {adminLinks.map((link) => {
                            const Icon = link.icon;

                            const isActive =
                                pathname === link.href ||
                                (
                                    link.href !== "/dashboard/admin" &&
                                    pathname.startsWith(link.href)
                                );

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`
                                        group flex items-center gap-3 rounded-xl
                                        px-4 py-3 text-sm font-semibold
                                        transition-all duration-200
                                        ${isActive
                                            ? "bg-primary text-white shadow-sm"
                                            : "text-muted hover:bg-surface-secondary hover:text-foreground"
                                        }
                                    `}
                                >
                                    <Icon className={`
                                        size-4.5
                                        shrink-0
                                        ${isActive
                                            ? "text-white"
                                            : "text-muted group-hover:text-primary"
                                        }
                                    `} />
                                    <span>{link.title}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom */}
                    <div className="border-t border-border p-4">
                        <Button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 font-body text-sm font-semibold text-white bg-primary transition-colors hover:bg-primary/10 hover:text-primary mb-3"
                        >
                            <LogOut className="size-4.5" />
                            Logout
                        </Button>

                        <Link
                            href="/"
                            className="block rounded-lg bg-surface-secondary px-4 py-2 text-center text-sm font-medium text-muted transition border border-border hover:text-foreground"
                        >
                            Back to Website
                        </Link>
                    </div>

                </div>
            </aside>
        </>
    );
}