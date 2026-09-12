import { redirect } from "next/navigation";

import UserDashboardSidebar from "@/components/dashboard/user/UserDashboardSidebar";
import UserDashboardHeader from "@/components/dashboard/user/UserDashboardHeader";
import getUserSession from "@/lib/core/session";

const UserDashboardLayout = async ({ children }) => {
    // Get current session
    const user = await getUserSession();

    // Not logged in
    if (!user) {
        redirect("/login");
    }

    // Logged in but not normal user
    if (user.role !== "user") {
        redirect("/unauthorized");
    }

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* User Header */}
            <UserDashboardHeader />

            {/* User Sidebar */}
            <UserDashboardSidebar />

            {/* Main Content */}
            <main className="min-h-screen lg:ml-72">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                    {children}
                </div>
            </main>

        </div>
    );
};

export default UserDashboardLayout;