import PersonForm from "../../PersonForm";
import { getPerson, updatePerson } from "../../person-actions";
import { redirect } from "next/navigation";
import { MainHeader } from "@/components/main-header";

export default async function EditPersonPage({ params }) {
  const { id } = await params;

  const person = await getPerson(id);
  async function handleUpdate(formData) {
    "use server";
    await updatePerson(id, formData);
    redirect("/people");
  }
  return (
    <div className="flex-1 flex flex-col">
      <MainHeader 
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "People", href: "/people" },
          { label: "Edit Person", active: true }
        ]}
      />
      <PersonForm initialValues={person} onSubmit={handleUpdate} />
    </div>
  );
}
