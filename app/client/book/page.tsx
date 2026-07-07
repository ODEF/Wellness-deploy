import ClientBooking from "../../../components/client/ClientBooking";
import { getClientProfile } from "../../../lib/client/profile";

export const dynamic = "force-dynamic";

export default async function ClientBookPage() {
  const profile = await getClientProfile();

  return <ClientBooking profile={profile} />;
}