import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";

import { getLatestForumPosts } from "@/lib/api/forum";

const LatestForumPosts = async () => {
    const data = await getLatestForumPosts(3);

    const posts = Array.isArray(data) ? data : [];

    return (
        <section className="bg-surface-secondary py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                            Community & Insights
                        </p>

                        <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                            Latest Forum Posts
                        </h2>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                            Explore the latest fitness tips, workout advice,
                            and insights shared by our community.
                        </p>
                    </div>

                    <Link
                        href="/forum"
                        className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                    >
                        Visit Forum
                        <ArrowRight
                            size={18}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Posts */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Image */}
                                <Link
                                    href={`/forum/${post._id}`}
                                    className="relative block aspect-video overflow-hidden"
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>

                                {/* Content */}
                                <div className="p-5 sm:p-6">
                                    {/* Meta */}
                                    <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-muted">
                                        <span className="inline-flex items-center gap-1.5">
                                            <UserRound size={14} />
                                            {post.authorName}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarDays size={14} />
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <Link href={`/forum/${post._id}`}>
                                        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                                            {post.title}
                                        </h3>
                                    </Link>

                                    {/* Description */}
                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                                        {post.description}
                                    </p>

                                    {/* Read More */}
                                    <Link
                                        href={`/community/${post._id}`}
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                                    >
                                        Read More
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
                        <h3 className="text-xl font-semibold text-foreground">
                            No forum posts yet
                        </h3>

                        <p className="mt-2 text-sm text-muted">
                            Check back soon for new fitness tips and community
                            discussions.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestForumPosts;