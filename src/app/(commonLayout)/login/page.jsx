"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
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

const LoginPage = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const { email, password } = formData;

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const { data, error: loginError } =
                await authClient.signIn.email({
                    email: email.trim(),
                    password,
                    callbackURL: "/",
                });

            console.log({ data, loginError });

            if (loginError) {
                setError(
                    loginError.message ||
                    "Invalid email or password. Please try again."
                );

                toast.error(
                    loginError.message ||
                    "Invalid email or password."
                );

                return;
            }

            if (data) {
                toast.success("Login successful!");

                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError(
                err?.message ||
                "Something went wrong. Please try again."
            );

            toast.error(
                err?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);

            const { error: googleError } =
                await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
                });

            if (googleError) {
                toast.error(
                    googleError.message ||
                    "Google login failed."
                );

                setGoogleLoading(false);
            }
        } catch (err) {
            toast.error(
                err?.message ||
                "Google login failed. Please try again."
            );

            setGoogleLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="relative overflow-hidden py-14 sm:py-18 lg:py-24">
                {/* Background Glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        {/* Left Content */}
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
                            className="hidden lg:block"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                <span className="size-1.5 rounded-full bg-primary" />
                                Welcome Back
                            </span>

                            <h1 className="mt-6 max-w-lg font-display text-6xl font-bold uppercase leading-[0.88] text-foreground xl:text-7xl">
                                Keep
                                <br />
                                <span className="text-primary">
                                    Forging.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md font-body text-sm leading-6 text-muted">
                                Welcome back to VitaForge. Sign in to
                                continue your training journey, track
                                your progress, and stay connected with
                                your fitness community.
                            </p>

                            {/* Decorative Line */}
                            <div className="mt-8 flex items-center gap-3">
                                <div className="h-px w-12 bg-primary" />
                                <div className="size-1.5 rounded-full bg-primary" />
                                <div className="h-px w-20 bg-border" />
                            </div>
                        </motion.div>

                        {/* Login Card */}
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
                            {/* Heading */}
                            <div className="mb-7">
                                <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                    Welcome Back
                                </span>

                                <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl">
                                    Login to VitaForge
                                </h2>

                                <p className="mt-3 font-body text-sm leading-6 text-muted">
                                    Sign in to your account and continue
                                    building a stronger version of yourself.
                                </p>
                            </div>

                            {/* Error */}
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

                            {/* Form */}
                            <Form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
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
                                            placeholder="Enter your password"
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
                                </TextField>

                                {/* Forgot Password */}
                                <div className="flex justify-end">
                                    <Link
                                        href="/forgot-password"
                                        className="font-body text-xs font-medium text-primary transition-colors hover:text-primary-hover"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    isDisabled={loading}
                                    className="group h-12 w-full rounded-lg bg-primary px-5 font-body text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-primary/30"
                                >
                                    {loading ? (
                                        <>
                                            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Login

                                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </>
                                    )}
                                </Button>

                                {/* Divider */}
                                <div className="my-5 flex items-center gap-3">
                                    <Separator className="flex-1" />

                                    <span className="whitespace-nowrap font-body text-xs text-muted">
                                        Or continue with
                                    </span>

                                    <Separator className="flex-1" />
                                </div>

                                {/* Google Login */}
                                <Button
                                    type="button"
                                    onPress={handleGoogleLogin}
                                    isDisabled={googleLoading}
                                    variant="outline"
                                    className="h-12 w-full rounded-lg border-border bg-surface font-body text-sm font-medium text-foreground transition-all duration-200 hover:bg-surface-secondary"
                                >
                                    {googleLoading ? (
                                        <>
                                            <span className="size-4 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
                                            Connecting...
                                        </>
                                    ) : (
                                        <>
                                            <FcGoogle className="size-5" />
                                            Continue with Google
                                        </>
                                    )}
                                </Button>
                            </Form>

                            {/* Register */}
                            <p className="mt-6 text-center font-body text-sm text-muted">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-primary transition-colors hover:text-primary-hover"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;