import { rpcClient, fetchTransport } from "typed-rpc";
import type { Procedures } from "@/api";

declare global {
  interface Window {
    Clerk?: { session?: { getToken: () => Promise<string | null> } };
  }
}

async function getApiHeaders(): Promise<Record<string, string>> {
  const token = await window.Clerk?.session?.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const transport = fetchTransport({
  url: "/api",
  getHeaders: getApiHeaders,
});

export const client = rpcClient<Procedures>({ transport });

export type inferRPCOutputType<K extends keyof Procedures> =
  Procedures[K] extends (...args: never[]) => Promise<infer R> ? R : never;
