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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserRole } from "@/redux/userRoleSlice";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.userRole.role);

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
            <WalletIcon className="size-5" />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Finance Dashboard
            </h1>
            <p className="text-muted-foreground text-xs">
              Track your financial activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User2Icon className="text-muted-foreground size-4" />

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
    </nav>
  );
}
