"use client";
import { GanttChart } from "@/components/Charts/GanttChart";

interface routeParams {
  params: {
    projectId: string;
  };
}

interface IPageProps {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

const Page: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <>
      <GanttChart projectid={props.params.projectId} />
    </>
  );
};

export default Page;
