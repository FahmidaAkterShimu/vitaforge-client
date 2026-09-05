import { redirect } from "next/navigation";

import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import getUserSession from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
    // Get current session
    const user = await getUserSession();

    // Not logged in
    if (!user) {
        redirect("/login");
    }

    // Logged in but not admin
    if (user.role !== "admin") {
        redirect("/unauthorized");
    }

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* Admin Sidebar */}
            <AdminSidebar />

            {/* Admin Header */}
            <AdminHeader />

            {/* Main Content */}
            <main className="min-h-screen lg:ml-72">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                    {children}
                </div>
            </main>

        </div>
    );
};

export default AdminDashboardLayout;