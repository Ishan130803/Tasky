import { Context, createContext } from "react";
import { gridViewDataType } from "@/types/gridViewData";

export const gridViewData : Context<gridViewDataType> = createContext(null as any)