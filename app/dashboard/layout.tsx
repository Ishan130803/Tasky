"use client";
import React, { ReactNode, useEffect, useState } from "react";
import SideNav from "@/components/ui/dashboard/SideNav";

import SessionProviderWrapper from "@/components/ui/wrappers/SessionProviderWrapper";
import Toolbar from "@/components/ui/dashboard/Toolbar";

export default function Layout({ children }: { children: ReactNode }) {
  
  return (
    <>
      <SessionProviderWrapper>
        <div className="relative w-full h-full">
          <div className={"flex relative w-full h-full "}>
            <SideNav></SideNav>
            <div className="w-[100%] h-full max-w-full  min-w-[70%]">
              
              <div className="w-full h-full overflow-hidden">{children}</div>
            </div>
          </div>
        </div>
      </SessionProviderWrapper>
    </>
  );
}

const options = ["My Actions"];
