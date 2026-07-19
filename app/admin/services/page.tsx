import AdminServices from "../../../components/admin/AdminServices";
import { getAdminServices } from "../../../lib/admin/services";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getAdminServices();

  return <AdminServices services={services} />;
}