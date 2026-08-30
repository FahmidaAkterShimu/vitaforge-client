"use client";

import { useState } from "react";
import { Dumbbell, Send } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { createApplication } from "@/lib/actions/applications";

const ApplyTrainerPage = () => {
    const [formData, setFormData] = useState({
        experience: "",
        specialty: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.experience || !formData.specialty) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const res = await createApplication({
                experience: formData.experience,
                specialty: formData.specialty,
            })

            if (res.insertedId) {
                toast.success(
                    "Trainer application submitted successfully."
                );

                setFormData({
                    experience: "",
                    specialty: "",
                });

                return;
            }

            toast.error(
                data?.message || "Failed to submit application."
            );

        } catch (error) {
            console.error("Application submit error:", error);

            toast.error(
                error?.message || "Failed to submit application."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl space-y-7">
            <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    Become a Trainer
                </p>

                <h1 className="mt-2 font-display text-4xl font-bold uppercase text-foreground sm:text-5xl">
                    Apply as Trainer
                </h1>

                <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-muted">
                    Share your experience and fitness specialty with VitaForge.
                    Your application will be reviewed by an administrator.
                </p>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
            >
                <div className="mb-7 flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Dumbbell className="size-5" />
                    </div>

                    <div>
                        <h2 className="font-display text-2xl font-bold uppercase text-foreground">
                            Trainer Application
                        </h2>

                        <p className="font-body text-xs text-muted">
                            Tell us about your fitness background.
                        </p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="experience"
                            className="mb-2 block font-body text-sm font-semibold text-foreground"
                        >
                            Experience
                        </label>

                        <input
                            id="experience"
                            type="number"
                            min="0"
                            value={formData.experience}
                            onChange={(event) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    experience: event.target.value,
                                }))
                            }
                            placeholder="Years of experience"
                            className="w-full rounded-xl border border-border bg-surface-secondary px-4 py-3 font-body text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="specialty"
                            className="mb-2 block font-body text-sm font-semibold text-foreground"
                        >
                            Specialty
                        </label>

                        <select
                            id="specialty"
                            value={formData.specialty}
                            onChange={(event) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    specialty: event.target.value,
                                }))
                            }
                            className="w-full rounded-xl border border-border bg-surface-secondary px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary"
                        >
                            <option value="">Select specialty</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Weights">Weights</option>
                            <option value="Cardio">Cardio</option>
                            <option value="CrossFit">CrossFit</option>
                            <option value="Strength Training">
                                Strength Training
                            </option>
                            <option value="Functional Training">
                                Functional Training
                            </option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-body text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Send className="size-4" />

                    {loading
                        ? "Submitting..."
                        : "Submit Application"}
                </button>
            </motion.form>
        </div>
    );
}

export default ApplyTrainerPage;
