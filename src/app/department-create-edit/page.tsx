import DepartmentForm from "@/app/_components/DepartmentForm";

export default function DepartmentCreateEdit() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Department</h1>
        <DepartmentForm />
      </div>
    </main>
  );
}