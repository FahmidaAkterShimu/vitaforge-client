import { Avatar } from "@heroui/react";
import { Mail, ShieldCheck, UserRound } from "lucide-react";

const UserProfileCard = ({ user }) => {
    const name = user?.name || "VitaForge Member";
    const email = user?.email || "member@example.com";
    const image = user?.image;

    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    return (
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        Profile
                    </p>

                    <h2 className="mt-1 font-display text-2xl font-bold uppercase text-foreground">
                        Your Details
                    </h2>
                </div>

                <div className="hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-wider text-primary sm:block">
                    User
                </div>
            </div>
 
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">

                <Avatar size="lg" variant="soft" className="h-20 w-20 rounded-full border-2 border-orange-500/30 bg-orange-500/10 text-orange-600 dark:border-orange-400/30 dark:bg-orange-500/15 dark:text-orange-400 shadow-sm transition-all duration-200 hover:border-orange-500/60 dark:hover:border-orange-500/70 hover:bg-orange-500/20 hover:shadow-md">
                    <Avatar.Image referrerPolicy="no-referrer" alt={name || "User"} src={image || ""} />

                    <Avatar.Fallback className="font-bold tracking-wide text-orange-600 dark:text-orange-400">
                        {name
                            ? name.trim().slice(0, 2).toUpperCase()
                            : "VF"}
                    </Avatar.Fallback>
                </Avatar>


                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <UserRound className="size-4 text-primary" />

                        <p className="font-body text-sm font-semibold text-foreground">
                            {name}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail className="size-4 text-muted" />

                        <p className="break-all font-body text-sm text-muted">
                            {email}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 sm:hidden">
                        <ShieldCheck className="size-4 text-primary" />

                        <span className="font-body text-xs font-bold uppercase tracking-wider text-primary">
                            User
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfileCard;
