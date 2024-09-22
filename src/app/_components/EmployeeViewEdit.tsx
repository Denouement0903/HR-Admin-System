import { api, HydrateClient } from "@/trpc/server";

export default async function EmployeeList() {
  // Fetch employees directly from the procedure
  const employees = await api.employee.getAll();

  console.log('All Data:', employees);
  
  // Prefetch latest posts
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

// "use client"; // Ensure this is a client component

// import { api, HydrateClient } from "@/trpc/server";
// import { useEffect, useState } from "react";

// export default function EmployeeViewEdit({ id }: { id: string }) {
//   const { data: employee, refetch } = api.employee.getById.useQuery(id);
//   const updateEmployee = api.employee.update.useMutation();
//   const deleteEmployee = api.employee.delete.useMutation();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     telephone: null as number | null,
//     status: true,
//   });

//   useEffect(() => {
//     if (employee) {
//       setFormData({
//         firstName: employee.firstName,
//         lastName: employee.lastName,
//         email: employee.email,
//         telephone: employee.telephone,
//         status: employee.status,
//       });
//     }
//   }, [employee]);

//   const handleUpdate = async () => {
//     await updateEmployee.mutateAsync({
//       id: id, ...formData,
//       departments: []
//     });
//     refetch(); // Refetch to get updated data
//   };

//   const handleDelete = async () => {
//     await deleteEmployee.mutateAsync(id);
//     // Optionally, redirect or show a success message
//   };

//   return (
//     <HydrateClient>
//       <div>
//         <h1>Edit Employee</h1>
//         <form onSubmit={handleUpdate}>
//           <input
//             type="text"
//             value={formData.firstName}
//             onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             placeholder="First Name"
//             required
//           />
//           <input
//             type="text"
//             value={formData.lastName}
//             onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             placeholder="Last Name"
//             required
//           />
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="number"
//             value={formData.telephone || ""}
//             onChange={(e) => setFormData({ ...formData, telephone: Number(e.target.value) })}
//             placeholder="Telephone"
//           />
//           <label>
//             <input
//               type="checkbox"
//               checked={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
//             />
//             Active
//           </label>
//           <button type="submit">Update Employee</button>
//           <button type="button" onClick={handleDelete}>Delete Employee</button>
//         </form>
//       </div>
//     </HydrateClient>
//   );
// }
