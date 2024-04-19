"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LucideFolders, PlusCircle } from "lucide-react";
import { GanttChart, InfoIcon, List } from "lucide-react";
import { signOut } from "next-auth/react";
import Header from "@/components/ui/dashboard/Header";
import Toolbar from "@/components/ui/dashboard/Toolbar";
import { useProjectContext } from "@/context/context";
import { Project } from "@/types/projects";
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
  //@ts-ignore
  const {projects,setProjects} = useProjectContext();
  const [project,setProject] = useState<Project>();
  const [title,setTitle] = useState<string>('Title');
  
  const projectId = params.projectId;
  useEffect(()=>{
    //@ts-ignore
    projects.filter((project)=>{
      if(project.projectid===projectId){
        setProject(project);
        setTitle(project.projectName);
      }
    })
  },[projects])
  
  return (
    <>
      <Header title={title}></Header>
      <Toolbar projectId={projectId} dueDate={project?.dueDate}></Toolbar>
      <div className="w-full h-full">
        
        {children}
      </div>
    </>
  );
}
export default Layout;
