"use client";
import React, { useState } from "react";
import Timerule from "./components/Timegrid/Timerule";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import GridView from "./components/Timegrid/GridView";

import dayjs,{Dayjs} from "dayjs";

import { taskClass } from "@/app/types/taskClass";


const taskList:taskClass[] = [
  new taskClass({collapsed:false,completed:false,start_time:2,end_time:11,id:'1',subTasks:[],title:'Task1',duration:8}),
  new taskClass({collapsed:false,completed:false,start_time:3,end_time:10,id:'1',subTasks:[],title:'Task2',duration:8}),
  new taskClass({collapsed:false,completed:false,start_time:1,end_time:10,id:'1',subTasks:[],title:'Task3',duration:8}),
  new taskClass({collapsed:false,completed:false,start_time:5,end_time:15,id:'1',subTasks:[],title:'Task4',duration:8}),
  new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'Task5',duration:8}),
  new taskClass({collapsed:false,completed:false,start_time:9,end_time:16,id:'1',subTasks:[],title:'Task6',duration:8}),
  new taskClass({collapsed:false,completed:false,start_time:1,end_time:19,id:'1',subTasks:[
    new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-1',duration:8}),
    new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-2',duration:8}),
    new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[
      new taskClass({collapsed:false,completed:false,start_time:9,end_time:99,id:'1',subTasks:[],title:'SubTask-7-3-1',duration:8}),
      new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-3-2',duration:8}),
      new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-3-3',duration:8}),
    ],title:'SubTask-7-3',duration:8}),
  ],title:'Task7',duration:8}),
]


export default function page() {
  const [view, setView] = useState({view:0,taskList:taskList});

  return (
    <div className="flex flex-col ">
      <Slider
        value={view.view}
        onChange={(event, num) => {
          if (typeof num === "number") {
            setView({view:num,taskList:taskList});
          }
        }}
        className="w-80"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={11}
      />
      {/* <Timerule className="rounded-t-3xl" /> */}
      {GridView(view)}
    </div>
  );
}
