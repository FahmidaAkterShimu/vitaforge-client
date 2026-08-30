"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

import ThemeToggler from "@/lib/ThemeToggler";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Logo from "./shared/Logo";

const Navbar = () => {
    // ==========================================
    // Route
    // ==========================================

    const pathName = usePathname();
    const router = useRouter();

    const isActive = (path) => pathName === path;

    // ==========================================
    // Navigation Links
    // ==========================================

    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "All Classes",
            href: "/classes",
        },
        {
            name: "Community Forum",
            href: "/community",
        },
    ];

    // ==========================================
    // User Session
    // ==========================================

    const { data: session, isPending } = authClient.useSession();

    // ==========================================
    // Latest Profile Data
    // ==========================================

    const [profile, setProfile] = useState(null);

    const userId = session?.user?.id;

    // useEffect(() => {
    //     const fetchLatestProfile = async () => {
    //         if (!userId) {
    //             setProfile(null);
    //             return;
    //         }

    //         try {
    //             const { data: tokenData } = await authClient.token();

    //             const response = await fetch(
    //                 `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${userId}`,
    //                 {
    //                     headers: {
    //                         authorization: `Bearer ${tokenData?.token}`,
    //                     },
    //                 }
    //             );

    //             const data = await response.json();

    //             if (!response.ok) {
    //                 throw new Error(
    //                     data.message || "Failed to fetch profile"
    //                 );
    //             }

    //             setProfile(data);
    //         } catch (error) {
    //             console.error("Navbar profile error:", error);
    //         }
    //     };

    //     fetchLatestProfile();
    // }, [userId]);

    // ==========================================
    // Latest User
    // ==========================================

    const user = profile || session?.user;

    // ==========================================
    // Logout
    // ==========================================

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully 👋");

                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    // ==========================================
    // Mobile Menu
    // ==========================================

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                    {/* =====================================
              Logo
          ====================================== */}

                    <Logo />

                    {/* =====================================
              Desktop Navigation
          ====================================== */}

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-body text-sm font-medium transition-colors ${isActive(link.href) ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Dashboard only when logged in */}

                        {!isPending && user && (
                            <Link
                                href="/dashboard/user"
                                className={`font-body text-sm font-medium transition-colors ${pathName.startsWith("/dashboard") ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* =====================================
              Desktop Right Side
          ====================================== */}

                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggler />

                        {/* Loading State */}

                        {isPending && (
                            <div className="h-9 w-24 animate-pulse rounded-lg bg-surface-secondary" />
                        )}

                        {/* =================================
                LOGGED IN
            ================================== */}

                        {!isPending && user && (
                            <div className="flex items-center gap-3">
                                {/* User Avatar */}

                                <Link href="/dashboard/user"
                                    className="flex items-center justify-center" aria-label="Open dashboard">
                                    <Avatar size="8" variant="soft" className="border-2 border-orange-500/30 bg-orange-500/10 text-orange-600 dark:border-orange-400/30 dark:bg-orange-500/15 dark:text-orange-400 shadow-sm transition-all duration-200 hover:border-orange-500/60 dark:hover:border-orange-500/70 hover:bg-orange-500/20 hover:shadow-md">
                                        <Avatar.Image referrerPolicy="no-referrer" alt={user?.name || "User"} src={user?.image || ""} />

                                        <Avatar.Fallback className="font-bold tracking-wide text-orange-600 dark:text-orange-400">
                                            {user?.name
                                                ? user.name.trim().slice(0, 2).toUpperCase()
                                                : "VF"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                </Link>

                                {/* User Name */}

                                <span className="hidden lg:block max-w-28 truncate font-body text-base font-semibold text-foreground">
                                    {user?.name}
                                </span>

                                {/* Logout */}

                                <Button
                                    type="button"
                                    onClick={handleLogout}
                                    className="font-body text-sm font-semibold bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                                >
                                    Logout
                                </Button>
                            </div>
                        )}

                        {/* =================================
                LOGGED OUT
            ================================== */}

                        {!isPending && !user && (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="font-body text-sm font-semibold bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* =====================================
              Mobile Right Side
          ====================================== */}

                    <div className="md:hidden flex items-center gap-2">
                        {/* Mobile User Avatar */}

                        {!isPending && user && (
                            <Link
                                href="/dashboard/user"
                                aria-label="Open dashboard"
                            >
                                <Avatar
                                    size="sm"
                                    variant="soft" className="border-2 border-orange-500/30 bg-orange-500/10 text-orange-600 dark:border-orange-400/30 dark:bg-orange-500/15 dark:text-orange-400 shadow-sm transition-all duration-200 hover:border-orange-500/60 dark:hover:border-orange-500/70 hover:bg-orange-500/20 hover:shadow-md"
                                >
                                    <Avatar.Image
                                        referrerPolicy="no-referrer"
                                        alt={user?.name || "User"}
                                        src={user?.image || ""}
                                    />

                                    <Avatar.Fallback>
                                        {user?.name
                                            ? user.name
                                                .trim()
                                                .slice(0, 2)
                                                .toUpperCase()
                                            : "VF"}
                                    </Avatar.Fallback>
                                </Avatar>
                            </Link>
                        )}

                        {/* Mobile Hamburger */}

                        <Button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary 
                            bg-background/95
                            hover:bg-surface-secondary focus:outline-none transition-colors"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                            aria-label={
                                isOpen
                                    ? "Close navigation menu"
                                    : "Open navigation menu"
                            }
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* =========================================
            Mobile Menu
        ========================================== */}

                <div
                    className={`absolute top-16 left-0 w-full bg-background shadow-md md:hidden transition-all duration-200 ease-in-out ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                    id="mobile-menu"
                >
                    <div className="border-t border-border px-4 py-4 flex flex-col gap-4">
                        {/* Theme Toggle */}

                        <div className="flex justify-center py-2">
                            <ThemeToggler />
                        </div>

                        {/* Navigation Links */}

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`font-body text-sm font-medium transition-colors ${isActive(link.href) ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Dashboard */}

                        {!isPending && user && (
                            <Link
                                href="/dashboard/user"
                                onClick={() => setIsOpen(false)}
                                className={`font-body text-sm font-medium transition-colors ${pathName.startsWith("/dashboard") ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
                            >
                                Dashboard
                            </Link>
                        )}

                        {/* =================================
                Mobile Login
            ================================== */}

                        {!isPending && !user && (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 text-center font-body text-sm font-medium text-foreground hover:text-primary border-2 border-primary rounded-lg py-3 px-5 transition-colors"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 text-center font-body text-sm font-semibold bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-hover transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* =================================
                Mobile Logout
            ================================== */}

                        {!isPending && user && (
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="w-full bg-primary hover:bg-primary-hover text-white text-center py-3 rounded-lg font-body text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                            >
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;