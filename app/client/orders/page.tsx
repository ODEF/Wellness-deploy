import ClientDashboardShell from "../../../components/client/ClientDashboardShell";
import { getClientProfile } from "../../../lib/clients/profile";

export const dynamic = "force-dynamic";

export default async function ClientOrdersPage() {
  const profile = await getClientProfile();

  return <ClientDashboardShell activePage="Orders" profile={profile} />;
}