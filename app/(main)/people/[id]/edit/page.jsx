import PersonForm from "../../PersonForm";
import { getPerson, updatePerson } from "../../person-actions";
import { redirect } from "next/navigation";

export default async function EditPersonPage({ params }) {
  const person = await getPerson(params.id);
  async function handleUpdate(formData) {
    "use server";
    await updatePerson(params.id, formData);
    redirect("/main/people");
  }
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Person</h1>
      <PersonForm initialValues={person} onSubmit={handleUpdate} />
    </div>
  );
}
