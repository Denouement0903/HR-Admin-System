import { api, HydrateClient } from "@/trpc/server";

export default async function DepartmentList() {
  // Fetch departments directly from the procedure
  const departments = await api.department.getAll();
  
  // Prefetch latest posts
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Departments</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td className="border px-4 py-2">{dept.id}</td>
                  <td className="border px-4 py-2">{dept.name}</td>
                  <td className="border px-4 py-2">{dept.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </HydrateClient>
  );
}
