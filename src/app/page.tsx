import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-black">
                Welcome to the HR Administration System
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-black">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-xl px-10 py-3 font-semibold no-underline transition border-2 border-black bg-[#1f2937] text-white hover:bg-white hover:text-black"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
