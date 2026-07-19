import AdminClients from "../../../components/admin/AdminClients";
import { getAdminClients } from "../../../lib/admin/clients";

export const dynamic = "force-dynamic";

export default async function AdminClientPage() {
  const clients = await getAdminClients();

  return <AdminClients clients={clients} />;
}