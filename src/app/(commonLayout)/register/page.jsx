"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import {
    ArrowRight,
    Eye,
    EyeOff,
    ImagePlus,
    LockKeyhole,
    Mail,
    UserRound,
    X,
} from "lucide-react";

import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    Separator,
    TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
    const router = useRouter();
    const fileInputRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5MB.");
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setError("");
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const data = new FormData(e.currentTarget);
        const user = Object.fromEntries(data.entries());

        const name = user.name?.trim();
        const email = user.email?.trim();
        const password = user.password;
        const confirmPassword = user.confirmPassword;

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all required fields.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const { data: result, error: signupError } =
                await authClient.signUp.email({
                    name,
                    email,
                    password,
                    image: user.image || undefined,
                    callbackURL: "/login",
                });

            if (signupError) {
                setError(
                    signupError.message ||
                    "Unable to create your account. Please try again."
                );
                toast.error(
                    signupError.message || "Registration failed"
                );
                return;
            }

            if (result) {
                toast.success(
                    "Account created successfully! Please login"
                );

                setTimeout(() => {
                    router.push("/login");
                }, 500);
            }
        } catch (err) {
            setError(
                err?.message ||
                "Something went wrong. Please try again."
            );

            toast.error(
                err?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    const handleGoogleSignup = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || "Google sign up failed");
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="relative overflow-hidden py-14 sm:py-18 lg:py-24">
                <div className="pointer-events-none absolute left-1/2 top-0 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -30,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                            className="hidden -translate-y-30 lg:block"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                <span className="size-1.5 rounded-full bg-primary" />
                                Start Your Journey
                            </span>

                            <h1 className="mt-6 max-w-lg font-display text-6xl font-bold uppercase leading-[0.88] text-foreground xl:text-7xl">
                                Forge Your
                                <br />
                                <span className="font-body text-primary">
                                    Best Self
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md font-body text-sm leading-6 text-muted">
                                Create your VitaForge account and unlock a
                                smarter way to train, track your progress, and
                                stay connected with your fitness community.
                            </p>

                            <div className="mt-8 flex items-center gap-3">
                                <div className="h-px w-12 bg-primary" />
                                <div className="size-1.5 rounded-full bg-primary" />
                                <div className="h-px w-20 bg-border" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 25,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                                ease: "easeOut",
                            }}
                            className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
                        >
                            <div className="mb-7">
                                <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                    Create Account
                                </span>

                                <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl">
                                    Join VitaForge
                                </h2>

                                <p className="mt-3 font-body text-sm leading-6 text-muted">
                                    Create your account and start building a
                                    stronger version of yourself.
                                </p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 font-body text-sm text-red-500"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <Form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* Name */}
                                <TextField
                                    name="name"
                                    isRequired
                                    value={formData.name}
                                    onChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            name: value,
                                        }));

                                        if (error) {
                                            setError("");
                                        }
                                    }}
                                    className="w-full"
                                >
                                    <Label className="mb-2 block font-body text-sm font-medium text-foreground">
                                        Full Name
                                    </Label>

                                    <div className="relative">
                                        <UserRound className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted" />

                                        <Input
                                            name="name"
                                            placeholder="Enter your full name"
                                            className="h-12 w-full rounded-lg border border-border bg-surface-secondary pl-11 font-body text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-primary"
                                        />
                                    </div>

                                    <FieldError />
                                </TextField>

                                {/* Email */}
                                <TextField
                                    name="email"
                                    type="email"
                                    isRequired
                                    value={formData.email}
                                    onChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            email: value,
                                        }));

                                        if (error) {
                                            setError("");
                                        }
                                    }}
                                    className="w-full"
                                >
                                    <Label className="mb-2 block font-body text-sm font-medium text-foreground">
                                        Email Address
                                    </Label>

                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted" />

                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="h-12 w-full rounded-lg border border-border bg-surface-secondary pl-11 font-body text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-primary"
                                        />
                                    </div>

                                    <FieldError />
                                </TextField>

                                {/* Image */}
                                <div>
                                    <label className="mb-2 block font-body text-sm font-medium text-foreground">
                                        Profile Image
                                        <span className="ml-1 text-muted">
                                            (optional)
                                        </span>
                                    </label>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                    {imagePreview ? (
                                        <div className="flex items-center gap-4 rounded-lg border border-border bg-surface-secondary p-3">
                                            <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-border">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Profile preview"
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-body text-sm font-medium text-foreground">
                                                    {image?.name}
                                                </p>

                                                <p className="mt-1 font-body text-xs text-muted">
                                                    Profile image selected
                                                </p>
                                            </div>

                                            <Button
                                                type="button"
                                                onPress={removeImage}
                                                variant="light"
                                                isIconOnly
                                                className="size-8 shrink-0 rounded-full text-muted transition-colors hover:bg-background hover:text-foreground"
                                                aria-label="Remove image"
                                            >
                                                <X className="size-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="button"
                                            onPress={() =>
                                                fileInputRef.current?.click()
                                            }
                                            variant="light"
                                            className="flex h-20 w-full items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-surface-secondary font-body text-sm text-muted transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <ImagePlus className="size-4" />
                                            </span>

                                            <span>
                                                Click to upload profile image
                                            </span>
                                        </Button>
                                    )}

                                    <p className="mt-2 font-body text-xs text-muted">
                                        JPG, PNG or WEBP · Maximum 5MB
                                    </p>
                                </div>

                                {/* Password */}
                                <TextField
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    isRequired
                                    value={formData.password}
                                    onChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: value,
                                        }));

                                        if (error) {
                                            setError("");
                                        }
                                    }}
                                    className="w-full"
                                >
                                    <Label className="mb-2 block font-body text-sm font-medium text-foreground">
                                        Password
                                    </Label>

                                    <div className="relative">
                                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted" />

                                        <Input
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Create a password"
                                            className="h-12 w-full rounded-lg border border-border bg-surface-secondary pl-11 pr-11 font-body text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-primary"
                                        />

                                        <Button
                                            type="button"
                                            onPress={() =>
                                                setShowPassword(
                                                    (prev) => !prev
                                                )
                                            }
                                            variant="light"
                                            isIconOnly
                                            className="absolute right-3 top-1/2 z-10 size-8 -translate-y-1/2 rounded-full text-muted transition-colors hover:text-foreground"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <Eye className="size-4" />
                                            ) : (
                                                <EyeOff className="size-4" />
                                            )}
                                        </Button>
                                    </div>

                                    <FieldError />

                                    <p className="mt-2 font-body text-xs text-muted">
                                        6+ characters · 1 uppercase · 1 lowercase
                                    </p>
                                </TextField>

                                {/* Confirm password */}
                                <TextField
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    isRequired
                                    value={formData.confirmPassword}
                                    onChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            confirmPassword: value,
                                        }));

                                        if (error) {
                                            setError("");
                                        }
                                    }}
                                    className="w-full"
                                >
                                    <Label className="mb-2 block font-body text-sm font-medium text-foreground">
                                        Confirm Password
                                    </Label>

                                    <div className="relative">
                                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted" />

                                        <Input
                                            name="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Confirm your password"
                                            className="h-12 w-full rounded-lg border border-border bg-surface-secondary pl-11 pr-11 font-body text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-primary"
                                        />

                                        <Button
                                            type="button"
                                            onPress={() =>
                                                setShowConfirmPassword(
                                                    (prev) => !prev
                                                )
                                            }
                                            variant="light"
                                            isIconOnly
                                            className="absolute right-3 top-1/2 z-10 size-8 -translate-y-1/2 rounded-full text-muted transition-colors hover:text-foreground"
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <Eye className="size-4" />
                                            ) : (
                                                <EyeOff className="size-4" />
                                            )}
                                        </Button>
                                    </div>

                                    <FieldError />
                                </TextField>

                                {/* Terms and policy */}
                                <p className="font-body text-xs leading-5 text-muted">
                                    By creating an account, you agree to our{" "}
                                    <Link
                                        href="/terms"
                                        className="font-medium text-primary hover:text-primary-hover"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="font-medium text-primary hover:text-primary-hover"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>

                                <Button
                                    type="submit"
                                    isDisabled={loading}
                                    className="group h-12 w-full rounded-lg bg-primary px-5 font-body text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-primary/30"
                                >
                                    {loading ? (
                                        <>
                                            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account

                                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </>
                                    )}
                                </Button>

                                <div className="my-5 flex items-center gap-3">
                                    <Separator className="flex-1" />

                                    <span className="whitespace-nowrap font-body text-xs text-muted">
                                        Or sign up with
                                    </span>

                                    <Separator className="flex-1" />
                                </div>

                                <Button
                                    type="button"
                                    onPress={handleGoogleSignup}
                                    variant="outline"
                                    className="h-12 w-full rounded-lg border-border bg-surface font-body text-sm font-medium text-foreground transition-all duration-200 hover:bg-surface-secondary"
                                >
                                    <FcGoogle className="size-5" />
                                    Sign up with Google
                                </Button>

                            </Form>

                            <p className="mt-6 text-center font-body text-sm text-muted">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-primary transition-colors hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;