"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, TextArea, TextField, Label, Input } from "@heroui/react";
import { ImagePlus, Loader2, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { createForumPost } from "@/lib/actions/forum";


const initialFormData = {
    title: "",
    image: "",
    description: "",
};

const AddForumPostForm = ({ trainer }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const uploadImage = async () => {
        if (!imageFile) return null;

        const imageData = new FormData();

        imageData.append("image", imageFile);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            {
                method: "POST",
                body: imageData,
            }
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        if (!imageFile) {
            toast.error("Please select an image");
            return;
        }

        if (!formData.description.trim()) {
            toast.error("Please enter a description");
            return;
        }

        try {
            setLoading(true);

            const imageUrl = await uploadImage();

            const postData = {
                title: formData.title.trim(),
                image: imageUrl,
                description: formData.description.trim(),

                trainerId: trainer.id,
                authorName: trainer.name,
                authorEmail: trainer.email,
                authorRole: "trainer",

                createdAt: new Date().toISOString(),
            };

            const result = await createForumPost(postData);

            if (!result.success) {
                throw new Error(
                    result.message || "Failed to create forum post"
                );
            }

            toast.success("Forum post published successfully!");

            setFormData(initialFormData);
            setImageFile(null);
            setPreview("");

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl">
            <div className="mb-8">
                <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Community Forum
                </span>

                <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl">
                    Add Forum Post
                </h1>

                <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-muted">
                    Share your fitness knowledge, training tips, and helpful
                    insights with the VitaForge community.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
            >
                {/* Title */}
                <TextField
                    name="title"
                    isRequired
                >
                    <Label className="mb-2 block font-body text-sm font-medium text-foreground">
                        Post Title
                    </Label>

                    <Input
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter your forum post title"
                        className="w-full"
                    />
                </TextField>


                {/* Image */}
                <div>
                    <Label className="mb-2 block font-body text-sm font-medium text-foreground">
                        Post Image
                    </Label>

                    <label
                        htmlFor="forum-image"
                        className="group flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-surface-secondary transition hover:border-primary/50"
                    >
                        {preview ? (
                            <div className="relative h-56 w-full">
                                <Image
                                    src={preview}
                                    alt="Forum post preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />

                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                                    <span className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                                        Change Image
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ImagePlus className="mb-3 size-10 text-muted" />

                                <p className="font-body text-sm font-semibold text-foreground">
                                    Upload Post Image
                                </p>

                                <p className="mt-1 font-body text-xs text-muted">
                                    PNG, JPG or WEBP • Max 5MB
                                </p>
                            </>
                        )}

                        <input
                            id="forum-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>


                {/* Description */}
                <TextField
                    name="description"
                    isRequired
                >
                    <Label className="mb-2 block font-body text-sm font-medium text-foreground">
                        Description
                    </Label>

                    <TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write your fitness knowledge or training tips..."
                        rows={7}
                        className="w-full"
                    />
                </TextField>


                {/* Submit */}
                <div className="flex justify-end border-t border-border pt-5">
                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="h-11 rounded-lg bg-primary px-6 font-body text-sm font-bold text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Upload className="size-4" />
                                Publish Post
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddForumPostForm;