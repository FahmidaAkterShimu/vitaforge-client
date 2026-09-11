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
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-2">
                        <MessageCircle size={16} />
                        VitaForge Community
                    </p>

                    <h1 className="font-display text-4xl font-bold text-foreground">
                        Connect. Learn.
                        <span className="text-primary"> Get Stronger.</span>
                    </h1>

                    <p className="mt-2 max-w-2xl text-muted">
                        Explore fitness tips, workout advice, training
                        insights, and valuable knowledge shared by our
                        trainers and community.
                    </p>
                </div>
            </div>


            {/* Forum Posts */}
            <section>
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
