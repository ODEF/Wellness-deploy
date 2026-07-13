import AdminActivityLogs from "../../../components/admin/AdminActivityLogs";
import { getActivityLogs } from "../../../lib/admin/activityLogs";
import { getAdminClients } from "../../../lib/admin/clients";

export const dynamic = "force-dynamic";

type AdminActivityPageProps = {
  searchParams: Promise<{
    clientId?: string;
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
  }>;
};

export default async function AdminActivityPage({
  searchParams,
}: AdminActivityPageProps) {
  const filters = await searchParams;

  const [logs, clients] = await Promise.all([
    getActivityLogs(filters),
    getAdminClients(),
  ]);

  return (
    <AdminActivityLogs logs={logs} clients={clients} filters={filters} />
  );
}