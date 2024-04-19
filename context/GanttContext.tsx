import { Context, createContext, useContext } from "react";

type IGanttViewContext = any
/**
 * ## GanttViewContext
 */
const GanttViewContext: Context<IGanttViewContext> = createContext<IGanttViewContext>(null as any);

GanttViewContext.displayName = "GanttViewContext";

export const useGanttView = (): IGanttViewContext => useContext(GanttViewContext);
