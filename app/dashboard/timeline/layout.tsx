import React, { ReactNode } from "react";
import { NextAuthProvider } from "./NextAuthProvider";
import { SyncfusionWrapper } from "./SyncfusionWrapper";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>

        <NextAuthProvider>
          <div className="bg-black">Hello World

          <SyncfusionWrapper >{children}</SyncfusionWrapper>
          </div>
        </NextAuthProvider>
    </>
  );
}
