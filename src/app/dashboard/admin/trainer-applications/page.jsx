import TrainerApplicationTable from "@/components/dashboard/admin/applications/TrainerApplicationTable";
import { getTrainerApplications } from "@/lib/api/admin";

const TrainerApplicationsPage = async () => {
    const response = await getTrainerApplications();

    const applications =
        response?.success && Array.isArray(response?.data)
            ? response.data
            : [];

    return (
        <TrainerApplicationTable
            initialApplications={applications}
        />
    );
};

export default TrainerApplicationsPage;