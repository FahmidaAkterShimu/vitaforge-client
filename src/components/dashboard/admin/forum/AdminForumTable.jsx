"use client";

import { useState } from "react";

import {
    Button,
    Input,
    Modal,
} from "@heroui/react";

import {
    Search,
    RefreshCw,
    Trash2,
    MessageSquareText,
    UserRound,
    CalendarDays,
    Eye,
} from "lucide-react";

import {
    getAdminForumPosts,
    deleteAdminForumPost,
} from "@/lib/api/admin";
import Image from "next/image";

const AdminForumTable = ({ initialPosts = [] }) => {
    const [posts, setPosts] = useState(initialPosts);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [selectedPost, setSelectedPost] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [deletePost, setDeletePost] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [actionId, setActionId] = useState(null);

    const loadPosts = async () => {
        try {
            setLoading(true);

            const response = await getAdminForumPosts();

            if (response?.success) {
                setPosts(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );
            }
        } catch (error) {
            console.error(
                "Failed to load forum posts:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (post) => {
        setSelectedPost(post);
        setIsDetailsOpen(true);
    };

    const closeDetails = () => {
        setIsDetailsOpen(false);
        setSelectedPost(null);
    };

    const handleDeleteClick = (post) => {
        setDeletePost(post);
        setIsDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        if (actionId) return;

        setIsDeleteOpen(false);
        setDeletePost(null);
    };

    const handleDelete = async () => {
        if (!deletePost?._id) return;

        try {
            setActionId(deletePost._id);

            const response = await deleteAdminForumPost(
                deletePost._id
            );

            if (response?.success) {
                setPosts((currentPosts) =>
                    currentPosts.filter(
                        (post) =>
                            post._id !== deletePost._id
                    )
                );

                setIsDeleteOpen(false);
                setDeletePost(null);
            } else {
                alert(
                    response?.message ||
                    "Failed to delete forum post."
                );
            }
        } catch (error) {
            console.error(
                "Delete forum post error:",
                error
            );

            alert("Something went wrong.");
        } finally {
            setActionId(null);
        }
    };

    const filteredPosts = posts.filter((post) => {
        const searchValue = search
            .trim()
            .toLowerCase();

        if (!searchValue) return true;

        const title = String(
            post.title || ""
        ).toLowerCase();

        const description = String(
            post.description || ""
        ).toLowerCase();

        const author =
            String(
                post.authorName ||
                post.userName ||
                post.name ||
                post.author?.name ||
                ""
            ).toLowerCase();

        return (
            title.includes(searchValue) ||
            description.includes(searchValue) ||
            author.includes(searchValue)
        );
    });

    const getAuthorName = (post) => {
        return (
            post.authorName ||
            post.userName ||
            post.name ||
            post.author?.name ||
            "Unknown User"
        );
    };

    const getAuthorEmail = (post) => {
        return (
            post.authorEmail ||
            post.email ||
            post.author?.email ||
            "N/A"
        );
    };

    const getDescription = (post) => {
        return (
            post.description ||
            post.content ||
            "No description available."
        );
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    return (
        <>
            <section className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            Community Moderation
                        </p>

                        <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight">
                            Forum Posts
                        </h1>

                        <p className="mt-2 text-sm text-muted">
                            Review and moderate all community
                            posts.
                        </p>
                    </div>

                    <Button
                        variant="flat"
                        onPress={loadPosts}
                        isDisabled={loading}
                        startContent={undefined}
                    >
                        <RefreshCw
                            size={17}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh
                    </Button>
                </div>

                {/* Search */}
                <div className="rounded-2xl border border-border bg-surface p-4">
                    <Input
                        className='w-full'
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search by title, description or author..."
                        aria-label="Search forum posts"
                    />

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                        <Search size={14} />

                        <span>
                            Showing {filteredPosts.length} of{" "}
                            {posts.length} posts
                        </span>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <SummaryCard
                        icon={MessageSquareText}
                        label="Total Posts"
                        value={posts.length}
                    />

                    <SummaryCard
                        icon={UserRound}
                        label="Community Content"
                        value={filteredPosts.length}
                    />
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-237.5">
                            <thead>
                                <tr className="border-b border-border bg-surface-secondary">
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                        Post
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                        Author
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted">
                                        Created
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-5 py-14 text-center text-sm text-muted"
                                        >
                                            Loading forum posts...
                                        </td>
                                    </tr>
                                ) : filteredPosts.length ===
                                    0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-secondary">
                                                    <MessageSquareText
                                                        size={24}
                                                        className="text-muted"
                                                    />
                                                </div>

                                                <h3 className="mt-4 font-display text-lg font-bold uppercase">
                                                    No Posts Found
                                                </h3>

                                                <p className="mt-1 text-sm text-muted">
                                                    There are no forum
                                                    posts matching
                                                    your search.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPosts.map(
                                        (post) => {
                                            const title =
                                                post.title ||
                                                "Untitled Post";

                                            const description =
                                                getDescription(
                                                    post
                                                );

                                            const authorName =
                                                getAuthorName(
                                                    post
                                                );

                                            const authorEmail =
                                                getAuthorEmail(
                                                    post
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        post._id
                                                    }
                                                    className="border-b border-border last:border-b-0 hover:bg-surface-secondary/50"
                                                >
                                                    {/* Post */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-3">
                                                            {post.image ? (
                                                                <Image
                                                                    src={
                                                                        post.image
                                                                    }
                                                                    alt={
                                                                        title
                                                                    }
                                                                    width={56}
                                                                    height={56}
                                                                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                                    <MessageSquareText
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </div>
                                                            )}

                                                            <div className="min-w-0">
                                                                <p className="font-semibold">
                                                                    {
                                                                        title
                                                                    }
                                                                </p>

                                                                <p className="mt-1 max-w-100 truncate text-xs text-muted">
                                                                    {
                                                                        description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Author */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                                <UserRound
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-semibold">
                                                                    {
                                                                        authorName
                                                                    }
                                                                </p>

                                                                <p className="max-w-55 truncate text-xs text-muted">
                                                                    {
                                                                        authorEmail
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <CalendarDays
                                                                size={
                                                                    16
                                                                }
                                                                className="text-muted"
                                                            />

                                                            <span>
                                                                {formatDate(
                                                                    post.createdAt
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                aria-label="View post"
                                                                title="View post"
                                                                onPress={() =>
                                                                    handleViewDetails(
                                                                        post
                                                                    )
                                                                }
                                                            >
                                                                <Eye
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </Button>

                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                color="danger"
                                                                aria-label="Delete post"
                                                                title="Delete post"
                                                                isDisabled={
                                                                    actionId ===
                                                                    post._id
                                                                }
                                                                onPress={() =>
                                                                    handleDeleteClick(
                                                                        post
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Post Details Modal */}
            <Modal>
                <Modal.Backdrop
                    isOpen={isDetailsOpen}
                    onOpenChange={(open) => {
                        if (!open) {
                            closeDetails();
                        }
                    }}
                    variant="blur"
                >
                    <Modal.Container
                        size="lg"
                        scroll="inside"
                    >
                        <Modal.Dialog>
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                        Community Post
                                    </p>

                                    <h2 className="mt-1 font-display text-2xl font-bold uppercase">
                                        {selectedPost?.title ||
                                            "Post Details"}
                                    </h2>
                                </div>
                            </Modal.Header>

                            <Modal.Body>
                                {selectedPost && (
                                    <div className="space-y-6">
                                        {selectedPost.image && (
                                            <Image
                                                src={
                                                    selectedPost.image
                                                }
                                                alt={
                                                    selectedPost.title ||
                                                    "Forum post"
                                                }
                                                width={200}
                                                height={350}
                                                className="max-h-87.5 w-full rounded-2xl object-cover"
                                            />
                                        )}

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-muted">
                                                Author
                                            </p>

                                            <p className="mt-2 font-semibold">
                                                {getAuthorName(
                                                    selectedPost
                                                )}
                                            </p>

                                            <p className="mt-1 text-sm text-muted">
                                                {getAuthorEmail(
                                                    selectedPost
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-muted">
                                                Description
                                            </p>

                                            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">
                                                {getDescription(
                                                    selectedPost
                                                )}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-border bg-surface-secondary p-4">
                                            <p className="text-xs font-bold uppercase tracking-wider text-muted">
                                                Published
                                            </p>

                                            <p className="mt-2 text-sm font-semibold">
                                                {formatDate(
                                                    selectedPost.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="flat"
                                    onPress={closeDetails}
                                >
                                    Close
                                </Button>

                                <Button
                                    className="bg-danger"
                                    onPress={() => {
                                        closeDetails();
                                        handleDeleteClick(
                                            selectedPost
                                        );
                                    }}
                                >
                                    <Trash2 size={17} />
                                    Delete Post
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal>
                <Modal.Backdrop
                    isOpen={isDeleteOpen}
                    onOpenChange={(open) => {
                        if (!open) {
                            closeDeleteModal();
                        }
                    }}
                    variant="blur"
                >
                    <Modal.Container size="sm">
                        <Modal.Dialog>
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-danger">
                                        Delete Post
                                    </p>

                                    <h2 className="mt-1 font-display text-2xl font-bold uppercase">
                                        Confirm Deletion
                                    </h2>
                                </div>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="space-y-4">
                                    <p className="text-sm leading-6 text-muted">
                                        Are you sure you want to
                                        delete this community
                                        post? This action cannot
                                        be undone.
                                    </p>

                                    {deletePost && (
                                        <div className="rounded-xl border border-danger/20 bg-danger/5 p-4">
                                            <p className="font-semibold">
                                                {
                                                    deletePost.title
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-muted">
                                                By{" "}
                                                {getAuthorName(
                                                    deletePost
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="flat"
                                    onPress={
                                        closeDeleteModal
                                    }
                                    isDisabled={Boolean(
                                        actionId
                                    )}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="bg-danger"
                                    onPress={handleDelete}
                                    isDisabled={Boolean(
                                        actionId
                                    )}
                                >
                                    <Trash2 size={17} />

                                    {actionId
                                        ? "Deleting..."
                                        : "Delete Post"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
};

const SummaryCard = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {label}
                    </p>

                    <p className="mt-2 font-display text-3xl font-bold">
                        {value}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={21} />
                </div>
            </div>
        </div>
    );
};

export default AdminForumTable;