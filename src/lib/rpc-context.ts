import { getAuth } from "@clerk/express";
import type { Request } from "express";

let currentAuth: ReturnType<typeof getAuth> | null = null;

export function setRpcContext(req: Request) {
  currentAuth = getAuth(req);
}

export function clearRpcContext() {
  currentAuth = null;
}

export function getRpcAuth() {
  return currentAuth;
}
