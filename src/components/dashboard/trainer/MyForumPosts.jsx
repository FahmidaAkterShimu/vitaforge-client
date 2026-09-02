"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AlertDialog, Button } from "@heroui/react";
import {
    CalendarDays,
    FileText,
    Loader2,
    Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { getTrainerForumPosts } from "@/lib/api/forum";
import { deleteForumPost } from "@/lib/actions/forum";



const MyForumPosts = ({ trainerId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchPosts = async () => {
            try {
                const data = await getTrainerForumPosts(trainerId);

                if (!ignore) {
                    setPosts(data);
                }
            } catch (error) {
                console.error(error);

                if (!ignore) {
                    toast.error("Failed to load your forum posts");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchPosts();

        return () => {
            ignore = true;
        };
    }, [trainerId]);

    const handleDelete = async (postId) => {
        try {
            setDeleteLoading(postId);

            const result = await deleteForumPost(postId);

            if (result.deletedCount == 1) {
                toast.success("Forum post deleted successfully");

            }

            setPosts((prevPosts) =>
                prevPosts.filter(
                    (post) => post._id !== postId
                )
            );

        } catch (error) {
            console.error(error);

            toast.error(
                error.message || "Failed to delete post"
            );
        } finally {
            setDeleteLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-80 items-center justify-center">
                <Loader2 className="size-7 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Trainer Dashboard
                    </span>

                    <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl">
                        My Forum Posts
                    </h1>

                    <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-muted">
                        Manage the knowledge and fitness content
                        you have shared with the VitaForge community.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-secondary px-4 py-2">
                    <FileText className="size-4 text-primary" />

                    <span className="font-body text-sm font-semibold text-foreground">
                        {posts.length}{" "}
                        {posts.length === 1 ? "Post" : "Posts"}
                    </span>
                </div>
            </div>

            {/* Empty State */}
            {posts.length === 0 ? (
                <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="size-6 text-primary" />
                    </div>

                    <h2 className="font-display text-2xl font-bold uppercase text-foreground">
                        No Forum Posts Yet
                    </h2>

                    <p className="mt-2 max-w-md font-body text-sm leading-6 text-muted">
                        You haven&apos;t shared anything with the community
                        yet. Create your first forum post to get started.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h2 className="line-clamp-2 font-display text-2xl font-bold uppercase leading-tight text-foreground">
                                    {post.title}
                                </h2>

                                <div className="mt-3 flex items-center gap-2 text-muted">
                                    <CalendarDays className="size-4" />

                                    <span className="font-body text-xs">
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="mt-4 line-clamp-3 font-body text-sm leading-6 text-muted">
                                    {post.description}
                                </p>

                                {/* Delete */}
                                <div className="mt-5 border-t border-border pt-4">
                                    <AlertDialog>
                                        <Button
                                            variant="danger"
                                            className="w-full rounded-lg"
                                        >
                                            <Trash2 className="size-4" />
                                            Delete Post
                                        </Button>

                                        <AlertDialog.Backdrop>
                                            <AlertDialog.Container>
                                                <AlertDialog.Dialog>
                                                    <AlertDialog.Header>
                                                        <AlertDialog.Icon status="danger">
                                                            <Trash2 className="size-5" />
                                                        </AlertDialog.Icon>

                                                        <AlertDialog.Heading>
                                                            Delete Forum Post?
                                                        </AlertDialog.Heading>
                                                    </AlertDialog.Header>

                                                    <AlertDialog.Body>
                                                        This action cannot be
                                                        undone. Are you sure
                                                        you want to delete this
                                                        forum post?
                                                    </AlertDialog.Body>

                                                    <AlertDialog.Footer>
                                                        <Button
                                                            slot="close"
                                                            variant="secondary"
                                                        >
                                                            Cancel
                                                        </Button>

                                                        <Button
                                                            variant="danger"
                                                            onPress={() =>
                                                                handleDelete(
                                                                    post._id
                                                                )
                                                            }
                                                            isDisabled={
                                                                deleteLoading ===
                                                                post._id
                                                            }
                                                        >
                                                            {deleteLoading ===
                                                                post._id ? (
                                                                <>
                                                                    <Loader2 className="size-4 animate-spin" />
                                                                    Deleting...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Trash2 className="size-4" />
                                                                    Delete
                                                                </>
                                                            )}
                                                        </Button>
                                                    </AlertDialog.Footer>
                                                </AlertDialog.Dialog>
                                            </AlertDialog.Container>
                                        </AlertDialog.Backdrop>
                                    </AlertDialog>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyForumPosts;