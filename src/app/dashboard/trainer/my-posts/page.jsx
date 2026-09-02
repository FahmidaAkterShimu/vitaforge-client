import MyForumPosts from "@/components/dashboard/trainer/MyForumPosts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyForumPostsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <MyForumPosts
            trainerId={session.user.id}
        />
    );
};

export default MyForumPostsPage;