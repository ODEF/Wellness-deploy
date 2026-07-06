import ClientDashboardShell from "../../../components/client/ClientDashboardShell";
import { getClientAppointments } from "../../../lib/client/appointments"

export const dynamic = "force-dynamic";

export default async function ClientAppointmentsPage() {
  const appointments = await getClientAppointments();

  return (
    <ClientDashboardShell
      activePage="Appointments"
      appointments={appointments}
    />
  );
}