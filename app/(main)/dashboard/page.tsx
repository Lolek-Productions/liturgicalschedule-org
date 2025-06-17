'use client'

import { MainHeader } from "@/components/main-header"
import { useAppContext } from '@/contexts/AppContextProvider';
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  const { user, userSettings, selectedParishId, selectedParish } = useAppContext();
  return (
    <div className="flex-1 flex flex-col">
      <MainHeader 
        breadcrumbs={[
          { label: "Building Your Application", href: "#" },
          { label: "Data Fetching", active: true }
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div>

          Cool!

          Selected Parish ID: {selectedParishId}

          Selected Parish: {selectedParish ? selectedParish.name : 'No parish selected'}

          User Settings: {JSON.stringify(userSettings)}

          Parish Details: {JSON.stringify(selectedParish)}

          User: {JSON.stringify(user)}

          Main Content
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </div>
  )
}
