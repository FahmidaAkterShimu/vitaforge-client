import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ThumbsDown, ThumbsUp, UserRound } from "lucide-react";

import { getForumPostById } from "@/lib/api/forum";

const ForumPostDetailsPage = async ({ params }) => {
    const { id } = await params;

    // Use your existing Better Auth server session function here.
    // Example:
    // const session = await getSession();

    const post = await getForumPostById(id);

    if (!post || post.success === false) {
        return (
            <main className="min-h-screen bg-background px-4 py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-3xl font-bold text-foreground">
                        Post Not Found
                    </h1>

                    <p className="mt-3 text-muted">
                        The forum post you are looking for does not exist.
                    </p>

                    <Link
                        href="/forum"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                        <ArrowLeft size={18} />
                        Back to Forum
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* Back */}
                <Link
                    href="/forum"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
                >
                    <ArrowLeft size={18} />
                    Back to Forum
                </Link>

                {/* Post */}
                <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

                    {/* Image */}
                    <div className="relative aspect-16/8 w-full">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 lg:p-10">

                        {/* Author & Date */}
                        <div className="mb-5 flex flex-wrap items-center gap-5 text-sm text-muted">
                            <span className="inline-flex items-center gap-2">
                                <UserRound size={17} />
                                {post.authorName}
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <CalendarDays size={17} />
                                {new Date(
                                    post.createdAt
                                ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                            {post.title}
                        </h1>

                        {/* Description */}
                        <div className="mt-8">
                            <p className="whitespace-pre-line text-base leading-8 text-muted sm:text-lg">
                                {post.description}
                            </p>
                        </div>

                        {/* Interactions */}
                        <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <ThumbsUp size={18} />
                                Like
                            </button>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <ThumbsDown size={18} />
                                Dislike
                            </button>
                        </div>
                    </div>
                </article>

                {/* Comments */}
                <section className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Community Discussion
                        </p>

                        <h2 className="mt-1 font-display text-3xl font-bold text-foreground">
                            Comments
                        </h2>
                    </div>

                    {/* Comment form */}
                    <div className="rounded-xl border border-border bg-surface-secondary p-5">
                        <textarea
                            placeholder="Share your thoughts..."
                            rows={4}
                            className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
                        />

                        <div className="mt-3 flex justify-end">
                            <button
                                type="button"
                                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>

                    {/* Comments will be rendered here */}
                    <div className="mt-6">
                        <p className="py-8 text-center text-sm text-muted">
                            No comments yet. Be the first to join the
                            discussion.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );

};

export default ForumPostDetailsPage;
