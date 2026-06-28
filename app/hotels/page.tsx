import Link from "next/link";
import { createClient } from "../../lib/supabase/server";

type Hotel = {
  id: string;
  name: string;
  slug: string;
  location: string;
  country: string;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  price_from: number | null;
  rating: number | null;
  is_featured: boolean;
};

export default async function HotelsPage() {
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
      description,
      short_description,
      image_url,
      price_from,
      rating,
      is_featured
      `
    )
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Hotels</h1>
        <p>Could not load hotels.</p>
        <pre>{error.message}</pre>
      </main>
    );
  }

  const hotelList = hotels as Hotel[];

  return (
    <main style={{ padding: "40px" }}>
      <h1>Wellness Hotels</h1>
      <p>Explore selected wellness hotels and retreats.</p>

      {hotelList.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "24px",
            marginTop: "24px",
          }}
        >
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
                    height: "280px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              )}

              <h2>{hotel.name}</h2>

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

              {hotel.is_featured && <p>Featured hotel</p>}

              <Link href={`/hotels/${hotel.id}`}>View details</Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}