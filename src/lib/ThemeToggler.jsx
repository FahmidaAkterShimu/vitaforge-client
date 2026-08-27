"use client";

import { Button } from "@heroui/react";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { IoMoonSharp } from "react-icons/io5";

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();

    const mounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    if (!mounted) return null;

    const isDark = theme === "dark";

    const handleThemeChange = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <Button
            type="button"
            onClick={handleThemeChange}
            aria-label="Toggle theme"
            className="
                flex size-9 items-center justify-center
                rounded-full
                border border-border
                bg-background
                text-primary
                shadow-sm
                transition-colors duration-300
                hover:bg-muted/30
            "
        >
            {isDark ? (
                <Sun className="fill-primary size-4.5 transition-transform duration-300" />
            ) : (
                <IoMoonSharp className="size-4.5 transition-transform duration-300" />
            )}
        </Button>
    );
};

export default ThemeToggler;