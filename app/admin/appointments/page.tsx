import AdminAppointments from "../../../components/admin/AdminAppointments";
import { getClientAppointments } from "../../../lib/clients/appointments";

export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const appointments = await getClientAppointments();

  return <AdminAppointments appointments={appointments} />;
}