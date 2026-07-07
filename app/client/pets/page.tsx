import ClientDashboardShell from "../../../components/client/ClientDashboardShell";
import { getClientProfile } from "../../../lib/client/profile";

export const dynamic = "force-dynamic";

export default async function ClientPetsPage() {
  const profile = await getClientProfile();

  return <ClientDashboardShell activePage="My Pets" profile={profile} />;
}