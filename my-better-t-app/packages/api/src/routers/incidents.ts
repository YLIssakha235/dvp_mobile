import {prisma} from "@my-better-t-app/db"; // <- ou { prisma } selon ton export
import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../index";

const IncidentStatus = z.enum([
  "OPEN",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "APPROVED",
  "READY_TO_EXPORT",
  "EXPORTED",
]);

const IncidentPriority = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

const listInput = z
  .object({
    status: IncidentStatus.optional(),
    take: z.number().int().min(1).max(100).default(30),
    skip: z.number().int().min(0).default(0),
  })
  .optional();

const createInput = z.object({
  title: z.string().min(3),
  description: z.string().min(1),
  priority: IncidentPriority.optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  locationLabel: z.string().optional(),
});

const idInput = z.object({ id: z.string() });

const incidentInclude = {
  createdBy: { select: { id: true, name: true, role: true } },
  assignedTo: { select: { id: true, name: true, role: true } },
} as const;

export default {
  // Public list with pagination + optional status filter
  list: publicProcedure.input(listInput).handler(async ({ input }) => {
    const take = input?.take ?? 30;
    const skip = input?.skip ?? 0;

    return prisma.incident.findMany({
      where: input?.status ? { status: input.status } : undefined,
      orderBy: { createdAt: "desc" },
      take,
      skip,
      include: incidentInclude,
    });
  }),

  // Create (must be authenticated)
  create: protectedProcedure.input(createInput).handler(async ({ input, context }) => {
    const userId = context.session!.user.id;

    return prisma.incident.create({
      data: {
        title: input.title,
        description: input.description,
        priority: input.priority ?? "MEDIUM",
        latitude: input.latitude,
        longitude: input.longitude,
        locationLabel: input.locationLabel,
        createdById: userId,
      },
      include: incidentInclude,
    });
  }),

  // Get by id
  getById: publicProcedure.input(idInput).handler(async ({ input }) => {
    return prisma.incident.findUnique({
      where: { id: input.id },
      include: incidentInclude,
    });
  }),

  // (Admin list without pagination (attention)
  listAll: protectedProcedure.handler(async () => {
    return prisma.incident.findMany({
      orderBy: { createdAt: "desc" },
      include: incidentInclude,
    });
  }),
};