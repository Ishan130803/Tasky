"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GanttChart, InfoIcon, List } from "lucide-react";


interface routeParams {
  params : {
    projectId : string
  }
}
interface IPageProps {
  children : React.ReactNode
  params : {
    projectId : string
  }
}

const Page: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <>
      <div>
				Overview
			</div>
    </>
  );
};

export default Page;

