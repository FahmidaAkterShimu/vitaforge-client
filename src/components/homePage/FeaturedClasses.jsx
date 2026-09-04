import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ClassCard from "@/components/shared/ClassCard";
import { getAllClasses } from "@/lib/api/classes";

const FeaturedClasses = async () => {
    const data = await getAllClasses({
        status: "Approved",
        limit: 3,
    });

    const classes = Array.isArray(data) ? data : [];

    return (
        <section className="bg-background py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                            Explore Our Classes
                        </p>

                        <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                            Featured Classes
                        </h2>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                            Discover popular fitness classes.
                        </p>
                    </div>

                    <Link
                        href="/classes"
                        className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                    >
                        All Classes
                        <ArrowRight
                            size={18}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Featured Classes */}
                {classes.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {classes.map((classData) => (
                            <ClassCard
                                key={classData._id}
                                classData={classData}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedClasses;