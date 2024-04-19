"use client";
import CustomDateTimePicker from "@/components/ui/dashboard/project/CustorDateTimePicker";
import { useActiveProject } from "@/context/ActiveProjectContextProvider";
import { ProjectContext } from "@/context/context";
import { FormLabel } from "@mui/joy";
import { TextField } from "@mui/material";
import SliderValueLabel from "@mui/material/Slider/SliderValueLabel";
import dayjs from "dayjs";

import React, { useEffect } from "react";

interface routeParams {
  params: {
    projectid: string;
  };
}

const Page = (props: routeParams) => {
  const activeProject = useActiveProject();
  const onChangeHandler = (field: string, value: any) => {
    const newObj = { ...activeProject?.project, [field]: value };
    activeProject.setProject({ ...newObj });
  };
  console.log(activeProject);
  useEffect(() => {
    const baseUrl = global.window?.location?.origin;

    const updateData = async () => {
      const res = fetch(
        `${baseUrl}/api/users/GetData/${activeProject.project.userId}`,
        {
          method: "PUT",
          body: JSON.stringify([activeProject.project]),
        }
      );
    };
    const timeOut = setTimeout(updateData,2000)

    return () => {
      clearTimeout(timeOut);
    };
  }, [activeProject]);

  return (
    <>
      <div className="container flex flex-col gap-10">
        <div>
          <FormLabel className="text-2xl my-2">Project Title</FormLabel>
          <TextField
            className="text-xl"
            variant="standard"
            placeholder="projectName"
            value={activeProject?.project?.projectName}
            onChange={(e) => onChangeHandler("projectName", e.target.value)}
            fullWidth
          ></TextField>
        </div>
        <div className="flex w-full justify-evenly">
          <div className="hover:bg-slate-200 p-5 rounded-xl">
            <FormLabel className="my-2 text-xl text-[#2196f3] font-bold justify-center">
              Project Start Date
            </FormLabel>
            <CustomDateTimePicker
              value={dayjs(activeProject?.project?.startDate)}
              onChange={(date) => onChangeHandler("startDate", date)}
              orientation="landscape"
              onError={() =>
                onChangeHandler("startDate", activeProject?.project.dueDate)
              }
              maxDate={dayjs(activeProject.project.dueDate)}
            ></CustomDateTimePicker>
          </div>
          <div className="hover:bg-slate-200 p-5 rounded-xl">
            <FormLabel className="my-2 text-xl text-[#2196f3] font-bold justify-center">
              Project End Date
            </FormLabel>
            <CustomDateTimePicker
              value={dayjs(activeProject?.project?.dueDate)}
              orientation="landscape"
              minDate={dayjs(activeProject?.project?.startDate)}
              onChange={(date) => onChangeHandler("dueDate", date)}
              onError={() =>
                onChangeHandler("dueDate", activeProject?.project.startDate)
              }
            ></CustomDateTimePicker>
          </div>
        </div>

        <div>
          <FormLabel className="text-2xl my-2">Description</FormLabel>
          <TextField
            placeholder="What is this project about?...."
            fullWidth
            multiline
            rows={4}
            value={activeProject?.project?.description}
            onChange={(e) => onChangeHandler("description", e.target.value)}
          ></TextField>
        </div>
        <div>
          <FormLabel className="text-2xl my-2">Collaborators</FormLabel>
        </div>
      </div>
    </>
  );
};

export default Page;
