import AdminActivityLogs from "../../../components/admin/AdminActivityLogs";
import { getActivityLogs } from "../../../lib/admin/activityLogs";

export const dynamic = "force-dynamic";

export default async function AdminActivityPage() {
  const logs = await getActivityLogs();

  return <AdminActivityLogs logs={logs} />;
}