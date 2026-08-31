"use client";

import { Bell } from "lucide-react";
import { Button } from "@heroui/react";
import ThemeToggler from "@/lib/ThemeToggler";

export default function AdminHeader() {
    return (
        <header className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background/90 px-4 pl-16 sm:pl-18  backdrop-blur-md lg:left-72 sm:px-6 lg:px-8">

            <div>
                <p className="font-display text-xs font-semibold tracking-widest text-foreground">
                    Vita<span className="font-body text-primary">Forge</span>
                </p>

                <h1 className="font-display text-2xl font-bold uppercase sm:text-3xl">
                    Admin Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">

                <Button className="relative rounded-full border border-border bg-primary/20 p-3 transition hover:border-primary/40">
                    <Bell
                        size={18}
                        className="text-foreground"
                    />

                    <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" />
                </Button>

                <ThemeToggler />

            </div>

        </header>
    );
}