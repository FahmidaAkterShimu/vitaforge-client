"use client";

import Link from "next/link";
import { Eye, CalendarDays } from "lucide-react";

const bookedClasses = [];

const BookedClassesPage = () => {
    return (
        <div className="space-y-7">
            <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    My Classes
                </p>

                <h1 className="mt-2 font-display text-4xl font-bold uppercase text-foreground">
                    Booked Classes
                </h1>

                <p className="mt-2 font-body text-sm text-muted">
                    View all classes you have successfully registered and paid
                    for.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-175">
                        <thead className="border-b border-border bg-surface-secondary">
                            <tr>
                                <th className="px-5 py-4 text-left font-body text-xs font-bold uppercase tracking-wider text-muted">
                                    Class
                                </th>

                                <th className="px-5 py-4 text-left font-body text-xs font-bold uppercase tracking-wider text-muted">
                                    Trainer
                                </th>

                                <th className="px-5 py-4 text-left font-body text-xs font-bold uppercase tracking-wider text-muted">
                                    Schedule
                                </th>

                                <th className="px-5 py-4 text-right font-body text-xs font-bold uppercase tracking-wider text-muted">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookedClasses.length > 0 ? (
                                bookedClasses.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-border last:border-0"
                                    >
                                        <td className="px-5 py-4 font-body text-sm font-semibold text-foreground">
                                            {item.className}
                                        </td>

                                        <td className="px-5 py-4 font-body text-sm text-muted">
                                            {item.trainerName}
                                        </td>

                                        <td className="px-5 py-4 font-body text-sm text-muted">
                                            {item.schedule}
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <Link
                                                href={`/classes/${item.classId}`}
                                                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 font-body text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
                                            >
                                                <Eye className="size-4" />
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-5 py-16 text-center"
                                    >
                                        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <CalendarDays className="size-6" />
                                        </div>

                                        <h3 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
                                            No Booked Classes
                                        </h3>

                                        <p className="mx-auto mt-2 max-w-md font-body text-sm leading-6 text-muted">
                                            You haven&apos;t booked any classes yet.
                                            Explore VitaForge classes and start
                                            your journey.
                                        </p>

                                        <Link
                                            href="/classes"
                                            className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 font-body text-sm font-bold text-white hover:bg-primary-hover"
                                        >
                                            Explore Classes
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BookedClassesPage;
