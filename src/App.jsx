"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/pages/Dashboard";
import { Transactions } from "@/pages/Transactions";
import { Insights } from "@/pages/Insights";

import { useAppDispatch } from "@/redux/hooks";
import {
  setTransactions,
  setLoading,
  setError,
} from "@/redux/transactionsSlice";

import { supabase } from "@/lib/supabase";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

import gsap from "gsap";

export function App() {
  const dispatch = useAppDispatch();

  const [activeView, setActiveView] = React.useState("dashboard");

  const [loading, setLoadingState] = React.useState(true);

  const contentRef = React.useRef(null);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        dispatch(setLoading(true));

        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;

        dispatch(setTransactions(data || []));
      } catch (error) {
        dispatch(setError("Failed to load transactions"));
        console.error(error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchTransactions();
  }, [dispatch]);

  React.useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
      );
    }
  }, [activeView]);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "insights":
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="bg-background flex min-h-svh items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="size-8" />
          <p className="text-muted-foreground text-sm">
            Loading your financial data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-svh w-full">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />

        <SidebarInset className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex-1 p-6">
            <div ref={contentRef}>{renderContent()}</div>
          </main>
        </SidebarInset>
      </div>

      <Toaster />
    </SidebarProvider>
  );
}

export default App;
