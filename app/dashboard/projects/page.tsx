"use client";
import React from "react";
import { useProjectList } from "@/context/ProjectListContext";
import { getOffsetLeft } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/dashboard/Header";
import dayjs from "dayjs";
import { CircleEllipsis } from "lucide-react";
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
  // @ts-ignore
  const today = new dayjs();

  return (
    <>
      <Header title={"Projects"} />
      <div className="w-[90%] mx-auto p-4 mt-6">
        <div className="grid lg:grid-cols-4 md:max-lg:grid-cols-3 grid-cols-2 gap-4 auto-rows-min">
          {projectList.map((project) => {
            // @ts-ignore
            const date = new dayjs(project.dueDate);
            const dateStr = date.format("YYYY-MM-DD");
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
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h2 className="font-semibold text-lg flex-shrink text-gray-700 capitalize overflow-hidden text-ellipsis">
                      {project.projectName}
                    </h2>
                    
                  </div>
                  {project.description && (
                    <p className="line-clamp-2 my-1 text-ellipsis">
                      {project.description}
                    </p>
                  )}
                  <span
                    className={`block text-base ${
                      date.isBefore(today) ? "text-red-500" : "text-blue-500"
                    }`}
                  >
                    Due:&nbsp;{" "}
                    {project.dueDate
                      ? dateStr.split("-").reverse().join("-")
                      : "NA"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
