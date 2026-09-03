"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import ClassCard from "@/components/shared/ClassCard";

const categories = [
    "All",
    "Yoga",
    "Weights",
    "Cardio",
    "CrossFit",
    "Strength Training",
    "Functional Training",
];

const AllClassesClient = ({ classes = [] }) => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredClasses = useMemo(() => {
        return classes.filter((classData) => {
            const className = classData.className?.toLowerCase() || "";
            const searchText = search.toLowerCase().trim();

            const matchesSearch = className.includes(searchText);

            const matchesCategory =
                selectedCategory === "All" ||
                classData.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [classes, search, selectedCategory]);

    return (
        <div>
            {/* Search + Category Filter */}
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* Search */}
                <div className="relative w-full lg:flex-1">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by class name..."
                        className="h-12 w-full rounded-lg border border-border bg-surface pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:border-primary"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex w-full gap-2 overflow-x-auto pb-1 lg:w-auto">
                    {categories.map((category) => {
                        const isActive = selectedCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() =>
                                    setSelectedCategory(category)
                                }
                                className={`shrink-0 rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "border-primary bg-primary text-white"
                                    : "border-border bg-surface text-foreground hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Result Count */}
            <div className="mb-5">
                <p className="text-sm text-muted">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                        {filteredClasses.length}
                    </span>{" "}
                    {filteredClasses.length === 1 ? "class" : "classes"}
                </p>
            </div>

            {/* Classes */}
            {filteredClasses.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredClasses.map((classData) => (
                        <ClassCard
                            key={classData._id}
                            classData={classData}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-border bg-surface px-6 py-16 text-center">
                    <Search
                        size={32}
                        className="mx-auto mb-4 text-muted"
                    />

                    <h2 className="text-xl font-semibold text-foreground">
                        No classes found
                    </h2>

                    <p className="mt-2 text-sm text-muted">
                        Try a different class name or category.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllClassesClient;
