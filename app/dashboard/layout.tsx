"use client";
import React, { ReactNode, useEffect, useState } from "react";
import SideNav from "@/components/ui/dashboard/SideNav";

import { NextAuthProvider } from "./NextAuthProvider";

export default function Layout({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string>("My Actions");
  
  const handleSelected = (value: string) => {
    setSelected(value);
  };
  return (
    <>
      <NextAuthProvider>
        <div className="relative w-full h-full">
          <div className={"flex w-full h-full "}>
            <SideNav
              handleSelected={handleSelected}
            ></SideNav>
            <div className="w-[100%] h-full max-w-full  min-w-[70%]">
              
              <div className="w-full overflow-hidden">{children}</div>
            </div>
          </div>
        </div>
      </NextAuthProvider>
    </>
  );
}



const options = ["My Actions"];
