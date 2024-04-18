import React, { ReactNode } from "react";
import { NextAuthProvider } from "./NextAuthProvider";
import { SyncfusionWrapper } from "./SyncfusionWrapper";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>

        <NextAuthProvider>

          <div>Hello World</div>
          <SyncfusionWrapper >{children}</SyncfusionWrapper>
        </NextAuthProvider>
    </>
  );
}
