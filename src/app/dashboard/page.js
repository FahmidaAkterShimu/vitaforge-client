import { redirect } from "next/navigation";

import getUserSession from "@/lib/core/session";

const DashboardPage = async () => {
    const user = await getUserSession();

    if (!user) {
        redirect("/login");
    }

    const role = user.role;

    if (role === "admin") {
        redirect("/dashboard/admin");
    }

    if (role === "trainer") {
        redirect("/dashboard/trainer");
    }

    redirect("/dashboard/user");
};

export default DashboardPage