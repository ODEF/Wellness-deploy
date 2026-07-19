import ClientBooking from "../../../components/client/ClientBooking";
import { getClientProfile } from "../../../lib/clients/profile";
import { getClientPets } from "../../../lib/clients/pets";
import { getActiveBookingServices } from "../../../lib/clients/services";

export const dynamic = "force-dynamic";

export default async function ClientBookPage() {
  const [profile, pets, services] = await Promise.all([
    getClientProfile(),
    getClientPets(),
    getActiveBookingServices(),
  ]);

  return (
    <ClientBooking
      profile={profile}
      pets={pets}
      services={services}
    />
  );
}