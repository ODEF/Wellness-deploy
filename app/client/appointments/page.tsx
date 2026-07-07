import ClientDashboardShell from "../../../components/client/ClientDashboardShell";
import { getClientAppointments } from "../../../lib/client/appointments";
import { getClientProfile } from "../../../lib/client/profile";

export const dynamic = "force-dynamic";

export default async function ClientAppointmentsPage() {
  const [appointments, profile] = await Promise.all([
    getClientAppointments(),
    getClientProfile(),
  ]);

  return (
    <ClientDashboardShell
      activePage="Appointments"
      appointments={appointments}
      profile={profile}
    />
  );
}