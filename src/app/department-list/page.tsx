import { api, HydrateClient } from "@/trpc/server";

export default async function DepartmentList() {

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Department List</h1>
      </main>
    </HydrateClient>
  );
}
