import type { RouterClient } from "@orpc/server";

import { protectedProcedure, publicProcedure } from "../index";


import incidents from "./incidents";
import assets from "./assets";

// Routeur API principal: on enregistre tous les routeurs d'API ici, et on exporte le type AppRouter pour que le client puisse l'utiliser.
// Ceci est le point d'entrée pour les points de terminaison API de l'application.


export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  // routeurs d'API
  incidents,
  assets,

  
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
