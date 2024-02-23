"use client";
import React, { useState, createContext } from "react";
import Timerule from "./components/Timegrid/Timerule";

import Slider from "@mui/material/Slider";

import GridView from "./components/Timegrid/GridView";

import dayjs, { Dayjs } from "dayjs";
import { default as dayjsDuration } from "dayjs/plugin/duration";
dayjs.extend(dayjsDuration);

import { taskClass, user } from "@/app/types/taskClass";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

export const gridStartingBoundContext = createContext<Dayjs>(null);

const taskList: taskClass[] = [
  new taskClass({
    collapsed: true,
    completed: true,
    start_time: dayjs("2024-02-24 00:52"),
    end_time: 11,
    id: "1",
    subTasks: [],
    title: "Task1",
    duration: dayjs.duration(30, "m"),
  }),
  new taskClass({
    collapsed: false,
    completed: false,
    start_time: dayjs("2024-02-24 01:00"),
    end_time: 10,
    id: "1",
    subTasks: [],
    title: "Task2",
    duration: dayjs.duration(60, "m"),
  }),
  new taskClass({
    collapsed: false,
    completed: false,
    start_time: dayjs("2024-02-24 01:00"),
    end_time: 10,
    id: "1",
    subTasks: [],
    title: "Task3",
    duration: dayjs.duration(120, "m"),
  }),
  new taskClass({
    collapsed: false,
    completed: false,
    start_time: dayjs("2024-02-24 01:00"),
    end_time: 15,
    id: "1",
    subTasks: [],
    title: "Task4",
    duration: dayjs.duration(30, "m"),
  }),
  new taskClass({
    collapsed: false,
    completed: false,
    start_time: dayjs("2024-02-24 01:00"),
    end_time: 10,
    id: "1",
    subTasks: [],
    title: "Task5",
    duration: dayjs.duration(30, "m"),
  }),
  new taskClass({
    collapsed: false,
    completed: false,
    start_time: dayjs("2024-02-24 01:00"),
    end_time: 16,
    id: "1",
    subTasks: [],
    title: "Task6",
    duration: dayjs.duration(30, "m"),
  }),
  new taskClass({
    collapsed: false,
    completed: false,
    start_time: dayjs("2024-02-24 01:00"),
    end_time: 19,
    id: "1",
    subTasks: [
      new taskClass({
        collapsed: false,
        completed: false,
        start_time: dayjs("2024-02-24 01:00"),
        end_time: 10,
        id: "1",
        subTasks: [],
        title: "SubTask-7-1",
        duration: dayjs.duration(30, "m"),
      }),
      new taskClass({
        collapsed: false,
        completed: false,
        start_time: dayjs("2024-02-24 01:00"),
        end_time: 10,
        id: "1",
        subTasks: [],
        title: "SubTask-7-2",
        duration: dayjs.duration(30, "m"),
      }),
      new taskClass({
        collapsed: false,
        completed: false,
        start_time: dayjs("2024-02-24 01:00"),
        end_time: 10,
        id: "1",
        subTasks: [
          new taskClass({
            collapsed: false,
            completed: false,
            start_time: dayjs("2024-02-24 01:00"),
            end_time: 99,
            id: "1",
            subTasks: [],
            title: "SubTask-7-3-1",
            duration: dayjs.duration(30, "m"),
          }),
          new taskClass({
            collapsed: false,
            completed: false,
            start_time: dayjs("2024-02-24 01:00"),
            end_time: 10,
            id: "1",
            subTasks: [],
            title: "SubTask-7-3-2",
            duration: dayjs.duration(30, "m"),
          }),
          new taskClass({
            collapsed: false,
            completed: false,
            start_time: dayjs("2024-02-24 01:00"),
            end_time: 10,
            id: "1",
            subTasks: [],
            title: "SubTask-7-3-3",
            duration: dayjs.duration(30, "m"),
          }),
        ],
        title: "SubTask-7-3",
        duration: dayjs.duration(30, "m"),
      }),
    ],
    title: "Task7",
    duration: dayjs.duration(30, "m"),
  }),
  new taskClass({
    collapsed: false,
    completed: false,
    start_time: dayjs("2024-02-24 01:00"),
    end_time: 10,
    id: "1",
    subTasks: [],
    title: "Task5",
    duration: dayjs.duration(30, "m"),
  }),
];


export default function page() {
  const userTask: user = {
    personalTasks: taskList,
    workTasks: [],
  };

  const [view, setView] = useState(1);
  const [gridStartingBound, setGridStartingBound] = useState<Dayjs>(
    dayjs().startOf("d")
  );

  return (
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
      <gridStartingBoundContext.Provider value={gridStartingBound}>
        {GridView({ view: view, taskList: taskList })}
      </gridStartingBoundContext.Provider>
    </div>
  );
}
