import Link from "next/link";
import { ArrowLeft, Dumbbell, Home, SearchX } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-3xl text-center">

                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-orange-500/20 bg-orange-500/10">
                        <Dumbbell
                            size={42}
                            strokeWidth={1.8}
                            className="text-orange-500"
                        />

                        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
                            <SearchX size={17} />
                        </div>
                    </div>
                </div>

                {/* 404 */}
                <p className="font-display text-8xl sm:text-9xl font-bold tracking-tight text-orange-500 leading-none">
                    404
                </p>

                {/* Heading */}
                <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-7 text-muted">
                    Looks like this workout took you somewhere unexpected.
                    The page you are looking for doesn&apos;t exist or may
                    have been moved.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

                    {/* Home */}
                    <Link
                        href="/"
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    {/* Back */}
                    <Link
                        href="/"
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-500/5"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </Link>

                </div>

                {/* Brand */}
                <div className="flex items-center justify-center tracking-tight">
                    <Link
                        href="/"
                        className="flex items-center gap-2 mt-12"
                    >
                        {/* VitaForge Logo */}
                        <Image
                            src='/logo.png'
                            alt='logo'
                            width={40}
                            height={40}
                            className="w-9 h-9"
                        />
                        <h3 className="font-display text-xl font-black text-foreground tracking-tight">
                            Vita
                            <span className="font-body text-primary">Forge</span>
                        </h3>
                    </Link>
                </div>

            </div>
        </main>
    );
}

