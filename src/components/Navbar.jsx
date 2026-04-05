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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <WalletIcon className="size-5" />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Finance Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Track your financial activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />

          <div className="md:hidden">
            <ModeToggle />
          </div>

          <div className="hidden items-center gap-4 md:flex">
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
