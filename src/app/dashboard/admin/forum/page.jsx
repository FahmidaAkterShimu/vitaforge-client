import AdminForumTable from "@/components/dashboard/admin/forum/AdminForumTable";
import { getAdminForumPosts } from "@/lib/api/admin";

const AdminForumPage = async () => {
    const response = await getAdminForumPosts();

    const posts =
        response?.success && Array.isArray(response?.data)
            ? response.data
            : [];

    return (
        <AdminForumTable initialPosts={posts} />
    );
};

export default AdminForumPage;