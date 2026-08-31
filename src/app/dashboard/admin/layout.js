import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";

export default function AdminDashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground">

            <AdminSidebar />

            <AdminHeader />

            <main className="pt-20 lg:ml-72">
                <div className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>

        </div>
    );
}