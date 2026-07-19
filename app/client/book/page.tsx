import ClientBooking from "../../../components/client/ClientBooking";
import { getClientProfile } from "../../../lib/clients/profile";
import { getClientPets } from "../../../lib/clients/pets";

export const dynamic = "force-dynamic";

export default async function ClientBookPage() {
  const [profile, pets] = await Promise.all([
    getClientProfile(),
    getClientPets(),
  ]);

  return <ClientBooking profile={profile} pets={pets} />;
}