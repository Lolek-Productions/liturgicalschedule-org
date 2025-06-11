import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import UserSettingsProvider from "@/providers/UserSettingsProvider"

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
          <SidebarInset className="flex-1 p-6">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserSettingsProvider>
  )
}
