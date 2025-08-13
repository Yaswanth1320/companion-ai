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
