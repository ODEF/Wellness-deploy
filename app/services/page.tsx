import { createClient } from "../../lib/supabase/server";

type Service = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  price: number | null;
  duration_minutes: number | null;
};

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select(
      `
      id,
      name,
      slug,
      description,
      short_description,
      image_url,
      price,
      duration_minutes
      `
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Services</h1>
        <p>Could not load services.</p>
        <pre>{error.message}</pre>
      </main>
    );
  }

  const serviceList = services as Service[];

  return (
    <main style={{ padding: "40px" }}>
      <h1>Wellness Services</h1>
      <p>Choose from available wellness and relaxation services.</p>

      {serviceList.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          {serviceList.map((service) => (
            <article
              key={service.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.name}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "280px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              )}

              <h2>{service.name}</h2>

              {service.short_description && (
                <p>{service.short_description}</p>
              )}

              {service.duration_minutes !== null && (
                <p>Duration: {service.duration_minutes} minutes</p>
              )}

              {service.price !== null && (
                <p>
                  <strong>${service.price}</strong>
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}