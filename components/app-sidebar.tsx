"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Calendar,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Church,
  ChevronRight,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import { SidebarMenuItemsComponent } from "@/components/sidebar-menu-items-component"
import { SidebarMenuMinistriesComponent } from "@/components/sidebar-menu-ministries-component"

const navFirst = [
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    isActive: true,
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
  },
]

const navLast = [
  {
    title: "Resources",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Training",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Onboarding",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
]

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: "St. Leo",
      logo: Church,
      plan: "Enterprise",
    },
    {
      name: "St. Mary's",
      logo: Church,
      plan: "Startup",
    },
    {
      name: "St. John's",
      logo: Church,
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
            <SidebarMenuItemsComponent items={navFirst}/>
            <SidebarMenuMinistriesComponent/>
            <SidebarMenuItemsComponent items={navLast}/>
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
