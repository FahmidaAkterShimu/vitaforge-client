import Link from "next/link";
import Image from "next/image";
import {
    Dumbbell,
    MapPin,
    Phone,
    Mail,
    Clock,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const QUICK_LINKS = [
    { href: "/", label: "Home" },
    { href: "/classes", label: "All Classes" },
    { href: "/forum", label: "Community Forum" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
];

const CATEGORIES = [
    "Yoga",
    "Cardio",
    "Weights",
    "Boxing",
    "Pilates",
    "CrossFit",
];

const SOCIAL_LINKS = [
    {
        href: "https://x.com",
        label: "Twitter",
        icon: FaXTwitter,
    },
    {
        href: "https://www.instagram.com",
        label: "Instagram",
        icon: FaInstagram,
    },
    {
        href: "https://www.facebook.com",
        label: "Facebook",
        icon: FaFacebook,
    },
];

export default function Footer() {
    return (
        <footer className="bg-neutral-950 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 py-16">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5 mb-5"
                        >
                            <div className="relative w-9 h-9 overflow-hidden rounded-lg bg-brand flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="VitaForge logo"
                                    width={40}
                                    height={40}
                                    className="w-9 h-9"
                                />
                            </div>

                            <span className="font-display font-black text-2xl tracking-tight text-white">
                                Vita<span className="font-body text-primary">Forge</span>
                            </span>
                        </Link>

                        <p className="max-w-xs text-sm leading-6 text-neutral-400">
                            The premium fitness platform connecting members
                            with elite trainers. Forge your best self with
                            VitaForge.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-6">
                            {SOCIAL_LINKS.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="
                                            w-10 h-10
                                            rounded-full
                                            bg-neutral-900
                                            border border-neutral-800
                                            flex items-center justify-center
                                            text-neutral-400
                                            hover:text-white
                                            hover:bg-primary
                                            hover:border-brand
                                            transition-all duration-300
                                        "
                                    >
                                        <Icon size={17} strokeWidth={2} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-bold text-lg text-white mb-6">
                            Quick Links
                        </h4>

                        <ul className="space-y-3.5">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="
                                            inline-flex
                                            text-sm
                                            text-neutral-400
                                            hover:text-brand
                                            hover:translate-x-1
                                            transition-all duration-300
                                        "
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-display font-bold text-lg text-white mb-6">
                            Categories
                        </h4>

                        <ul className="space-y-3.5">
                            {CATEGORIES.map((category) => (
                                <li key={category}>
                                    <Link
                                        href={`/classes?category=${category}`}
                                        className="
                                            inline-flex
                                            text-sm
                                            text-neutral-400
                                            hover:text-brand
                                            hover:translate-x-1
                                            transition-all duration-300
                                        "
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display font-bold text-lg text-white mb-6">
                            Contact
                        </h4>

                        <ul className="space-y-4 text-sm text-neutral-400">

                            <li className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="shrink-0 mt-0.5 text-brand"
                                />

                                <span className="leading-5">
                                    42 Fitness Blvd, San Francisco,
                                    CA 94102
                                </span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Phone
                                    size={18}
                                    className="shrink-0 text-brand"
                                />

                                <a
                                    href="tel:+14155550192"
                                    className="hover:text-brand transition-colors"
                                >
                                    +1 (415) 555-0192
                                </a>
                            </li>

                            <li className="flex items-center gap-3">
                                <Mail
                                    size={18}
                                    className="shrink-0 text-brand"
                                />

                                <a
                                    href="mailto:hello@vitaforge.com"
                                    className="hover:text-brand transition-colors"
                                >
                                    hello@vitaforge.com
                                </a>
                            </li>

                            <li className="flex items-start gap-3">
                                <Clock
                                    size={18}
                                    className="shrink-0 mt-0.5 text-brand"
                                />

                                <span>
                                    Mon–Sat, 5:00 AM – 10:00 PM
                                </span>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-800 py-7">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                        <p className="text-xs sm:text-sm text-neutral-500 text-center sm:text-left">
                            © 2026 VitaForge. All rights reserved.
                        </p>

                        <div className="flex items-center gap-5 text-xs sm:text-sm">
                            <Link
                                href="/privacy"
                                className="text-neutral-500 hover:text-brand transition-colors"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="text-neutral-500 hover:text-brand transition-colors"
                            >
                                Terms of Service
                            </Link>

                            <Link
                                href="/cookies"
                                className="text-neutral-500 hover:text-brand transition-colors"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}