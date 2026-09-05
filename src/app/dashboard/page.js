import { redirect } from "next/navigation";

import getUserSession from "@/lib/core/session";

const DashboardPage = async () => {
    const user = await getUserSession();

    if (!user) {
        redirect("/login");
    }

    switch (user.role) {
        case "admin":
            redirect("/dashboard/admin");

        case "trainer":
            redirect("/dashboard/trainer");

        case "user":
            redirect("/dashboard/user");

        default:
            redirect("/unauthorized");
    }
};

export default DashboardPage