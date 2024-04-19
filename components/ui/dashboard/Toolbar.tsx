import React from "react";
import { InfoIcon, GanttChart, List } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
type Props = {
  projectId: string;
  dueDate:Date|null;
};

export default function Toolbar({ projectId,dueDate }: Props) {
  const router = useRouter();
  const url = usePathname();
  return (
    <>
      <div className="p-2">
        <ul className="flex gap-1">
          {dueDate && <li className="p-1 bg-sky-200 flex rounded-t-md gap-1">
            Due:&nbsp; 
            {dueDate.toString().split('-').reverse().join('-')}
          </li>}
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <InfoIcon className="text-gray-700 w-[14px] " />
            <Link href={`/dashboard/projects/${projectId}`}>Overview</Link>
          </li>
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <Link href={`/dashboard/projects/${projectId}/timeline`}>
              Gantt
            </Link>
          </li>
          <li className="p-1 cursor-pointer hover:bg-gray-200 flex rounded-t-md gap-1">
            <List className="text-gray-700 w-[14px]" />
            list
          </li>
        </ul>
        <hr className="border-gray-200" />
      </div>
    </>
  );
}
