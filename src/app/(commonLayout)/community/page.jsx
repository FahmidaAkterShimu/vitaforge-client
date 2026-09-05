import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    MessageCircle,
    UserRound,
} from "lucide-react";

import { getAllForumPosts } from "@/lib/api/forum";

const CommunityPage = async () => {
    const data = await getAllForumPosts();

    const posts = Array.isArray(data) ? data : [];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <section className="border-b border-border bg-surface-secondary">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                            <MessageCircle size={16} />
                            VitaForge Community
                        </div>

                        <h1 className="font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
                            Connect. Learn.
                            <span className="text-primary"> Get Stronger.</span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                            Explore fitness tips, workout advice, training
                            insights, and valuable knowledge shared by our
                            trainers and community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Forum Posts */}
            <section className="py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Posts */}
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <article
                                    key={post._id}
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Image */}
                                    <Link
                                        href={`/community/${post._id}`}
                                        className="relative block aspect-16/10 overflow-hidden"
                                    >
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                                        {/* Author + Date */}
                                        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                                            <span className="inline-flex items-center gap-1.5">
                                                <UserRound size={14} />
                                                {post.authorName}
                                            </span>

                                            <span className="inline-flex items-center gap-1.5">
                                                <CalendarDays size={14} />
                                                {new Date(
                                                    post.createdAt
                                                ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <Link
                                            href={`/community/${post._id}`}
                                        >
                                            <h3 className="line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        {/* Description */}
                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                                            {post.description}
                                        </p>

                                        {/* Read More */}
                                        <div className="mt-auto pt-6">
                                            <Link
                                                href={`/community/${post._id}`}
                                                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary"
                                            >
                                                Read More
                                                <ArrowRight
                                                    size={17}
                                                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="rounded-2xl border border-border bg-surface px-6 py-20 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <MessageCircle size={26} />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-foreground">
                                No community posts yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                                Our trainers will be sharing helpful fitness
                                tips and insights soon. Check back later.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );

};

export default CommunityPage;
