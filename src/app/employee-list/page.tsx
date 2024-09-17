import { api, HydrateClient } from "@/trpc/server";

export default async function EmployeeList() {

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Employee List</h1>
      </main>
    </HydrateClient>
  );
}
