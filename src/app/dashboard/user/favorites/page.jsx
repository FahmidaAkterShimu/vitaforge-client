"use client";

import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

const favoriteClasses = [];

const FavoritesPage = () => {
    const handleRemove = async (id) => {
        try {
            // Later:
            // await fetch(`${API_URL}/favorites/${id}`, {
            //     method: "DELETE",
            // });

            toast.success("Removed from favorites");
        } catch (error) {
            toast.error("Failed to remove favorite");
        }
    };

    return (
        <div className="space-y-7">
            <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    Saved Classes
                </p>

                <h1 className="mt-2 font-display text-4xl font-bold uppercase text-foreground">
                    Favorite Classes
                </h1>

                <p className="mt-2 font-body text-sm text-muted">
                    Keep track of the classes you want to join.
                </p>
            </div>

            {favoriteClasses.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {favoriteClasses.map((item) => (
                        <article
                            key={item.id}
                            className="overflow-hidden rounded-2xl border border-border bg-surface"
                        >
                            <div className="aspect-16/10 bg-surface-secondary">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={100}
                                    height={80}
                                    className="size-full object-cover"
                                />
                            </div>

                            <div className="p-5">
                                <h2 className="font-display text-2xl font-bold uppercase text-foreground">
                                    {item.name}
                                </h2>

                                <p className="mt-2 font-body text-sm text-muted">
                                    {item.trainer}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => handleRemove(item.id)}
                                    className="mt-5 inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 font-body text-xs font-bold text-red-500 transition-colors hover:bg-red-500/10"
                                >
                                    <Trash2 className="size-4" />
                                    Remove
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-border bg-surface px-5 py-16 text-center">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Heart className="size-6" />
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
                        No Favorite Classes
                    </h2>

                    <p className="mx-auto mt-2 max-w-md font-body text-sm leading-6 text-muted">
                        Save your favorite fitness classes here so you can find
                        them easily later.
                    </p>
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;
