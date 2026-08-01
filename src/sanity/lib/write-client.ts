import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_WRITE_TOKEN;

export function getWriteClient() {
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN — add a write token from sanity.io/manage to .env.local"
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
