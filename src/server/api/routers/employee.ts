import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { isHRAdmin, isManagerOrHRAdmin, isEmployee } from "@/utils/auth";
import { Prisma } from "@prisma/client";

export const employeeRouter = createTRPCRouter({
  // Create Employee
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        telephone: z.number().nullable(),
        email: z.string().email(),
        status: z.boolean(),
        departments: z.array(z.string()),
        managerId: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await isHRAdmin(ctx); // Ensure HR Admin authorization
      const { managerId, departments, ...employeeData } = input;

      const data: Prisma.EmployeeCreateInput = {
        ...employeeData,
        departments: {
          create: departments.map(departmentId => ({
            department: {
              connect: { id: departmentId }
            }
          })),
        },
        ...(managerId ? { manager: { connect: { id: managerId } } } : {}),
      };

      return ctx.db.employee.create({ data });
    }),

  // Get All Employees
  getAll: protectedProcedure.query(async ({ ctx }) => {
    await isManagerOrHRAdmin(ctx); // Ensure Manager or HR Admin access
    return ctx.db.employee.findMany({
      include: {
        departments: { include: { department: true } },
        manager: true,
      },
    });
  }),

  // Get Employee by ID
  getById: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      await isEmployee(ctx); // Ensure employee access
      return ctx.db.employee.findUnique({
        where: { id: input },
        include: { departments: { include: { department: true } } },
      });
    }),

  // Update Employee
  update: protectedProcedure
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
      await isHRAdmin(ctx); // Ensure HR Admin authorization
      const { id, departments, ...data } = input;

      await ctx.db.employee.update({
        where: { id },
        data: {
          ...data,
          departments: {
            deleteMany: {}, // Remove existing department connections
            create: departments.map(departmentId => ({
              department: { connect: { id: departmentId } },
            })),
          },
        },
      });

      return ctx.db.employee.findUnique({
        where: { id },
        include: { departments: { include: { department: true } } },
      });
    }),

  // Delete Employee
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await isHRAdmin(ctx); // Ensure HR Admin authorization
      return ctx.db.employee.delete({
        where: { id: input },
      });
    }),
});
