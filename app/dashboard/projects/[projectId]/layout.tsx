"use client";
import React, { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LucideFolders, PlusCircle } from "lucide-react";
import { GanttChart, InfoIcon, List } from "lucide-react";
import Header from "@/components/ui/dashboard/Header";
import Toolbar from "@/components/ui/dashboard/Toolbar";
import { useActiveProject } from "@/context/ActiveProjectContextProvider";
type Props = {};

interface routeParams {
  params : {
    projectId : string
  }
}
interface ILayoutProps {
  children : React.ReactNode
  params : {
    projectId : string
  }
}



const Layout: React.FunctionComponent<ILayoutProps> = ({children,params}) => {

  const router = useRouter();
  const url = usePathname();
  const projectId = params.projectId;
  
  return (
    <>
      <Header title="Project Name"></Header>
      <Toolbar projectId={projectId}></Toolbar>
      <div className="w-full h-full">
        
        {children}
      </div>
    </>
  );
}
export default Layout;
