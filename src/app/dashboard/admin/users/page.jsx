import {
    ShieldCheck,
    UserRoundX,
} from "lucide-react";

import {
    getAdminUsers,
} from "@/lib/api/admin";

import UserActions from "@/components/dashboard/admin/users/UserActions";

const AdminUsersPage = async ({
    searchParams,
}) => {
    const params = await searchParams;

    const response = await getAdminUsers({
        page: Number(params?.page) || 1,
        limit: 10,
        search: params?.search || "",
        role: params?.role || "all",
    });

    const users = response?.data || [];

    return (
        <div className="space-y-8">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Administration
                </p>

                <h1 className="mt-2 font-display text-4xl font-bold uppercase">
                    Manage Users
                </h1>

                <p className="mt-2 text-sm text-muted">
                    Manage registered users, roles and account status.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-212.5">
                        <thead className="border-b border-border bg-surface-secondary">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-5">
                                        <p className="font-semibold">
                                            {user.name || "Unknown"}
                                        </p>
                                    </td>

                                    <td className="px-6 py-5 text-sm text-muted">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <span
                                            className={
                                                user.blocked
                                                    ? "rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-500"
                                                    : "rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-500"
                                            }
                                        >
                                            {user.blocked
                                                ? "Blocked"
                                                : "Active"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex justify-end">
                                            <UserActions user={user} />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {!users.length && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-16 text-center text-sm text-muted"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;