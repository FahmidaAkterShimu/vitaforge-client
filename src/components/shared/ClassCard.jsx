"use client";

import Image from "next/image";
import {
    CalendarDays,
    Clock3,
    Users,
    ArrowRight,
} from "lucide-react";
import {
    Card,
    Chip,
    Button,
} from "@heroui/react";
import Link from "next/link";

const categoryIcons = {
    Yoga: "🧘",
    Weights: "🏋️",
    Cardio: "❤️",
    CrossFit: "⚡",
    "Strength Training": "💪",
    "Functional Training": "🔄",
};

const ClassCard = ({ classData, onMore }) => {
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
        <Card
            className="w-full overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            {/* Image */}
            <Card.Header className="relative block h-56 overflow-hidden p-0">
                <Image
                    src={image}
                    alt={className}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Category */}
                <div className="absolute left-4 top-4">
                    <Chip
                        size="sm"
                        className="border border-white/20 bg-black/70 font-medium text-white backdrop-blur-md"
                    >
                        {categoryIcons[category] || "🏋️"} {category}
                    </Chip>
                </div>

                {/* Difficulty */}
                <div className="absolute right-4 top-4">
                    <Chip
                        size="sm"
                        className="bg-primary font-medium text-white"
                    >
                        {difficulty}
                    </Chip>
                </div>
            </Card.Header>

            {/* Content */}
            <Card.Content className="flex flex-col gap-4 px-5 py-5">
                {/* Title + Trainer */}
                <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-foreground">
                        {className}
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                        With{" "}
                        <span className="font-medium text-foreground">
                            {trainerName}
                        </span>
                    </p>
                </div>

                {/* Class Info */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-1 rounded-lg bg-surface-secondary px-3 py-2.5">
                        <Clock3
                            size={17}
                            className="shrink-0 text-primary"
                        />

                        <p className="text-sm font-medium text-foreground">
                            {duration} min
                        </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg bg-surface-secondary px-3 py-2">
                        <Users
                            size={17}
                            className="shrink-0 text-primary"
                        />
                        <p className="text-sm font-medium text-foreground">
                            {studentsCount} booked
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="line-clamp-3 text-sm leading-6 text-muted">
                    {description}
                </p>
            </Card.Content>

            {/* Footer */}
            <Card.Footer className="flex items-center justify-between border-t border-border px-5 py-4">
                <div>
                    <p className="text-xs text-muted">
                        Class Fee
                    </p>

                    <p className="text-xl font-bold text-foreground">
                        ${price}<span className="text-sm text-muted font-medium">/session</span>
                    </p>
                </div>

                <Link
                    href={`/classes/${classData._id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10" >
                    View Details <ArrowRight size={16} />
                </Link>
            </Card.Footer>
        </Card>
    );
};

export default ClassCard;