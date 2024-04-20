"use client";
import { GanttChart } from "@/components/Charts/GanttChart";
import { useSession } from "next-auth/react";

interface IPageProps {
  params: {
    projectId: string;
  };
}

const Page = (props: any) => {
  const session = useSession();
  const userid = session.data?.user.id;
  console.log(userid)
  return (
    <>
      {userid && (
        <GanttChart projectid={props.params.projectId} userid={userid} />
      )}
    </>
  );
};

export default Page;
