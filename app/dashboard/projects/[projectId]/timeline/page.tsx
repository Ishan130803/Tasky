"use client";
import { GanttChart } from "@/components/Charts/GanttChart";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const projectId = params.projectId;
  console.log(projectId);
  return (
    <>
      <GanttChart projectid={projectId}/>
      Gantt Chart      
    </>
  );
}
