import AllClassesClient from "@/components/classesPage/AllClassesClient";
import { getAllClasses } from "@/lib/api/classes";

const AllClassesPage = async () => {
    const classes = await getAllClasses("Approved");

    return (
        <main className="min-h-screen bg-background">
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                        Explore Classes
                    </p>

                    <h1 className="font-display text-4xl font-bold text-foreground">
                        Find Your Perfect Class
                    </h1>

                    <p className="mt-2 max-w-2xl text-muted">
                        Explore our fitness classes and find the right
                        training session for your goals.
                    </p>
                </div>

                {/* Search + Filter + Classes */}
                <AllClassesClient classes={classes} />
            </section>
        </main>
    );
};

export default AllClassesPage;
