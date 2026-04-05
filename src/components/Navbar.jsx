"use client";

import { Wallet as WalletIcon, User as User2Icon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserRole } from "@/redux/userRoleSlice";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.userRole.role);

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full backdrop-blur-md backdrop-saturate-150 backdrop-filter">
      <div className="flex h-14 items-center justify-between px-3 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:size-10">
            <WalletIcon className="size-4 sm:size-5" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-base font-semibold tracking-tight sm:text-lg">
              Finance Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Track your financial activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <SidebarTrigger className="md:hidden" />

          <div className="lg:hidden">
            <ModeToggle />
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-2">
              <User2Icon className="size-4 text-muted-foreground" />

              <Select
                value={userRole}
                onValueChange={(value) => dispatch(setUserRole(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Badge
                variant={userRole === "admin" ? "default" : "secondary"}
                className="text-xs"
              >
                {userRole === "admin" ? "Full Access" : "View Only"}
              </Badge>
            </div>

            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
