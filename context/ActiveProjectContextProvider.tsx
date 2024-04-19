import { Context, createContext, useContext } from "react";
interface IActiveProjectContext {
  project : any,
  setProject : any
}
/**
 * ## ActiveProjectContext
 */
export const ActiveProjectContext: Context<IActiveProjectContext> = createContext<IActiveProjectContext>(null as any);

ActiveProjectContext.displayName = "ActiveProjectContext";

export const useActiveProject = (): IActiveProjectContext => useContext(ActiveProjectContext);