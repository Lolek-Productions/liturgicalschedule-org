import ListView from "./list-view";
import { MainHeader } from "@/components/main-header";

export default function PeoplePage({ searchParams }) {
  return (
    <div className="flex-1 flex flex-col">
      <MainHeader 
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "People", active: true }
        ]}
      />
      <ListView searchParams={searchParams} />
    </div>
  );
}
