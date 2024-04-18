"use client";
import React,{ReactNode} from "react";
import { useRouter, usePathname} from "next/navigation";

import { GanttChart, InfoIcon, List } from "lucide-react";
type Props = {};

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const url = usePathname();
  
  return (
    <>
      <div className="p-2">
        <ul className="flex gap-1">
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <InfoIcon className="text-gray-700 w-[14px] " />
            <span>Overview</span>
          </li>
          <li
            className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1"
            onClick={() => router.replace(url+'/timeline')}
          >
            <GanttChart className="text-gray-700 w-[14px]" />
            Gantt
          </li>
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <List className="text-gray-700 w-[14px]" />
            list
          </li>
        </ul>
        <hr className="border-gray-200" />
      </div>
      <div>
        
        {children}
      </div>
    </>
  );
}
