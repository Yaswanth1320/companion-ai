"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .insert({
      ...formData,
      author,
    })
    .select();
  if (error || !data) {
    throw new Error(error.message);
  }
  return data[0];
};

export const getCompanions = async (params: GetAllCompanions = {}) => {
  const supabase = createSupabaseClient();

  const { limit = 20, page = 1, subject, topic, query: searchQuery } = params;

  let qb = supabase
    .from("companions")
    .select("*")
    .order("created_at", { ascending: false });

  if (subject) {
    if (Array.isArray(subject)) {
      qb = qb.in("subject", subject);
    } else {
      qb = qb.eq("subject", subject);
    }
  }

  if (topic) {
    if (Array.isArray(topic)) {
      qb = qb.in("topic", topic);
    } else {
      qb = qb.eq("topic", topic);
    }
  }

  if (searchQuery && searchQuery.trim()) {
    // Case-insensitive match on name or topic
    qb = qb.or(
      `name.ilike.%${searchQuery.trim()}%,topic.ilike.%${searchQuery.trim()}%`
    );
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  qb = qb.range(from, to);

  const { data, error } = await qb;
  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select("*")
    .eq("id", id);
  if (error || !data) {
    throw new Error(error.message);
  }
  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_active_companions" })) {
    limit = 3;
  } else if (has({ feature: "15_active_companions" })) {
    limit = 15;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length;

  if (companionCount >= limit) {
    return false;
  } else {
    return true;
  }
};

// Bookmarks
// export const addBookmark = async (companionId: string, path: string) => {
//   const { userId } = await auth();
//   if (!userId) return;
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase.from("bookmarks").insert({
//     companion_id: companionId,
//     user_id: userId,
//   });
//   if (error) {
//     throw new Error(error.message);
//   }
//   // Revalidate the path to force a re-render of the page

//   revalidatePath(path);
//   return data;
// };

// export const removeBookmark = async (companionId: string, path: string) => {
//   const { userId } = await auth();
//   if (!userId) return;
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from("bookmarks")
//     .delete()
//     .eq("companion_id", companionId)
//     .eq("user_id", userId);
//   if (error) {
//     throw new Error(error.message);
//   }
//   revalidatePath(path);
//   return data;
// };

// // It's almost the same as getUserCompanions, but it's for the bookmarked companions
// export const getBookmarkedCompanions = async (userId: string) => {
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from("bookmarks")
//     .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
//     .eq("user_id", userId);
//   if (error) {
//     throw new Error(error.message);
//   }
//   // We don't need the bookmarks data, so we return only the companions
//   return data.map(({ companions }) => companions);
// };
