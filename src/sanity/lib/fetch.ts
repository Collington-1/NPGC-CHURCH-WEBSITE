import type { QueryParams } from "next-sanity";

import { client } from "./client";

/**
 * Queries Sanity when a project is configured, otherwise (or on any error)
 * falls back to placeholder data so pages keep rendering before the CMS is wired up.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams,
  fallback: T
): Promise<T> {
  if (!client) return fallback;
  try {
    const result = await client.fetch<T>(query, params);
    if (result === null || (Array.isArray(result) && result.length === 0)) {
      return fallback;
    }
    return result;
  } catch (error) {
    console.error("Sanity query failed, using fallback data:", error);
    return fallback;
  }
}
