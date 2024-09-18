"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function DepartmentForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createDepartment = api.department.create.useMutation({
    onSuccess: () => {
      setName("");
      setStatus("Active");
      setSuccess(true);
      setError(null);
      console.log("Department created successfully");
    },
    onError: (error) => {
      setError(error.message);
      setSuccess(false);
      console.error("Error creating department:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with:", { name, status });
    setError(null);
    setSuccess(false);
    createDepartment.mutate({
      name,
      status
    });
  };

  const isLoading = createDepartment.status === "pending";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">Department created successfully!</div>}
      <div>
        <label htmlFor="name" className="block mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="status" className="block mb-2">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Department'}
      </button>
    </form>
  );
}