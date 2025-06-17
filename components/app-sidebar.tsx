import type * as React from "react"
import {
  BookOpen,
  Calendar,
  Bot,
  Church,
} from "lucide-react"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { SidebarMenuItemsComponent } from "@/components/sidebar-menu-items-component"
import { SidebarMenuMinistriesComponent } from "@/components/sidebar-menu-ministries-component"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: "St. Leo",
      plan: "Enterprise",
    },
    {
      name: "St. Mary's",
      plan: "Startup",
    },
    {
      name: "St. John's",
      plan: "Free",
    },
  ],
  

  projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="w-64" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/today`}>
                  <Church />
                  <span>Today</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItemsComponent items={[{
              title: "Calendar",
              url: "#",
              icon: Calendar,
              isActive: false,
              items: [
                {
                  title: "Yearly",
                  url: "/calendar",
                },
                {
                  title: "Monthly",
                  url: "#",
                },
                {
                  title: "Weekly",
                  url: "#",
                },
              ],
            }]}/>
            <SidebarMenuItemsComponent items={[{
              title: "Resources",
              url: "#",
              icon: Bot,
              items: [
                {
                  title: "People",
                  url: "/people",
                },
                {
                  title: "Locations",
                  url: "/locations",
                },
                {
                  title: "Groups",
                  url: "/groups",
                },
              ],
            }]}/>
            <SidebarMenuMinistriesComponent/>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/ministries`}>
                  <BookOpen />
                  <span>Training</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/onboarding`}>
                  <BookOpen />
                  <span>Onboarding</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
