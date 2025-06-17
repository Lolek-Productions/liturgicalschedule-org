import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppProviderWrapper from "@/providers/AppProvider"

export default function MainLayout({
  children,
}) {
  return (
    <AppProviderWrapper>
      <SidebarProvider>
        <AppSidebar />
        <main>
          {children}
        </main>
      </SidebarProvider>
    </AppProviderWrapper>
  )
}
