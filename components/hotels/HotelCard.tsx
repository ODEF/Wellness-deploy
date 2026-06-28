import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Hotel = {
  id: string;
  name: string;
  slug: string;
  location: string;
  country: string;
  short_description: string | null;
  image_url: string | null;
  price_from: number | null;
  rating: number | null;
  is_featured: boolean;
};

export default async function HotelsList() {
  const supabase = await createClient();

  const { data: hotels, error } = await supabase
    .from("hotels")
    .select(
      `
      id,
      name,
      slug,
      location,
      country,
      short_description,
      image_url,
      price_from,
      rating,
      is_featured
      `
    )
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    return <p>Could not load hotels.</p>;
  }

  const hotelList = hotels as Hotel[];

  if (hotelList.length === 0) {
    return <p>No hotels found.</p>;
  }

  return (
    <section style={{ marginTop: "40px" }}>
      <h2>Featured Hotels</h2>

      <div style={{ display: "grid", gap: "24px", marginTop: "24px" }}>
        {hotelList.map((hotel) => (
          <article
            key={hotel.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            {hotel.image_url && (
              <img
                src={hotel.image_url}
                alt={hotel.name}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            )}

            <h3>{hotel.name}</h3>

            <p>
              {hotel.location}, {hotel.country}
            </p>

            {hotel.short_description && <p>{hotel.short_description}</p>}

            {hotel.rating !== null && <p>Rating: {hotel.rating}/5</p>}

            {hotel.price_from !== null && (
              <p>
                <strong>From ${hotel.price_from}</strong>
              </p>
            )}

            <Link href={`/hotels/${hotel.id}`}>View details</Link>
          </article>
        ))}
      </div>
    </section>
  );
}