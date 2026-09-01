import AddClassForm from "@/components/dashboard/trainer/AddClassForm";

const AddClassPage = () => {
    return (
        <div className="mx-auto max-w-4xl space-y-7">

            {/* Page Header */}
            <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    Class Management
                </p>

                <h1 className="mt-2 font-display text-4xl font-bold uppercase text-foreground sm:text-5xl">
                    Add New Class
                </h1>

                <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-muted">
                    Create a fitness class and submit it for administrator
                    approval.
                </p>
            </div>

            <AddClassForm />

        </div>
    );
};

export default AddClassPage;