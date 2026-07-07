import ClientBooking from "../../../components/client/ClientBooking";
import { getClientProfile } from "../../../lib/client/profile";
import { getClientPets } from "../../../lib/client/pets";

export const dynamic = "force-dynamic";

export default async function ClientBookPage() {
  const [profile, pets] = await Promise.all([
    getClientProfile(),
    getClientPets(),
  ]);

  return <ClientBooking profile={profile} pets={pets} />;
}