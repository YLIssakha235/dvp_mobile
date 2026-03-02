import {prisma} from "@my-better-t-app/db"; 
import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../index";

const AssetType = z.enum(["IMAGE", "VIDEO", "OTHER"]);

const listByIncidentInput = z.object({
  incidentId: z.string().min(1),
});

const createInput = z.object({
  incidentId: z.string().min(1),
  type: AssetType.optional(), // image par defaut 
  url: z.string().url(),
  filename: z.string().optional(),
  mimeType: z.string().optional(),
  sizeBytes: z.number().int().nonnegative().optional(),
});

const deleteInput = z.object({
  id: z.string().min(1),
});

const assetInclude = {
  createdBy: { select: { id: true, name: true, role: true } },
} as const;

export default {

  listByIncident: publicProcedure
    .input(listByIncidentInput)
    .handler(async ({ input }) => {
      return prisma.asset.findMany({
        where: { incidentId: input.incidentId },
        orderBy: { createdAt: "desc" },
        include: assetInclude,
      });
    }),

  
  create: protectedProcedure.input(createInput).handler(async ({ input, context }) => {
    const userId = context.session!.user.id;

    // Vérifie que l'incident existe 
    const incidentExists = await prisma.incident.findUnique({
      where: { id: input.incidentId },
      select: { id: true },
    });
    if (!incidentExists) {
      throw new Error("Incident not found");
    }

    return prisma.asset.create({
      data: {
        incidentId: input.incidentId,
        type: input.type ?? "IMAGE",
        url: input.url,
        filename: input.filename,
        mimeType: input.mimeType,
        sizeBytes: input.sizeBytes,
        createdById: userId,
      },
      include: assetInclude,
    });
  }),

 
  delete: protectedProcedure.input(deleteInput).handler(async ({ input, context }) => {
    const userId = context.session!.user.id;

    // check simple 
    const asset = await prisma.asset.findUnique({
      where: { id: input.id },
      select: { id: true, createdById: true },
    });
    if (!asset) throw new Error("Asset not found");

    // si createdById est défini, seul le propriétaire supprime 
    if (asset.createdById && asset.createdById !== userId) {
      throw new Error("Not allowed");
    }

    return prisma.asset.delete({ where: { id: input.id } });
  }),
};