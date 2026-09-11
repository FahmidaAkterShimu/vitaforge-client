import ManageClassesTable from "@/components/dashboard/admin/classes/ManageClassesTable";
import { getAdminClasses } from "@/lib/api/admin";

const ManageClassesPage = async () => {
    const response = await getAdminClasses({
        page: 1,
        limit: 10,
        status: "all",
    });

    const classes =
        response?.success && Array.isArray(response?.data)
            ? response.data
            : [];

    return (
        <ManageClassesTable
            initialClasses={classes}
            initialPagination={response?.pagination || {}}
        />
    );
};

export default ManageClassesPage;