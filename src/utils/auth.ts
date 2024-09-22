import { TRPCError } from "@trpc/server";
import { getServerAuthSession } from "@/server/auth";

export const checkUserRole = async (allowedRoles: string[]) => {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  if (!allowedRoles.includes(session.user.role)) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return session.user;
};

export const isHRAdmin = async (ctx: unknown) => checkUserRole(["hradmin"]);
export const isManagerOrHRAdmin = async (ctx: unknown) => checkUserRole(["manager", "hradmin"]);
export const isEmployee = async (ctx: unknown) => checkUserRole(["employee", "manager", "hradmin"]);