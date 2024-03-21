"use client";
import { taskObj } from "@/types/taskClass";
import { FC } from "react";
import React, { useState } from "react";

import Slider from "@mui/material/Slider";
import GanttChart from "./components/GanttChart/GanttGrid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import dayjs, { Dayjs } from "dayjs";
import { default as dayjsDuration } from "dayjs/plugin/duration";
dayjs.extend(dayjsDuration);
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";


interface IPageWrapperProps {
  taskList: taskObj[];
}

export const PageWrapper: FC<IPageWrapperProps> = ({
  taskList = [],
  ...props
}) => {
  const session = useSession()
  console.log(session)
  const [view, setView] = useState(1);
  const [gridStartingBound, setGridStartingBound] = useState<Dayjs>(
    dayjs().startOf("d")
  );
  return (
    <>
      <Button onClick={()=>signOut()}> Sign Out </Button>
      <div className="flex flex-col ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            value={gridStartingBound}
            onChange={(date) => {
              setGridStartingBound(date?.startOf("d"));
            }}
            className="w-80"
          />
        </LocalizationProvider>
        <Slider
          value={view}
          onChange={(event, num) => {
            if (typeof num === "number") {
              setView(num);
            }
          }}
          className="w-80"
          valueLabelDisplay="auto"
          min={1}
          max={100}
        />
        {/* <Timerule className="rounded-t-3xl" /> */}
        <div className="flex flex-1 p-4 border-dashed border-blue-950 border-8 m-4 overflow-scroll ">
          {/* <GridView
            gridStartingBound={gridStartingBound.subtract(1, "day")}
            taskList={taskList}
            view={view}
          /> */}
          <GanttChart
            gridStartingBound={gridStartingBound}
            taskList={taskList}
            view={view}
          />
          {/* <GridView
            gridStartingBound={gridStartingBound.add(1, "day")}
            taskList={taskList}
            view={view}
          /> */}
        </div>
      </div>
    </>
  );
};
