import ClientDashboardShell from "../../../components/client/ClientDashboardShell";
import { getClientProfile } from "../../../lib/clients/profile";

export const dynamic = "force-dynamic";

export default async function ClientSettingsPage() {
  const profile = await getClientProfile();

  return <ClientDashboardShell activePage="Settings" profile={profile} />;
}