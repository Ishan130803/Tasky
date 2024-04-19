"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LucideFolders, PlusCircle } from "lucide-react";
import { GanttChart, InfoIcon, List } from "lucide-react";
import Header from "@/components/ui/dashboard/Header";
import Toolbar from "@/components/ui/dashboard/Toolbar";
import { useActiveProject } from "@/context/ActiveProjectContextProvider";
import { useSession } from "next-auth/react";
type Props = {};

interface routeParams {
  params: {
    projectId: string;
  };
}
interface ILayoutProps {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

const Layout: React.FunctionComponent<ILayoutProps> = ({
  children,
  params,
}) => {
  const router = useRouter();
  const url = usePathname();
  const projectId = params.projectId;
  const baseUrl = global.window?.location?.origin;
  const userid = useSession().data?.user.id;
  const activeProject = useActiveProject();
  useEffect(() => {
    if (userid) {
      fetch(`${baseUrl}/api/users/GetData/${userid}?pid=${projectId}`)
        .then((res) => res.json())
        .then((data) => {
          activeProject.setProject(data[0]);
        });
    }

    return () => {
      activeProject.setProject({});
      
    };
  }, [userid]);
  return (
    <>
      <Header title={activeProject?.project.projectName}></Header>
      <Toolbar projectId={projectId}></Toolbar>
      <div className="w-full h-full">{children}</div>
    </>
  );
};
export default Layout;
