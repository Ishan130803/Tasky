"use client";
import React, { ReactNode,  useState } from "react";
import SideNav from "@/components/ui/dashboard/SideNav";

import SessionProviderWrapper from "@/components/ui/wrappers/SessionProviderWrapper";
import { ActiveProjectContext } from "@/context/ActiveProjectContextProvider";
import ProjectListContextProviderWrapper from "@/context/ProjectListContext";

export default function Layout({ children }: { children: ReactNode }) {
  const [activeProject, setactiveProject] = useState<any>({});

  return (
    <>
      <SessionProviderWrapper>
        <ProjectListContextProviderWrapper>
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
        </ProjectListContextProviderWrapper>
      </SessionProviderWrapper>
    </>
  );
}

const options = ["My Actions"];
