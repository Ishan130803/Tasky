"use client";
import { GanttChart } from "@/components/Charts/GanttChart";


interface IPageProps {
  params: {
    projectId: string;
  };
}

const Page = (props : any) => {
  return (
    <>
      <GanttChart projectid={props.params.projectId} />
    </>
  );
};

export default Page;
