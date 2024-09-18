import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        telephone: z.number().nullable(),
        email: z.string().email(),
        status: z.boolean(),
        departments: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.employee.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          telephone: input.telephone,
          email: input.email,
          status: input.status,
          departments: {
            create: input.departments.map(departmentId => ({
              department: {
                connect: { id: departmentId }
              }
            })),
          },
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.employee.findMany({
      include: { departments: { include: { department: true } } },
    });
  }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return ctx.db.employee.findUnique({
        where: { id: input },
        include: { departments: { include: { department: true } } },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        telephone: z.number().nullable(),
        email: z.string().email(),
        status: z.boolean(),
        departments: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, departments, ...data } = input;
      
      // First, update the employee data
      await ctx.db.employee.update({
        where: { id },
        data: {
          ...data,
          departments: {
            deleteMany: {}, // Remove all existing department connections
          },
        },
      });

      // Then, create new department connections
      await ctx.db.employeeDepartments.createMany({
        data: departments.map(departmentId => ({
          employeeId: id,
          departmentId,
        })),
      });

      return ctx.db.employee.findUnique({
        where: { id },
        include: { departments: { include: { department: true } } },
      });
    }),
});