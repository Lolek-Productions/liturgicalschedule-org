import PersonForm from "../PersonForm";
import { createPerson } from "../person-actions";
import { redirect } from "next/navigation";

export default function CreatePersonPage() {
  async function handleCreate(formData) {
    "use server";
    await createPerson(formData);
    redirect("/people");
  }
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create Person</h1>
      <PersonForm onSubmit={handleCreate} />
    </div>
  );
}
