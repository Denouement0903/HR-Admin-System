import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { isHRAdmin, isManagerOrHRAdmin, isEmployee } from "@/utils/auth";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const isPasswordValid = await bcrypt.compare(input.password, user.password);
      if (!isPasswordValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    await isHRAdmin(ctx);
    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return users;
  }),
  getEmployees: protectedProcedure.query(async ({ ctx }) => {
    const { user } = await isManagerOrHRAdmin(ctx);
    let employees;
    if (user.role === "hradmin") {
      employees = await ctx.db.employee.findMany();
    } else {
      employees = await ctx.db.employee.findMany({
        where: { managerId: user.id },
      });
    }
    return employees;
  }),
  updateEmployee: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          telephone: z.number().optional(),
          email: z.string().email().optional(),
          status: z.boolean().optional(),
          managerId: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await isHRAdmin(ctx);
      const updatedEmployee = await ctx.db.employee.update({
        where: { id: input.id },
        data: input.data,
      });
      return updatedEmployee;
    }),
});