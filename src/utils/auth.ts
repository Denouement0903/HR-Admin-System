import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";

interface AlertMessage {
  type: 'warning' | 'error';
  message: string;
}

export const checkUserRole = async (allowedRoles: string[]): Promise<{ user: any; alert?: AlertMessage }> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/?alert=' + encodeURIComponent(JSON.stringify({
      type: 'warning',
      message: "You need to be logged in to access this resource. Please sign in and try again."
    })));
  }
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/?alert=' + encodeURIComponent(JSON.stringify({
      type: 'error',
      message: `Access denied. Your current role (${session.user.role}) does not have permission to perform this action.`
    })));
  }
  return { user: session.user };
};

export const isHRAdmin = async (ctx: unknown) => checkUserRole(["hradmin"]);
export const isManagerOrHRAdmin = async (ctx: unknown) => checkUserRole(["manager", "hradmin"]);
export const isEmployee = async (ctx: unknown) => checkUserRole(["employee", "manager", "hradmin"]);