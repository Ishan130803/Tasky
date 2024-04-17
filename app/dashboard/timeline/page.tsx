"use client";
import { GanttChart } from "@/components/Charts/GanttChart";


export default async function page() {
  // const taskTree: taskObj[] = await fetchData().then((data) => data);
  // console.log(taskTree)
  return (
    <>
      <GanttChart />
    </>
  );
}
