import {Calendar, Home, Search, ChartNoAxesCombined, Settings} from "lucide-react"
import {ChevronUp, User2} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { signOut } from "next-auth/react"
import SignOutButton from "../signoutbutton/SignOutButton"
import Link from "next/link"
import { url } from "inspector"
import { getAuthSession } from "@/components/lib/nextauth"
import { User } from "next-auth"
import { UserType } from "@/components/lib/nextauth"
import { title } from "process"

interface NavigationProps {
    user: UserType | null
}

const Chartitem = {
  title: "Chart",
  url: "#",
  icon: ChartNoAxesCombined,
  sub: [
    {
      title: "Category Chart",
      url: "../charts/category/",
    },
    {
      title: "Gender Chart",
      url: "../charts/gender/",
    },
    {
      title: "Grade Chart",
      url: "../charts/grade/",
    },
    {
      title: "PlayFreq Chart",
      url: "../charts/playfreq/",
    },
    {
      title: "ViewingFreq Chart",
      url: "../charts/viewingfreq/",
    },
    {
      title: "SpecialViewingFreq Chart",
      url: "../charts/sp_viewingfreq/",
    },
    {
      title: "Age Chart",
      url: "../charts/age/",
    },
    {
      title: "Department Chart",
      url: "../charts/department/",
    },
    {
      title: "AttendanceCount Chart",
      url: "../charts/attendancecount/",
    },
    {
      title: "DaySales Chart",
      url: "../charts/daysales/",
    },
    {
      title: "SalesByTimeSlot Chart",
      url: "../charts/salesbytimeslot/",
    },
    {
      title: "referral_source Chart",
      url: "../charts/refsource/",
    },
    {
      title: "All Chart",
      url: "../charts/allchart/",
    },
  ]
}


const items = [
      {
        title: "Settings",
        url: "../settings/profile/",
        icon: Settings,
      },
]

const MySidebar = ({ user }:NavigationProps) => {
    return (
      <Sidebar variant="floating" collapsible="offcanvas">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key="Home">
                  <SidebarMenuButton asChild>
                    <a href="/">
                      <Home />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                { user ? (
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem key="Chart">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <ChartNoAxesCombined />
                          <span>Chart</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {Chartitem.sub.map((subItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <></>
                )}
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2/> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radic-popper-anchor-width]"
                >{user ? (
                  <>
                    <DropdownMenuItem>
                      <Link href="/settings/profile/">Account</Link>
                    </DropdownMenuItem>
                    <SignOutButton />
                  </>
                ) : (
                  <DropdownMenuItem>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }

export default MySidebar