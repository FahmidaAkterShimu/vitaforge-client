import TrainerDashboardHeader from "@/components/dashboard/trainer/TrainerDashboardHeader";
import TrainerDashboardSidebar from "@/components/dashboard/trainer/TrainerDashboardSidebar";
import getUserSession from "@/lib/core/session";
import { redirect } from "next/navigation";

const TrainerDashboardLayout = async ({ children }) => {
    const user = await getUserSession();

    // Not logged in
    if (!user) {
        redirect("/login");
    }

    // Logged in but not trainer
    if (user.role !== "trainer") {
        redirect("/unauthorized");
    }


    return (
        <div className="min-h-screen bg-background text-foreground">

            <TrainerDashboardHeader />

            <TrainerDashboardSidebar />

            <main className="min-h-screen lg:ml-72">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                    {children}
                </div>
            </main>

        </div>
    );
};

export default TrainerDashboardLayout;