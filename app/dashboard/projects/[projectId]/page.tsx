"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GanttChart, InfoIcon, List } from "lucide-react";
type Props = {};

export default function Page({}: Props) {
  const router = useRouter();
  const projectid = router.forward;
  return (
    <>
      <div className="p-2">
        <ul className="flex gap-1">
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <InfoIcon className="text-gray-700 w-[14px] " />
            <span>Overview</span>
          </li>
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
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

			</div>
    </>
  );
}
