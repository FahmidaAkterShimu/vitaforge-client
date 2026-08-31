"use client";

import UserDashboardSidebar from "@/components/dashboard/user/UserDashboardSidebar";
import UserDashboardHeader from "@/components/dashboard/user/UserDashboardHeader";


const UserDashboardLayout = ({ children }) => {

    return (
        <div className="min-h-screen bg-background text-foreground">

            <UserDashboardHeader />

            <UserDashboardSidebar />

            {/* Main Content */}
            <main className="min-h-screen lg:ml-72">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default UserDashboardLayout;
