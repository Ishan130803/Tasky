"use client";
import React, { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LucideFolders, PlusCircle } from "lucide-react";
import { GanttChart, InfoIcon, List } from "lucide-react";
import { signOut } from "next-auth/react";
import Header from "@/components/ui/dashboard/Header";
import Toolbar from "@/components/ui/dashboard/Toolbar";
type Props = {};

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const url = usePathname();

  return (
    <>
      <Header title={"Random"}></Header>
      <hr className="border-gray-300" />
      <Toolbar/>
      <div>{children}</div>
    </>
  );
}
