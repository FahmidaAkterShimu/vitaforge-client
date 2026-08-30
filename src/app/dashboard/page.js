import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    const role = session.user.role;

    if (role === "admin") {
        redirect("/dashboard/admin");
    }

    if (role === "trainer") {
        redirect("/dashboard/trainer");
    }

    redirect("/dashboard/user");
}