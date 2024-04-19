"use client";
import { ReactNode, createContext, useContext, useState } from "react";
interface ProjectContextValue{
    projects:any[];
    setProjects:React.Dispatch<React.SetStateAction<any[]>>;
}
export const ProjectContext = createContext([]);

export function ProjectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState([]);
  return (
    //@ts-ignore
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  return useContext(ProjectContext);
}
