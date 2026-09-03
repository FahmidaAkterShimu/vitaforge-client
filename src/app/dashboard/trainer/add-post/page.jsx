import AddForumPostForm from "@/components/dashboard/trainer/AddForumPostForm";
import getUserSession from "@/lib/core/session";

const AddForumPostPage = async () => {
    const user = await getUserSession();

    const trainer = {
        id: user.id,
        name: user.name,
        email: user.email,
    };

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            <AddForumPostForm trainer={trainer} />
        </section>
    );
};

export default AddForumPostPage;