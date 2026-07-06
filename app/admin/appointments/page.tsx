import AdminAppointments from "../../../components/admin/AdminAppointments";
import { getClientAppointments } from "../../../lib/client/appointments";

export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const appointments = await getClientAppointments();

  return <AdminAppointments appointments={appointments} />;
}