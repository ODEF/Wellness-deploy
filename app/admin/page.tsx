import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../../lib/supabase/server";
import "./admin.css";

type ContactMessage = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  is_active: boolean | null;
  created_at: string | null;
};

type SiteSetting = {
  id: string;
  key: string;
  value: string;
};

async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/");
  }

  return supabase;
}

async function updateContactMessage(formData: FormData) {
  "use server";

  const supabase = await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "new");

  if (!id) return;

  await supabase
    .from("contact_messages")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin");
}

async function deleteContactMessage(formData: FormData) {
  "use server";

  const supabase = await requireAdmin();

  const id = String(formData.get("id") || "");

  if (!id) return;

  await supabase.from("contact_messages").delete().eq("id", id);

  revalidatePath("/admin");
}

async function createService(formData: FormData) {
  "use server";

  const supabase = await requireAdmin();

  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const priceValue = String(formData.get("price") || "");
  const imageUrl = String(formData.get("image_url") || "");
  const isActive = formData.get("is_active") === "on";

  if (!title) return;

  await supabase.from("services").insert({
    title,
    description,
    price: priceValue ? Number(priceValue) : null,
    image_url: imageUrl || null,
    is_active: isActive,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function updateService(formData: FormData) {
  "use server";

  const supabase = await requireAdmin();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const priceValue = String(formData.get("price") || "");
  const imageUrl = String(formData.get("image_url") || "");
  const isActive = formData.get("is_active") === "on";

  if (!id || !title) return;

  await supabase
    .from("services")
    .update({
      title,
      description,
      price: priceValue ? Number(priceValue) : null,
      image_url: imageUrl || null,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteService(formData: FormData) {
  "use server";

  const supabase = await requireAdmin();

  const id = String(formData.get("id") || "");

  if (!id) return;

  await supabase.from("services").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/");
}

async function updateSiteSetting(formData: FormData) {
  "use server";

  const supabase = await requireAdmin();

  const key = String(formData.get("key") || "");
  const value = String(formData.get("value") || "");

  if (!key) return;

  await supabase.from("site_settings").upsert(
    {
      key,
      value,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "key",
    }
  );

  revalidatePath("/admin");
  revalidatePath("/");
}

export default async function AdminPage() {
  const supabase = await requireAdmin();

  const [messagesResult, servicesResult, settingsResult] = await Promise.all([
    supabase
      .from("contact_messages")
      .select("id, name, email, phone, subject, message, status, created_at")
      .order("created_at", { ascending: false }),

    supabase
      .from("services")
      .select("id, title, description, price, image_url, is_active, created_at")
      .order("created_at", { ascending: false }),

    supabase
      .from("site_settings")
      .select("id, key, value")
      .order("key", { ascending: true }),
  ]);

  const messages = (messagesResult.data || []) as ContactMessage[];
  const services = (servicesResult.data || []) as Service[];
  const settings = (settingsResult.data || []) as SiteSetting[];

  return (
    <main className="adminPage">
      <section className="adminHero">
        <p className="adminEyebrow">Admin Panel</p>
        <h1>Website Management</h1>
        <p>
          Manage contact messages, wellness services, and homepage content from
          one place.
        </p>
      </section>

      <section className="adminSection">
        <div className="adminSectionHeader">
          <div>
            <p className="adminEyebrow">Messages</p>
            <h2>Contact Messages</h2>
          </div>
          <span className="adminCount">{messages.length}</span>
        </div>

        {messagesResult.error && (
          <p className="adminError">{messagesResult.error.message}</p>
        )}

        <div className="adminGrid">
          {messages.map((item) => (
            <article className="adminCard" key={item.id}>
              <div className="adminCardTop">
                <h3>{item.subject || "No subject"}</h3>
                <span className="adminBadge">{item.status || "new"}</span>
              </div>

              <p className="adminMuted">{item.name || "No name"}</p>
              <p className="adminMuted">{item.email || "No email"}</p>

              {item.phone && <p className="adminMuted">{item.phone}</p>}

              <p className="adminMessage">{item.message || "No message"}</p>

              {item.created_at && (
                <p className="adminDate">
                  {new Date(item.created_at).toLocaleString("en-GB")}
                </p>
              )}

              <form action={updateContactMessage} className="adminFormRow">
                <input type="hidden" name="id" value={item.id} />

                <select name="status" defaultValue={item.status || "new"}>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>

                <button type="submit">Update</button>
              </form>

              <form action={deleteContactMessage}>
                <input type="hidden" name="id" value={item.id} />
                <button className="dangerButton" type="submit">
                  Delete
                </button>
              </form>
            </article>
          ))}

          {messages.length === 0 && (
            <p className="adminEmpty">No contact messages yet.</p>
          )}
        </div>
      </section>

      <section className="adminSection">
        <div className="adminSectionHeader">
          <div>
            <p className="adminEyebrow">Services</p>
            <h2>Wellness Services</h2>
          </div>
          <span className="adminCount">{services.length}</span>
        </div>

        {servicesResult.error && (
          <p className="adminError">{servicesResult.error.message}</p>
        )}

        <form action={createService} className="adminCreateForm">
          <h3>Add New Service</h3>

          <input name="title" placeholder="Service title" required />
          <textarea name="description" placeholder="Service description" />
          <input name="price" type="number" step="0.01" placeholder="Price" />
          <input name="image_url" placeholder="Image URL" />

          <label className="adminCheckbox">
            <input name="is_active" type="checkbox" defaultChecked />
            Active
          </label>

          <button type="submit">Create Service</button>
        </form>

        <div className="adminList">
          {services.map((service) => (
            <article className="adminCard" key={service.id}>
              <form action={updateService} className="adminEditForm">
                <input type="hidden" name="id" value={service.id} />

                <label>
                  Title
                  <input
                    name="title"
                    defaultValue={service.title}
                    required
                  />
                </label>

                <label>
                  Description
                  <textarea
                    name="description"
                    defaultValue={service.description || ""}
                  />
                </label>

                <label>
                  Price
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={service.price ?? ""}
                  />
                </label>

                <label>
                  Image URL
                  <input
                    name="image_url"
                    defaultValue={service.image_url || ""}
                  />
                </label>

                <label className="adminCheckbox">
                  <input
                    name="is_active"
                    type="checkbox"
                    defaultChecked={Boolean(service.is_active)}
                  />
                  Active
                </label>

                <button type="submit">Save Changes</button>
              </form>

              <form action={deleteService}>
                <input type="hidden" name="id" value={service.id} />
                <button className="dangerButton" type="submit">
                  Delete Service
                </button>
              </form>
            </article>
          ))}

          {services.length === 0 && (
            <p className="adminEmpty">No services created yet.</p>
          )}
        </div>
      </section>

      <section className="adminSection">
        <div className="adminSectionHeader">
          <div>
            <p className="adminEyebrow">Content</p>
            <h2>Homepage Settings</h2>
          </div>
          <span className="adminCount">{settings.length}</span>
        </div>

        {settingsResult.error && (
          <p className="adminError">{settingsResult.error.message}</p>
        )}

        <div className="adminList">
          {settings.map((setting) => (
            <form
              action={updateSiteSetting}
              className="adminSettingForm"
              key={setting.id}
            >
              <label>
                Key
                <input name="key" defaultValue={setting.key} readOnly />
              </label>

              <label>
                Value
                <textarea name="value" defaultValue={setting.value} />
              </label>

              <button type="submit">Save Setting</button>
            </form>
          ))}
        </div>

        <form action={updateSiteSetting} className="adminCreateForm">
          <h3>Add New Setting</h3>

          <input name="key" placeholder="setting_key" required />
          <textarea name="value" placeholder="Setting value" required />

          <button type="submit">Add Setting</button>
        </form>
      </section>
    </main>
  );
}