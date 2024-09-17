import { api, HydrateClient } from "@/trpc/server";

export default async function DepartmentCreateEdit() {

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Department Create / Edit</h1>
      </main>
    </HydrateClient>
  );
}
