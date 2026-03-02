import { createORPCClient } from "@orpc/client";
import { createORPCQueryHooks } from "@orpc/tanstack-query";
import type { AppRouter } from "@my-better-t-app/api";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const client = createORPCClient<AppRouter>({
  baseURL: "/api",
  fetch: (input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include",
    });
  },
});

export const orpc = createORPCQueryHooks(client);
