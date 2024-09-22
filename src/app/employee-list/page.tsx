import EmployeeViewEdit from "../_components/EmployeeViewEdit";

export default async function EmployeeList() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <EmployeeViewEdit id={""} />
      </div>
    </main>
  );
}
