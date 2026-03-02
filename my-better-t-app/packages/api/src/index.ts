import { ORPCError, os } from "@orpc/server";

import type { Context } from "./context";

// oRPC setup: context + procédures de base pour tous les points de terminaison API.
// Déclarer publicProcedure et protectedProcedure ici, pour les réutiliser dans les routeurs.
// Ne pas déclarer les routeurs ici, pour éviter les problèmes de dépendances circulaires.
// Ne déclarez pas les routeurs ici!

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }
  return next({
    context: {
      session: context.session,
    },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuth);

export { appRouter, type AppRouter, type AppRouterClient } from "./routers/index";