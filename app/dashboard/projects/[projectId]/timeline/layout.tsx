import SessionProviderWrapper from "@/components/ui/wrappers/SessionProviderWrapper";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <SessionProviderWrapper>{children}</SessionProviderWrapper>;
}
