import AdminShell from "../../components/admin/AdminShell";
import { getClientAppointments } from "../../lib/clients/appointments";
import { getAdminClients } from "../../lib/admin/clients";
import { getActivityLogs } from "../../lib/admin/activityLogs";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [appointments, clients, activityLogs] = await Promise.all([
    getClientAppointments(),
    getAdminClients(),
    getActivityLogs(),
  ]);

  return (
    <AdminShell
      appointments={appointments}
      clients={clients}
      activityLogs={activityLogs}
    />
  );
}