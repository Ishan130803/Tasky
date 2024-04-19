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
      <div>
				Overview
			</div>
    </>
  );
}
