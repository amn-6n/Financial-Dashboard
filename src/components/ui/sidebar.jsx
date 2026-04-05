"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;

      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

const Sidebar = React.forwardRef(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            side={side}
            className="w-[var(--sidebar-width-mobile)] bg-sidebar p-0 text-sidebar-foreground"
            data-sidebar="mobile"
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group/sidebar-wrapper relative inline-flex h-svh w-[var(--sidebar-width)] flex-col border-r bg-sidebar text-sidebar-foreground"
        data-state={state}
        data-collapsible={collapsible}
        data-variant={variant}
        data-side={side}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    className={cn("h-7 w-7", className)}
    {...props}
  >
    <PanelLeftIcon />
    <span className="sr-only">Toggle Sidebar</span>
  </Button>
));
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    data-sidebar="rail"
    aria-label="Toggle Sidebar"
    className={cn(
      "absolute inset-y-0 z-20 hidden w-1 bg-sidebar-border/50 group-data-[state=collapsed]/sidebar-wrapper:inline-flex group-data-[state=collapsed]/sidebar-wrapper:flex-col group-data-[state=collapsed]/sidebar-wrapper:items-center group-data-[state=collapsed]/sidebar-wrapper:justify-center hover:bg-sidebar-border",
      className,
    )}
    {...props}
  />
));
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-svh w-full flex-col bg-background group-data-[state=collapsed]/sidebar-wrapper:bg-muted/40",
      className,
    )}
    {...props}
  />
));
SidebarInset.displayName = "SidebarInset";

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="content"
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-background p-4 group-data-[state=collapsed]/sidebar-wrapper:p-2",
      className,
    )}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group"
    className={cn(
      "overflow-hidden px-2 py-4 group-data-[state=collapsed]/sidebar-wrapper:px-1.5 group-data-[state=collapsed]/sidebar-wrapper:py-3",
      className,
    )}
    {...props}
  />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "px-2 py-1.5 text-xs font-medium text-sidebar-foreground/70 transition-[margin,opa] duration-200 group-data-[state=collapsed]/sidebar-wrapper:px-1.5 group-data-[state=collapsed]/sidebar-wrapper:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring transition-all outline-none group-data-[state=collapsed]/sidebar-wrapper:right-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-sm outline-none ring-sidebar-ring transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-data-[state=collapsed]/sidebar-wrapper:justify-center group-data-[state=collapsed]/sidebar-wrapper:p-0 group-data-[state=collapsed]/sidebar-wrapper:[&>span:last-child]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "border border-sidebar-border bg-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&.active]:border-sidebar-accent [&.active]:bg-sidebar-accent [&.active]:text-sidebar-accent-foreground",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[state=collapsed]/sidebar-wrapper:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        data-active={isActive}
        {...props}
      />
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef(
  ({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-action"
        className={cn(
          "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground/60 ring-sidebar-ring transition-all outline-none peer-hover/menu-button:text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          showOnHover &&
            "group-data-[state=collapsed]/sidebar-wrapper:hidden peer-hover/menu-button:text-sidebar-foreground group-focus-within/menu-item:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:peer-data-[active=true]/menu-button:opacity-100",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md bg-sidebar-primary px-1 text-xs font-medium text-sidebar-primary-foreground tabular-nums group-data-[state=collapsed]/sidebar-wrapper:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef(
  ({ className, showIcon = false, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" />}
      <Skeleton className="h-4 w-[100px] flex-1" />
    </div>
  ),
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    data-sidebar="separator"
    className={cn(
      "mx-2 my-2 bg-sidebar-border group-data-[state=collapsed]/sidebar-wrapper:mx-1",
      className,
    )}
    {...props}
  />
));
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="footer"
    className={cn(
      "flex flex-col gap-2 border-t border-sidebar-border bg-sidebar p-4 group-data-[state=collapsed]/sidebar-wrapper:border-none group-data-[state=collapsed]/sidebar-wrapper:bg-transparent group-data-[state=collapsed]/sidebar-wrapper:p-2",
      className,
    )}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="header"
    className={cn(
      "flex flex-col gap-2 border-b border-sidebar-border bg-sidebar p-4 group-data-[state=collapsed]/sidebar-wrapper:border-none group-data-[state=collapsed]/sidebar-wrapper:bg-transparent group-data-[state=collapsed]/sidebar-wrapper:p-2",
      className,
    )}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
