import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import UserSettingsProvider from "@/providers/UserSettingsProvider"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function MainLayout({
  children,
}) {
  return (
    <UserSettingsProvider>
      <SidebarProvider>
        <div className="flex flex-col md:flex-row min-h-screen w-full">
          {/* Sidebar: only visible on md and up */}
          <div className="hidden md:block w-64 min-h-screen">
            <AppSidebar />
          </div>
          {/* Main content always fills remaining space */}
          <SidebarInset className="flex-1">
            <div className="mb-4 md:hidden pt-2 px-3">
              <SidebarTrigger className="-ml-1 mb-2" />
              <Separator orientation="horizontal" className="mr-2 h-4" />
            </div>

            <div className="p-6">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserSettingsProvider>
  )
}
