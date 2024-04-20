"use client";
import React from "react";
import { useProjectList } from "@/context/ProjectListContext";
import { getOffsetLeft } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/dashboard/Header";
import dayjs, { Dayjs, isDayjs } from "dayjs";
type Props = {};

export default function Page({}: Props) {
  const projectContext = useProjectList();
  const projectList = projectContext.projects;
  const router = useRouter();
  const baseUrl = global.window?.location?.origin;
  
  const today = dayjs()

  return (
    <>
      <Header title={"Projects"} />
      <div className="w-[90%] mx-auto p-4 mt-6">
        <div className="grid lg:grid-cols-4 md:max-lg:grid-cols-3 grid-cols-2 gap-4 auto-rows-min">
          {projectList.map((project) => {
            const duedate : Dayjs|undefined = project.dueDate ? dayjs(project.dueDate) : undefined;
            const startDate : Dayjs|undefined= project.startDate ? dayjs(project.startDate) : undefined;

            return (
              <div
                key={project.projectid}
                className="p-4 border relative cursor-pointer hover:shadow-md  border-gray-200 rounded-xl "
                onClick={() =>
                  router.replace(
                    `${baseUrl}/dashboard/projects/${project.projectid}`
                  )
                }
              >
                <h2 className="font-semibold text-lg text-gray-700 capitalize">
                  {project.projectName}
                </h2>
                <span
                  className={`block text-base text-blue-500`}
                >
                  Start Date & time : {isDayjs(startDate) ? startDate.format('DD-MM-YYYY HH:mm') : "NA"}
                </span>
                <span
                  className={`block text-base ${
                    (duedate && (duedate.isBefore(today))) ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  Due Date & time   : {isDayjs(duedate) ? duedate.format('DD-MM-YYYY HH:mm') : "NA"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
