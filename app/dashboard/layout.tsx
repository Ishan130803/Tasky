"use client";
import React, { ReactNode, useEffect, useState } from "react";
import SideNav from "@/components/ui/dashboard/SideNav";

import SessionProviderWrapper from "@/components/ui/wrappers/SessionProviderWrapper";
import Toolbar from "@/components/ui/dashboard/Toolbar";
import { ActiveProjectContext } from "@/context/ActiveProjectContextProvider";
import { ProjectListContext } from "@/context/ProjectListContext";

export default function Layout({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProject, setactiveProject] = useState<any>({});

  return (
    <>
      <SessionProviderWrapper>
        <ProjectListContext.Provider
          value={{ projects: projects, setProjects: setProjects }}
        >
          <ActiveProjectContext.Provider
            value={{ project: activeProject, setProject: setactiveProject }}
          >
            <div className="relative w-full h-full">
              <div className={"flex relative w-full h-full "}>
                <SideNav></SideNav>
                <div className="w-[100%] h-full max-w-full  min-w-[70%]">
                  <div className="w-full h-full overflow-hidden">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </ActiveProjectContext.Provider>
        </ProjectListContext.Provider>
      </SessionProviderWrapper>
    </>
  );
}

const options = ["My Actions"];
