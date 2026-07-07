import ClientDashboardShell from "../../../components/client/ClientDashboardShell";
import { getClientProfile } from "../../../lib/client/profile";
import { getClientPets } from "../../../lib/client/pets";

export const dynamic = "force-dynamic";

export default async function ClientPetsPage() {
  const [profile, pets] = await Promise.all([
    getClientProfile(),
    getClientPets(),
  ]);

  return (
    <ClientDashboardShell
      activePage="My Pets"
      profile={profile}
      pets={pets}
    />
  );
}