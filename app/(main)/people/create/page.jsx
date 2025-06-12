import PersonForm from "../PersonForm";
import { createPerson } from "../person-actions";
import { redirect } from "next/navigation";
import { MainHeader } from "@/components/main-header";

export default function CreatePersonPage() {
  async function handleCreate(formData) {
    "use server";
    await createPerson(formData);
    redirect("/people");
  }
  return (
    <div className="flex-1 flex flex-col">
      <MainHeader 
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "People", href: "/people" },
          { label: "Create Person", active: true }
        ]}
      />
      <PersonForm onSubmit={handleCreate} />
    </div>
  );
}
