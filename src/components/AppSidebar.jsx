import {
  LayoutDashboard as LayoutDashboardIcon,
  ReceiptText as ReceiptTextIcon,
  TrendingUp as TrendingUpIcon,
  User as User2Icon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserRole } from "@/redux/userRoleSlice";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar({ activeView, onViewChange }) {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.userRole.role);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      value: "dashboard",
    },
    {
      title: "Transactions",
      icon: ReceiptTextIcon,
      value: "transactions",
    },
    {
      title: "Insights",
      icon: TrendingUpIcon,
      value: "insights",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    isActive={activeView === item.value}
                    onClick={() => onViewChange(item.value)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto md:hidden">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-2 py-1">
              <div className="flex items-center gap-2">
                <User2Icon className="size-4 text-muted-foreground" />
                <Select
                  value={userRole}
                  onValueChange={(value) => dispatch(setUserRole(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
