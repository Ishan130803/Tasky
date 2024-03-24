"use client"
import { GanttChart } from "@/components/Charts/GanttChart";
import { Button } from "@mui/material"
import { signOut } from "next-auth/react";;


export default async function page() {
  // const taskTree: taskObj[] = await fetchData().then((data) => data);
  // console.log(taskTree)
  return (
    <>
    <Button onClick={() => signOut()}> Sign Out </Button>

      <GanttChart />
    </>
  );
}
