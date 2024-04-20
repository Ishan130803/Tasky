


import { Context, createContext, useContext } from "react";

interface ProjectListContext{
  projects:any[];
  setProjects:React.Dispatch<React.SetStateAction<any[]>>;
}

/**
 * ## ProjectListContext
 */
export const ProjectListContext: Context<ProjectListContext> = createContext<ProjectListContext>(null as any);

ProjectListContext.displayName = "ProjectListContext";

export const useProjectList = (): ProjectListContext => useContext(ProjectListContext);
