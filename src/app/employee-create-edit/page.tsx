import EmployeeForm from "@/app/_components/EmployeeForm";
import EmployeeViewEdit from "../_components/EmployeeViewEdit";

export default function EmployeeCreateEdit() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
        <EmployeeForm />
        <EmployeeViewEdit />
      </div>
    </main>
  );
}