import AddForumPostForm from "@/components/dashboard/trainer/AddForumPostForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AddForumPostPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const trainer = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    };

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            <AddForumPostForm trainer={trainer} />
        </section>
    );
};

export default AddForumPostPage;