"use client";
import React from "react";
import { useProjectList } from "@/context/ProjectListContext";
import { getOffsetLeft } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/dashboard/Header";
type Props = {};

export default function Page({}: Props) {
  const projectContext = useProjectList();
  const projectList = projectContext.projects;
  const router = useRouter();
  const baseUrl = global.window?.location?.origin;
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = new Date(getTodayDate());

  return (
    <>
      <Header title={"Projects"} />
      <div className="w-[90%] mx-auto p-4 mt-6 min-w-max">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {projectList.map((project) => {
            const date = new Date(project.dueDate);

            return (
              <div
                key={project.projectid}
                className="p-4 border cursor-pointer hover:shadow-md flex flex-col gap-4 border-gray-200 rounded-xl min-w-max"
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
                  className={`block text-base ${
                    date < today ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  Due:&nbsp;{" "}
                  {project.dueDate
                    ? project.dueDate.split("-").reverse().join("-")
                    : "NA"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
