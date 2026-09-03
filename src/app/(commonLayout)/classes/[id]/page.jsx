import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Dumbbell,
    Users,
} from "lucide-react";
import { getClassById } from "@/lib/api/classes";


const ClassDetailsPage = async ({ params }) => {
    const { id } = await params;

    let classData;

    try {
        classData = await getClassById(id);
    } catch (error) {
        notFound();
    }

    if (!classData || classData.status !== "Approved") {
        notFound();
    }

    const {
        className,
        image,
        category,
        difficulty,
        duration,
        schedule,
        price,
        description,
        studentsCount,
        trainerName,
    } = classData;

    return (
        <main className="min-h-screen bg-background">
            {/* Back Navigation */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <Link
                    href="/classes"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
                >
                    <ArrowLeft size={17} />
                    Back to All Classes
                </Link>
            </section>

            {/* Main Details */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Image */}
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-surface-secondary">
                        <Image
                            src={image}
                            alt={className}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />

                        {/* Category */}
                        <div className="absolute left-5 top-5">
                            <span className="rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                                {category}
                            </span>
                        </div>

                        {/* Difficulty */}
                        <div className="absolute right-5 top-5">
                            <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                                {difficulty}
                            </span>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="flex flex-col justify-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                            Fitness Class
                        </p>

                        <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                            {className}
                        </h1>

                        {/* Trainer */}
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                            <Dumbbell
                                size={17}
                                className="text-primary"
                            />

                            <span>with</span>

                            <span className="font-semibold text-foreground">
                                {trainerName}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="mt-6 text-base leading-7 text-muted">
                            {description}
                        </p>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
                            <div className="rounded-xl border border-border bg-surface px-4 py-5">
                                <div className="flex items-center gap-1">
                                    <Clock3
                                        size={20}
                                        className="text-primary"
                                    />

                                    <p className="text-xs text-muted">
                                        Duration
                                    </p>
                                </div>

                                <p className="mt-3 font-semibold text-foreground">
                                    {duration} <span className="font-normal">min</span>
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-surface px-4 py-5">
                                <div className="flex items-center gap-1">
                                    <Users
                                        size={20}
                                        className="text-primary"
                                    />
                                    <p className="text-xs text-muted">
                                        Total bookings
                                    </p>
                                </div>

                                <p className="mt-3 font-semibold text-foreground">
                                    {studentsCount} <span className="font-normal">students</span>
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-surface px-4 py-5">
                                <div className="flex items-center gap-1">
                                    <CalendarDays
                                        size={20}
                                        className="text-primary"
                                    />

                                    <p className="text-xs text-muted">
                                        Days
                                    </p>
                                </div>

                                <p className="mt-3 truncate font-semibold text-foreground">
                                    {schedule?.days?.length || 0} <span className="font-normal">days</span>
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-surface px-4 py-5">
                                <div className="flex items-center gap-1">
                                    <Dumbbell
                                        size={20}
                                        className="text-primary"
                                    />

                                    <p className="text-xs text-muted">
                                        Level
                                    </p>
                                </div>

                                <p className="mt-3 truncate font-semibold text-foreground">
                                    {difficulty}
                                </p>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="mt-6 rounded-xl border border-border bg-surface-secondary p-5">
                            <div className="flex items-start gap-3">
                                <CalendarDays
                                    size={21}
                                    className="mt-0.5 shrink-0 text-primary"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        Class Schedule
                                    </p>

                                    <p className="mt-1 text-sm text-muted">
                                        {schedule?.days?.join(" • ")}
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {schedule?.time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-muted">
                                    Class Fee
                                </p>

                                <p className="font-display text-3xl font-bold text-foreground">
                                    ${price}
                                </p>
                            </div>

                            <Link
                                href={`/classes/${id}/enroll`}
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Highlights */}
            <section className="border-t border-border bg-surface-secondary">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="flex gap-4">
                            <CheckCircle2
                                size={22}
                                className="mt-0.5 shrink-0 text-primary"
                            />

                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Expert-Led Training
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-muted">
                                    Train with an experienced fitness trainer
                                    and follow a structured class plan.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle2
                                size={22}
                                className="mt-0.5 shrink-0 text-primary"
                            />

                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Structured Schedule
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-muted">
                                    Join the class according to the available
                                    weekly schedule.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle2
                                size={22}
                                className="mt-0.5 shrink-0 text-primary"
                            />

                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Goal-Focused Classes
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-muted">
                                    Choose a class that matches your fitness
                                    level and training goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ClassDetailsPage;
