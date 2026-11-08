import { getAuth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

type AuthMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

function handleAuthRequest(method: AuthMethod) {
  return async (request: Request) => {
    const auth = getAuth();
    return toNextJsHandler(auth)[method](request);
  };
}

export const GET = handleAuthRequest("GET");
export const POST = handleAuthRequest("POST");
export const PATCH = handleAuthRequest("PATCH");
export const PUT = handleAuthRequest("PUT");
export const DELETE = handleAuthRequest("DELETE");