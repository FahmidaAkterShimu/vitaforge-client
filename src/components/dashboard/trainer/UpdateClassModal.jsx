"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    CalendarDays,
    Clock3,
    Dumbbell,
    ImagePlus,
    Loader2,
    Save,
    Upload,
    X,
} from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { updateClass } from "@/lib/actions/classes";
import { uploadImage } from "@/utils/uploadImage";
import { Button } from "@heroui/react";

const DAYS = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

const categories = [
    "Yoga",
    "Weights",
    "Cardio",
    "CrossFit",
    "Strength Training",
    "Functional Training",
];

const difficultyLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
];

const UpdateClassModal = ({ classItem, onClose }) => {
    const [formData, setFormData] = useState({
        className: classItem?.className || "",
        image: classItem?.image || "",
        category: classItem?.category || "",
        difficulty: classItem?.difficulty || "",
        duration: classItem?.duration || "",
        days: classItem?.schedule?.days || [],
        time: classItem?.schedule?.time || "",
        price: classItem?.price ?? "",
        description: classItem?.description || "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        classItem?.image || ""
    );

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDayToggle = (day) => {
        setFormData((prev) => {
            const selected = prev.days.includes(day);

            return {
                ...prev,
                days: selected
                    ? prev.days.filter((item) => item !== day)
                    : [...prev.days, day],
            };
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB.");
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.className.trim()) {
            toast.error("Please enter the class name.");
            return;
        }

        if (!formData.category) {
            toast.error("Please select a category.");
            return;
        }

        if (!formData.difficulty) {
            toast.error("Please select a difficulty level.");
            return;
        }

        if (!formData.duration || Number(formData.duration) <= 0) {
            toast.error("Please enter a valid duration.");
            return;
        }

        if (!formData.days.length) {
            toast.error("Please select at least one class day.");
            return;
        }

        if (!formData.time) {
            toast.error("Please select a class time.");
            return;
        }

        if (formData.price === "" || Number(formData.price) < 0) {
            toast.error("Please enter a valid price.");
            return;
        }

        if (!formData.description.trim()) {
            toast.error("Please enter a class description.");
            return;
        }

        try {
            setLoading(true);

            let imageUrl = formData.image;

            // New image selected হলে শুধু তখনই upload হবে
            if (imageFile) {
                setUploadingImage(true);

                imageUrl = await uploadImage(imageFile);

                setUploadingImage(false);

                if (!imageUrl) {
                    throw new Error("Failed to upload class image.");
                }
            }

            const updatedData = {
                className: formData.className.trim(),
                image: imageUrl,
                category: formData.category,
                difficulty: formData.difficulty,
                duration: Number(formData.duration),
                schedule: {
                    days: formData.days,
                    time: formData.time,
                },
                price: Number(formData.price),
                description: formData.description.trim(),
            };

            const response = await updateClass(
                classItem._id,
                updatedData
            );

            if (!response?.success) {
                throw new Error(
                    response?.message || "Failed to update class."
                );
            }

            toast.success("Class updated successfully.");

            onClose();

            window.location.reload();
        } catch (error) {
            console.error("Update class error:", error);

            toast.error(
                error?.message || "Failed to update class."
            );
        } finally {
            setLoading(false);
            setUploadingImage(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4 sm:px-7">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Dumbbell className="size-5" />
                        </div>

                        <div>
                            <h2 className="font-display text-xl font-bold uppercase text-foreground sm:text-2xl">
                                Update Class
                            </h2>

                            <p className="mt-0.5 font-body text-xs text-muted">
                                Edit your class information.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close modal"
                        className="flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7"
                >
                    <div className="space-y-6">

                        {/* Class Name */}
                        <div>
                            <label
                                htmlFor="update-className"
                                className="mb-2 block font-body text-sm font-semibold text-foreground"
                            >
                                Class Name
                            </label>

                            <input
                                id="update-className"
                                name="className"
                                type="text"
                                value={formData.className}
                                onChange={handleChange}
                                placeholder="e.g. Full Body Strength"
                                className="w-full rounded-xl border border-border bg-surface-secondary px-4 py-3 font-body text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="mb-2 block font-body text-sm font-semibold text-foreground">
                                Class Image
                            </label>

                            <label
                                htmlFor="update-classImage"
                                className="group relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-surface-secondary transition-colors hover:border-primary"
                            >
                                {imagePreview ? (
                                    <>
                                        <Image
                                            src={imagePreview}
                                            alt={formData.className || "Class preview"}
                                            width={800}
                                            height={400}
                                            className="absolute inset-0 size-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/45 opacity-0 transition-opacity group-hover:opacity-100" />

                                        <div className="relative z-10 flex flex-col items-center text-white opacity-0 transition-opacity group-hover:opacity-100">
                                            <Upload className="size-6" />

                                            <span className="mt-2 font-body text-xs font-semibold">
                                                Change Image
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <ImagePlus className="size-5" />
                                        </div>

                                        <p className="mt-3 font-body text-sm font-semibold text-foreground">
                                            Upload Class Image
                                        </p>

                                        <p className="mt-1 font-body text-xs text-muted">
                                            JPG, PNG or WEBP · Maximum 5MB
                                        </p>
                                    </>
                                )}

                                <input
                                    id="update-classImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Category + Difficulty */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="update-category"
                                    className="mb-2 block font-body text-sm font-semibold text-foreground"
                                >
                                    Category
                                </label>

                                <select
                                    id="update-category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full cursor-pointer rounded-xl border border-border bg-surface-secondary px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary"
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="update-difficulty"
                                    className="mb-2 block font-body text-sm font-semibold text-foreground"
                                >
                                    Difficulty Level
                                </label>

                                <select
                                    id="update-difficulty"
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full cursor-pointer rounded-xl border border-border bg-surface-secondary px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary"
                                >
                                    <option value="">
                                        Select difficulty
                                    </option>

                                    {difficultyLevels.map((level) => (
                                        <option
                                            key={level}
                                            value={level}
                                        >
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Duration + Price */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="update-duration"
                                    className="mb-2 block font-body text-sm font-semibold text-foreground"
                                >
                                    Duration
                                </label>

                                <div className="relative">
                                    <Clock3 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

                                    <input
                                        id="update-duration"
                                        name="duration"
                                        type="number"
                                        min="0"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="60"
                                        className="w-full rounded-xl border border-border bg-surface-secondary py-3 pl-11 pr-16 font-body text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
                                    />

                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-muted">
                                        minutes
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="update-price"
                                    className="mb-2 block font-body text-sm font-semibold text-foreground"
                                >
                                    Price
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-sm font-semibold text-muted">
                                        $
                                    </span>

                                    <input
                                        id="update-price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="25"
                                        className="w-full rounded-xl border border-border bg-surface-secondary py-3 pl-9 pr-4 font-body text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <CalendarDays className="size-4 text-primary" />

                                <label className="font-body text-sm font-semibold text-foreground">
                                    Class Schedule
                                </label>
                            </div>

                            <div className="rounded-xl border border-border bg-surface-secondary p-4">
                                <p className="mb-3 font-body text-xs font-semibold text-muted">
                                    Select Days
                                </p>

                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                                    {DAYS.map((day) => {
                                        const selected =
                                            formData.days.includes(day);

                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() =>
                                                    handleDayToggle(day)
                                                }
                                                disabled={loading}
                                                className={`rounded-lg border px-3 py-2.5 font-body text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                                                    selected
                                                        ? "border-primary bg-primary text-white"
                                                        : "border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground"
                                                }`}
                                            >
                                                {day.slice(0, 3)}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-5">
                                    <label
                                        htmlFor="update-time"
                                        className="mb-2 block font-body text-xs font-semibold text-muted"
                                    >
                                        Class Time
                                    </label>

                                    <input
                                        id="update-time"
                                        name="time"
                                        type="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary sm:max-w-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="update-description"
                                className="mb-2 block font-body text-sm font-semibold text-foreground"
                            >
                                Description
                            </label>

                            <textarea
                                id="update-description"
                                name="description"
                                rows={6}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe what students can expect from this class..."
                                className="w-full resize-none rounded-xl border border-border bg-surface-secondary px-4 py-3 font-body text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-secondary px-5 py-5 font-body text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <X className="size-4" />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-5 font-body text-sm font-bold text-white transition-colors hover:bg-primary/30 
                            disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />

                                    {uploadingImage
                                        ? "Uploading Image..."
                                        : "Updating Class..."}
                                </>
                            ) : (
                                <>
                                    <Save className="size-4" />
                                    Update Class
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default UpdateClassModal;
