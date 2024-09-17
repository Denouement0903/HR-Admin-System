import { api, HydrateClient } from "@/trpc/server";

export default async function EmployeeCreateEdit() {

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1> Employee Create / Edit</h1>
      </main>
    </HydrateClient>
  );
}
