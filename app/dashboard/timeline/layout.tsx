import React, { ReactNode } from "react";
import { NextAuthProvider } from "./NextAuthProvider";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-blue-200 h-full w-full border p-2">
      <div className="bg-blue-200 h-full w-full rounded-3xl outline-dashed outline-blue-700 outline-4">
        <NextAuthProvider>{children}</NextAuthProvider>
      </div>
    </div>
  );
}
