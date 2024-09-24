import { api, HydrateClient } from "@/trpc/server";

export default async function EmployeeList() {
  const employees = await api.employee.getAll();

  console.log('All Data:', employees);
  
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <table className="bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Telephone</th>
            <th className="px-4 py-2">Manager</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="border px-4 py-2">{emp.id}</td>
              <td className="border px-4 py-2">{emp.firstName} {emp.lastName}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              <td className="border px-4 py-2">{emp.telephone}</td>
              <td className="border px-4 py-2">{emp.manager ? `${emp.manager.name}` : 'No manager assigned'}</td>
              <td className="border px-4 py-2">{emp.status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </main>
    </HydrateClient>
  );
}