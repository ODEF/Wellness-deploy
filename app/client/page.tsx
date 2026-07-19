import ClientDashboardShell from "../../components/client/ClientDashboardShell";
import { getClientProfile } from "../../lib/clients/profile";

export const dynamic = "force-dynamic";

export default async function ClientPage() {
  const profile = await getClientProfile();

  return <ClientDashboardShell activePage="Dashboard" profile={profile} />;
}