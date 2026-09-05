import TrainerTable from "@/components/dashboard/admin/trainers/TrainerTable";
import { getAdminTrainers } from "@/lib/api/admin";

const TrainersPage = async ({
    searchParams,
}) => {
    const params = await searchParams;

    const search = params?.search || "";

    const response =
        await getAdminTrainers(search);

    const trainers =
        response?.success &&
            Array.isArray(response?.data)
            ? response.data
            : [];

    return (
        <TrainerTable
            initialTrainers={trainers}
            initialSearch={search}
        />
    );
};

export default TrainersPage;