import React from "react";
import { InfoIcon, GanttChart, List, GanttChartIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
type Props = {
  projectId: string;
};

export default function Toolbar({ projectId }: Props) {
  const router = useRouter();
  const url = usePathname();
  return (
    <>
      <div className="p-2">
        <ul className="flex gap-1">
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <InfoIcon className="text-gray-700 w-[14px] " />
            <Link href={`/dashboard/projects/${projectId}`}>Overview</Link>
          </li>
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <GanttChartIcon className="text-gray-700 w-[14px]"></GanttChartIcon>
            <Link href={`/dashboard/projects/${projectId}/timeline`}>
              Task Schedule
            </Link>
          </li>
          
        </ul>
        <hr className="border-gray-200" />
      </div>
    </>
  );
}
