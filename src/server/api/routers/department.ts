import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.department.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      return ctx.db.department.update({
        where: { id },
        data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.department.findMany();
  }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return ctx.db.department.findUnique({
        where: { id: input },
      });
    }),
});
