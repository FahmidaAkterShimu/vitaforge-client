import MyForumPosts from "@/components/dashboard/trainer/MyForumPosts";
import getUserSession from "@/lib/core/session";

const MyForumPostsPage = async () => {
    const user = await getUserSession();

    return (
        <MyForumPosts
            trainerId={user.id}
        />
    );
};

export default MyForumPostsPage;