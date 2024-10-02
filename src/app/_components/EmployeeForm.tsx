"use client"
import { useState } from "react";
import { api } from "@/trpc/react";

export default function EmployeeForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState<string>("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [managerId, setManagerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: departments } = api.department.getAll.useQuery();
  const { data: managers } = api.user.getAll.useQuery();

  const createEmployee = api.employee.create.useMutation({
    onSuccess: () => {
      setFirstName("");
      setLastName("");
      setTelephone("");
      setEmail("");
      setStatus(true);
      setSelectedDepartments([]);
      setManagerId(null);
      setSuccess(true);
      setError(null);
      console.log("Employee created successfully");
    },
    onError: (error) => {
      setError(error.message);
      setSuccess(false);
      console.error("Error creating employee:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with:", { firstName, lastName, telephone, email, status, selectedDepartments, managerId });
    setError(null);
    setSuccess(false);
    createEmployee.mutate({
      firstName,
      lastName,
      telephone: telephone ? parseInt(telephone, 10) : null,
      email,
      status,
      departments: selectedDepartments,
      managerId,
    });
  };

  const isLoading = createEmployee.status === "pending";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">Employee created successfully!</div>}
      <div>
        <label htmlFor="firstName" className="block mb-2">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block mb-2">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="telephone" className="block mb-2">Telephone</label>
        <input
          type="tel"
          id="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="status" className="block mb-2">Status</label>
        <select
          id="status"
          value={status.toString()}
          onChange={(e) => setStatus(e.target.value === "true")}
          className="w-full p-2 border rounded"
          required
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <div>
        <label className="block mb-2">Departments</label>
        {departments?.map((dept) => (
          <div key={dept.id} className="flex items-center">
            <input
              type="checkbox"
              id={`dept-${dept.id}`}
              value={dept.id}
              checked={selectedDepartments.includes(dept.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDepartments([...selectedDepartments, dept.id]);
                } else {
                  setSelectedDepartments(selectedDepartments.filter(id => id !== dept.id));
                }
              }}
              className="mr-2"
            />
            <label htmlFor={`dept-${dept.id}`}>{dept.name}</label>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="manager" className="block mb-2">Manager</label>
        <select
          id="manager"
          value={managerId || ""}
          onChange={(e) => setManagerId(e.target.value || null)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a User as manager</option>
          {managers?.map((manager) => (
            <option key={manager.id} value={manager.id}>
              {manager.name}
            </option>
          ))}
        </select>
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Employee'}
      </button>
    </form>
  );
}