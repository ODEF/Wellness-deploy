import { createClient } from "@supabase/supabase-js";

export type ActivityLog = {
  id: string;
  entity_type: string;
  entity_id: string | null;
  client_id: string | null;
  action: string;
  actor_type: string;
  actor_name: string | null;
  title: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type ActivityLogFilters = {
  clientId?: string;
  fromTime?: string;
  toTime?: string;
};

const LOG_TIME_ZONE = "Asia/Tbilisi";

function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function timeToMinutes(value?: string) {
  if (!value) {
    return null;
  }

  const [hours, minutes] = value.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
}

function getLogMinutesInTbilisi(createdAt: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LOG_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(createdAt));

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? 0,
  );

  return hour * 60 + minute;
}

function isInsideTimeRange(
  log: ActivityLog,
  fromTime?: string,
  toTime?: string,
) {
  const fromMinutes = timeToMinutes(fromTime);
  const toMinutes = timeToMinutes(toTime);

  if (fromMinutes === null || toMinutes === null) {
    return true;
  }

  const logMinutes = getLogMinutesInTbilisi(log.created_at);

  if (fromMinutes <= toMinutes) {
    return logMinutes >= fromMinutes && logMinutes <= toMinutes;
  }

  return logMinutes >= fromMinutes || logMinutes <= toMinutes;
}

export async function getActivityLogs(
  filters: ActivityLogFilters = {},
): Promise<ActivityLog[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("activity_logs")
    .select(
      "id, entity_type, entity_id, client_id, action, actor_type, actor_name, title, description, metadata, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (filters.clientId) {
    query = query.eq("client_id", filters.clientId);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).filter((log) =>
    isInsideTimeRange(log, filters.fromTime, filters.toTime),
  );
}