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
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import SignOutButton from "../signoutbutton/SignOutButton"
import Link from "next/link"
import { url } from "inspector"
import { getAuthSession } from "@/components/lib/nextauth"
import { User } from "next-auth"
import { UserType } from "@/components/lib/nextauth"

interface NavigationProps {
    user: UserType | null
}

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Chart",
        url: "#",
        icon: ChartNoAxesCombined,
        sub: {
            title: "Category Chart",
            url: "../charts/category/",
        }
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
      },
      {
        title: "Search",
        url: "#",
        icon: Search,
      },
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
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.sub && (
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href={item.sub.url}>
                              <span>{item.sub.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    )}
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